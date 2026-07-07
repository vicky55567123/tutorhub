import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest, friendlyDbError } from '@/lib/supabaseAdmin'
import { createGoogleMeetEvent, deleteGoogleMeetEvent, GoogleMeetAuthError, GoogleMeetNotConfiguredError } from '@/lib/googleMeet'
import { sendTutorBookingEmail, sendStudentBookingEmail, sendAdminBookingEmail } from '@/lib/email'

const TRIAL_DURATION_MINUTES = 20

async function requireUser(request: NextRequest) {
  const token = getAccessTokenFromRequest(request)
  if (!token) return { error: NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 }) }

  const supabase = getSupabaseForToken(token)
  if (!supabase) {
    return {
      error: NextResponse.json(
        { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
        { status: 503 }
      ),
    }
  }

  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data?.user) {
    return { error: NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 }) }
  }

  return { supabase, userId: data.user.id }
}

// GET /api/bookings - all bookings where the current user is the student OR the tutor
export async function GET(request: NextRequest) {
  const auth = await requireUser(request)
  if ('error' in auth) return auth.error
  const { supabase, userId } = auth

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  let query = supabase
    .from('bookings')
    .select(`
      *,
      student:profiles!student_id ( id, full_name, email, avatar_url ),
      tutor:profiles!tutor_id ( id, full_name, email, avatar_url )
    `)
    .or(`student_id.eq.${userId},tutor_id.eq.${userId}`)
    .order('start_time', { ascending: true })

  if (status) {
    query = query.eq('status', status)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, bookings: data || [] })
}

// POST /api/bookings - student books a session with a tutor.
// Body: { tutorId, title, subject, description, startTime (ISO), durationMinutes,
//         tutorEmail, studentEmail, isTrial?, paymentConfirmed?, payerName?,
//         paymentReference?, paymentProof? }
//
// Payment rules (manual bank transfer, no card processor):
//   - isTrial=true: forced to a fixed 20-minute, free (£0) session. Only
//     allowed once per student email - checked across ALL accounts via the
//     service-role client, not just the caller's own bookings (which RLS
//     would otherwise limit them to).
//   - isTrial=false (default): price = tutor's hourly_rate * duration. The
//     student transfers this amount to a fixed bank account shown client-
//     side, then submits paymentConfirmed=true plus a payerName/reference
//     and a paymentProof screenshot (base64 data URL). Missing confirmation
//     is rejected with 402; missing proof is rejected with 400. When
//     accepted the booking is created immediately with payment_status =
//     'pending' - an admin must review the screenshot in the Admin
//     Dashboard and mark it 'paid' or 'rejected' afterwards.
//
// On success, besides the Google Meet calendar invite (sent to student +
// tutor via the Calendar API), a notification email is also sent to the
// tutor and to every admin (src/lib/email.ts) - best-effort, never blocks
// the booking response if SMTP isn't configured or fails.
//
// Google Meet creation is ALSO best-effort: if it fails (not configured,
// expired/revoked Google authorization, a transient API error, etc.) the
// booking is still created with meeting_url/google_event_id left null and
// `meetingPending: true` in the response, rather than losing the booking
// (and any payment proof the student just submitted). Admins are notified
// by email so they can fix the Google connection and send a manual link.
export async function POST(request: NextRequest) {
  const auth = await requireUser(request)
  if ('error' in auth) return auth.error
  const { supabase, userId } = auth

  const body = await request.json()
  const {
    tutorId,
    title,
    subject,
    description,
    startTime,
    durationMinutes: requestedDurationMinutes = 60,
    tutorEmail,
    studentEmail,
    isTrial = false,
    paymentConfirmed = false,
    payerName,
    paymentReference,
    paymentProof,
  } = body

  if (!tutorId || !title || !startTime) {
    return NextResponse.json(
      { success: false, error: 'tutorId, title and startTime are required' },
      { status: 400 }
    )
  }

  // Trials are always fixed at 20 minutes regardless of what the client sent.
  const durationMinutes = isTrial ? TRIAL_DURATION_MINUTES : requestedDurationMinutes

  const startDateTime = new Date(startTime)
  if (isNaN(startDateTime.getTime()) || startDateTime.getTime() < Date.now()) {
    return NextResponse.json({ success: false, error: 'startTime must be a valid time in the future' }, { status: 400 })
  }
  const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000)

  // Double-check the tutor doesn't already have an overlapping active booking
  // (the DB trigger enforces this too, but checking first avoids creating an
  // orphaned Google Meet event when we already know it will fail).
  const { data: busySlots, error: busyError } = await supabase.rpc('get_tutor_busy_slots', {
    p_tutor_id: tutorId,
    p_from: startDateTime.toISOString(),
    p_to: endDateTime.toISOString(),
  })

  if (busyError) {
    console.error('Error checking tutor availability:', busyError)
    return NextResponse.json({ success: false, error: busyError.message }, { status: 500 })
  }

  if (busySlots && busySlots.length > 0) {
    return NextResponse.json(
      { success: false, error: 'This tutor is no longer available at the selected time. Please pick another slot.' },
      { status: 409 }
    )
  }

  // ----------------------------------------------------------------------
  // Payment / free-trial enforcement
  // ----------------------------------------------------------------------
  const { data: tutorProfile, error: tutorProfileError } = await supabase
    .from('profiles')
    .select('full_name, email, hourly_rate')
    .eq('id', tutorId)
    .single()

  if (tutorProfileError) {
    return NextResponse.json({ success: false, error: 'Could not verify tutor details' }, { status: 500 })
  }

  const { data: studentProfile } = await supabase.from('profiles').select('full_name, email').eq('id', userId).single()

  let price = 0
  let paymentStatus: 'pending' | 'free' = 'free'

  if (isTrial) {
    // A student may book exactly one free trial. We check by account EMAIL
    // (not just this session's userId) using the service-role client so the
    // check covers all of that person's bookings, bypassing RLS which would
    // otherwise only show the caller their own rows.
    const effectiveEmail = studentProfile?.email || studentEmail

    if (effectiveEmail) {
      const admin = getSupabaseAdmin()
      if (admin) {
        const { data: matchingProfiles } = await admin.from('profiles').select('id').eq('email', effectiveEmail)
        const matchingIds = (matchingProfiles || []).map((p) => p.id)

        if (matchingIds.length > 0) {
          const { data: priorTrials } = await admin
            .from('bookings')
            .select('id')
            .in('student_id', matchingIds)
            .eq('is_trial', true)
            .neq('status', 'cancelled')
            .limit(1)

          if (priorTrials && priorTrials.length > 0) {
            return NextResponse.json(
              {
                success: false,
                error: 'You have already used your free trial session. Please book a paid session instead.',
              },
              { status: 409 }
            )
          }
        }
      }
    }

    price = 0
    paymentStatus = 'free'
  } else {
    const hourlyRate = tutorProfile?.hourly_rate
    if (!hourlyRate || hourlyRate <= 0) {
      return NextResponse.json(
        {
          success: false,
          error: "This tutor hasn't set an hourly rate yet, so paid sessions can't be booked. Try a free trial instead, or contact support.",
        },
        { status: 400 }
      )
    }

    price = Math.round(hourlyRate * (durationMinutes / 60) * 100) / 100

    if (!paymentConfirmed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment is required before this session can be booked.',
          requiresPayment: true,
          price,
          currency: 'GBP',
        },
        { status: 402 }
      )
    }

    if (!paymentProof) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please attach a screenshot of your bank transfer as proof of payment.',
          requiresPayment: true,
          price,
          currency: 'GBP',
        },
        { status: 400 }
      )
    }

    // The booking is created straight away so the slot is held, but the
    // payment itself stays 'pending' until an admin reviews the uploaded
    // screenshot in the Admin Dashboard and marks it paid/rejected.
    paymentStatus = 'pending'
  }

  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  // Google Meet creation is best-effort: if it fails for any reason (not
  // configured, expired/revoked authorization, a transient Google API
  // error, etc.) we still create the booking - the student has already
  // paid/submitted proof, and losing that entirely would be much worse
  // than a session with no video link yet. The specific failure reason is
  // logged server-side and surfaced to admins by email so they can fix the
  // Google connection and/or send the student a meeting link manually.
  let meetResult: { eventId?: string; meetingUrl?: string; calendarLink?: string } = {}
  let meetingSetupError: string | null = null
  try {
    meetResult = await createGoogleMeetEvent(
      {
        title,
        description: description || `Tutoring session: ${subject || title}`,
        startTime: startDateTime.toISOString(),
        durationMinutes,
        attendeeEmails: [tutorEmail, studentEmail].filter(Boolean),
      },
      baseUrl
    )
  } catch (err: any) {
    if (err instanceof GoogleMeetNotConfiguredError) {
      meetingSetupError = 'Google Meet is not configured on the server yet.'
    } else if (err instanceof GoogleMeetAuthError) {
      meetingSetupError = 'Google Calendar authorization has expired or was revoked.'
    } else {
      meetingSetupError = 'An unexpected error occurred while creating the Google Meet link.'
    }
    console.error('Error creating Google Meet event - continuing without a video link:', err)
  }

  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      student_id: userId,
      tutor_id: tutorId,
      title,
      subject,
      description,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
      duration_minutes: durationMinutes,
      status: 'scheduled',
      is_trial: isTrial,
      price,
      payment_status: paymentStatus,
      payment_reference: isTrial
        ? null
        : [payerName, paymentReference].filter(Boolean).join(' - ') || null,
      payment_proof: isTrial ? null : paymentProof || null,
      payment_submitted_at: isTrial ? null : new Date().toISOString(),
      google_event_id: meetResult.eventId || null,
      meeting_url: meetResult.meetingUrl || null,
      calendar_link: meetResult.calendarLink || null,
    })
    .select()
    .single()

  if (insertError) {
    // Roll back the Google Calendar event so we don't leave an orphaned meeting
    if (meetResult.eventId) await deleteGoogleMeetEvent(meetResult.eventId, baseUrl)
    console.error('Error saving booking:', insertError)
    const { message, migrationRequired } = friendlyDbError(insertError)
    const finalMessage = insertError.message.includes('overlap')
      ? 'This tutor was just booked for that time. Please choose another slot.'
      : message
    return NextResponse.json({ success: false, error: finalMessage, migrationRequired }, { status: 409 })
  }

  // Notify the tutor and every admin by email. Fire-and-forget: booking
  // creation has already succeeded above, so an email provider hiccup must
  // never turn into a failed booking response.
  const emailDetails = {
    studentName: studentProfile?.full_name || studentEmail || 'A student',
    studentEmail: studentProfile?.email || studentEmail || '',
    tutorName: tutorProfile?.full_name || tutorEmail || 'Tutor',
    tutorEmail: tutorProfile?.email || tutorEmail || '',
    subject,
    title,
    startTime: startDateTime.toISOString(),
    durationMinutes,
    isTrial,
    price,
    meetingUrl: meetResult.meetingUrl,
    calendarLink: meetResult.calendarLink,
    meetingPending: !meetResult.meetingUrl,
  }
  Promise.all([
    sendStudentBookingEmail(emailDetails),
    sendTutorBookingEmail(emailDetails),
    sendAdminBookingEmail(emailDetails),
  ]).catch((err) => console.error('Failed to send booking notification emails:', err))

  return NextResponse.json({
    success: true,
    booking,
    meetingPending: !meetResult.meetingUrl,
    meetingSetupError,
    message: meetResult.meetingUrl
      ? isTrial
        ? 'Free trial booked! A Google Meet invite has been sent to both of you.'
        : 'Session booked! A Google Meet invite has been sent to both of you.'
      : "Session booked! We're finalising your video call link - you'll receive it by email shortly.",
  })
}

// PATCH /api/bookings - cancel or update the status of a booking
// Body: { bookingId, status?: 'cancelled' | 'confirmed' | 'completed', reason? }
export async function PATCH(request: NextRequest) {
  const auth = await requireUser(request)
  if ('error' in auth) return auth.error
  const { supabase, userId } = auth

  const body = await request.json()
  const { bookingId, status = 'cancelled', reason } = body

  if (!bookingId) {
    return NextResponse.json({ success: false, error: 'bookingId is required' }, { status: 400 })
  }

  const updates: Record<string, any> = { status }
  if (status === 'cancelled') {
    updates.cancelled_by = userId
    updates.cancellation_reason = reason || null
  }

  const { data: booking, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single()

  if (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  if (status === 'cancelled' && booking?.google_event_id) {
    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`
    await deleteGoogleMeetEvent(booking.google_event_id, baseUrl)
  }

  return NextResponse.json({ success: true, booking })
}
