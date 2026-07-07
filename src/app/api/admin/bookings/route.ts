import { NextRequest, NextResponse } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest, friendlyDbError } from '@/lib/supabaseAdmin'
import { createGoogleMeetEvent, isGoogleMeetConfigured } from '@/lib/googleMeet'
import { sendPaymentConfirmedEmail, sendPaymentRejectedEmail, isEmailConfigured } from '@/lib/email'

/**
 * Admin-only booking payment review: after a student submits bank-transfer
 * proof (screenshot + reference), a booking sits at payment_status =
 * 'pending'. This route lets an admin mark it 'paid' (confirmed, funds
 * received) or 'rejected' (the proof didn't check out) once they've looked
 * at the screenshot in the Admin Dashboard.
 *
 * Access control mirrors /api/admin/stats and /api/admin/users.
 */
async function requireAdmin(
  request: NextRequest
): Promise<{ admin: SupabaseClient; error?: undefined } | { admin?: undefined; error: NextResponse }> {
  const token = getAccessTokenFromRequest(request)
  if (!token) {
    return { error: NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 }) }
  }

  const userClient = getSupabaseForToken(token)
  if (!userClient) {
    return {
      error: NextResponse.json(
        { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
        { status: 503 }
      ),
    }
  }

  const { data: userData, error: userError } = await userClient.auth.getUser(token)
  if (userError || !userData?.user) {
    return { error: NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 }) }
  }

  const { data: callerProfile, error: callerError } = await userClient
    .from('profiles')
    .select('user_type')
    .eq('id', userData.user.id)
    .single()

  if (callerError || callerProfile?.user_type !== 'admin') {
    return { error: NextResponse.json({ success: false, error: 'Admins only' }, { status: 403 }) }
  }

  const admin = getSupabaseAdmin()
  if (!admin) {
    return {
      error: NextResponse.json(
        { success: false, error: 'Backend not configured', message: 'SUPABASE_SERVICE_ROLE_KEY is missing.' },
        { status: 503 }
      ),
    }
  }

  return { admin }
}

interface UpdatePaymentBody {
  id?: string
  paymentStatus?: 'paid' | 'unpaid' | 'rejected'
  /** When true, ignore paymentStatus and just (re)try creating the Google
   *  Meet link + re-send the confirmation email for a booking that's
   *  already paid/free but still missing a video link - e.g. after fixing
   *  an expired Google authorization, so the admin doesn't have to toggle
   *  the payment status back and forth to trigger a retry. */
  retryMeetingOnly?: boolean
}

/** PATCH: approve/reject a booking's bank-transfer payment proof, OR (with
 *  retryMeetingOnly: true) just retry creating its Google Meet link without
 *  touching payment_status.
 *
 * On approval ('paid') / retry, this also, best-effort:
 *   - Retries Google Meet event creation if it wasn't created at booking
 *     time (e.g. the Google connection had expired), so the session can
 *     still get a video link once it's actually confirmed / once the
 *     Google connection has been fixed.
 *   - Emails the student ("payment confirmed") and the tutor (heads-up),
 *     now including the real video link if the retry succeeded.
 * On rejection this emails the student so they know to resubmit proof or
 * contact support - previously neither outcome sent any notification at
 * all, leaving students/tutors with no way to know a decision had been
 * made.
 */
export async function PATCH(request: NextRequest) {
  const check = await requireAdmin(request)
  if (check.error) return check.error
  const { admin } = check

  const body = (await request.json().catch(() => null)) as UpdatePaymentBody | null
  if (!body?.id) {
    return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  }
  if (!body.retryMeetingOnly && !body.paymentStatus) {
    return NextResponse.json({ success: false, error: 'paymentStatus is required (or set retryMeetingOnly: true)' }, { status: 400 })
  }
  if (body.paymentStatus && !['paid', 'unpaid', 'rejected'].includes(body.paymentStatus)) {
    return NextResponse.json({ success: false, error: 'paymentStatus must be paid, unpaid or rejected' }, { status: 400 })
  }

  let booking: any
  if (body.retryMeetingOnly) {
    const { data, error } = await admin
      .from('bookings')
      .select(`
        *,
        student:profiles!student_id ( id, full_name, email ),
        tutor:profiles!tutor_id ( id, full_name, email )
      `)
      .eq('id', body.id)
      .single()
    if (error) {
      const { message, migrationRequired } = friendlyDbError(error)
      return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
    }
    booking = data
  } else {
    const { data, error } = await admin
      .from('bookings')
      .update({ payment_status: body.paymentStatus })
      .eq('id', body.id)
      .select(`
        *,
        student:profiles!student_id ( id, full_name, email ),
        tutor:profiles!tutor_id ( id, full_name, email )
      `)
      .single()
    if (error) {
      const { message, migrationRequired } = friendlyDbError(error)
      return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
    }
    booking = data
  }

  let meetingPending: boolean | undefined
  let meetingSetupError: string | null = null
  let emailSent: boolean | undefined

  const shouldEnsureMeeting =
    body.retryMeetingOnly || body.paymentStatus === 'paid'

  if (shouldEnsureMeeting) {
    let meetingUrl: string | null = booking.meeting_url
    let calendarLink: string | null = booking.calendar_link
    let googleEventId: string | null = booking.google_event_id

    // If the video link couldn't be created at booking time (e.g. an
    // expired Google authorization), try again now - whatever caused it to
    // fail may have been fixed since, and the student/tutor are about to be
    // told the session is confirmed, so this is the best moment to retry.
    if (!meetingUrl) {
      if (!isGoogleMeetConfigured()) {
        meetingSetupError =
          'Google Meet is not configured on the server (GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REFRESH_TOKEN missing from environment variables).'
        console.error(meetingSetupError)
      } else {
        try {
          const url = new URL(request.url)
          const baseUrl = `${url.protocol}//${url.host}`
          const meetResult = await createGoogleMeetEvent(
            {
              title: booking.title,
              description: booking.description || `Tutoring session: ${booking.subject || booking.title}`,
              startTime: booking.start_time,
              durationMinutes: booking.duration_minutes,
              attendeeEmails: [booking.tutor?.email, booking.student?.email].filter(Boolean),
            },
            baseUrl
          )
          meetingUrl = meetResult.meetingUrl || null
          calendarLink = meetResult.calendarLink || null
          googleEventId = meetResult.eventId || null
          await admin
            .from('bookings')
            .update({ google_event_id: googleEventId, meeting_url: meetingUrl, calendar_link: calendarLink })
            .eq('id', booking.id)
        } catch (err) {
          meetingSetupError = err instanceof Error ? err.message : 'Failed to create the Google Meet link.'
          console.error('Retry of Google Meet creation failed - continuing without a video link:', err)
        }
      }
    }

    meetingPending = !meetingUrl

    emailSent = await sendPaymentConfirmedEmail({
      studentName: booking.student?.full_name || 'Student',
      studentEmail: booking.student?.email || '',
      tutorName: booking.tutor?.full_name || 'Tutor',
      tutorEmail: booking.tutor?.email || '',
      subject: booking.subject,
      title: booking.title,
      startTime: booking.start_time,
      durationMinutes: booking.duration_minutes,
      isTrial: booking.is_trial,
      price: booking.price,
      meetingUrl: meetingUrl || undefined,
      calendarLink: calendarLink || undefined,
      meetingPending,
    })
  } else if (body.paymentStatus === 'rejected') {
    emailSent = await sendPaymentRejectedEmail({
      studentName: booking.student?.full_name || 'Student',
      studentEmail: booking.student?.email || '',
      tutorName: booking.tutor?.full_name || 'Tutor',
      tutorEmail: booking.tutor?.email || '',
      subject: booking.subject,
      title: booking.title,
      startTime: booking.start_time,
      durationMinutes: booking.duration_minutes,
      isTrial: booking.is_trial,
      price: booking.price,
    })
  }

  return NextResponse.json({
    success: true,
    booking,
    meetingPending,
    meetingSetupError,
    emailSent,
    emailConfigured: isEmailConfigured(),
  })
}
