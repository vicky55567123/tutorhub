import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseForToken, getAccessTokenFromRequest } from '@/lib/supabaseAdmin'
import { createGoogleMeetEvent, deleteGoogleMeetEvent, GoogleMeetAuthError, GoogleMeetNotConfiguredError } from '@/lib/googleMeet'

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
// Body: { tutorId, title, subject, description, startTime (ISO), durationMinutes, tutorEmail, studentEmail }
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
    durationMinutes = 60,
    tutorEmail,
    studentEmail,
  } = body

  if (!tutorId || !title || !startTime) {
    return NextResponse.json(
      { success: false, error: 'tutorId, title and startTime are required' },
      { status: 400 }
    )
  }

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

  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`

  let meetResult
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
      return NextResponse.json(
        { success: false, error: err.message, requiresSetup: true, setupUrl: '/api/auth/google/authorize' },
        { status: 503 }
      )
    }
    if (err instanceof GoogleMeetAuthError) {
      return NextResponse.json(
        { success: false, error: err.message, requiresAuth: true, authUrl: '/api/auth/google/authorize' },
        { status: 401 }
      )
    }
    console.error('Error creating Google Meet event:', err)
    return NextResponse.json({ success: false, error: 'Failed to create the Google Meet session' }, { status: 500 })
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
      google_event_id: meetResult.eventId,
      meeting_url: meetResult.meetingUrl,
      calendar_link: meetResult.calendarLink,
    })
    .select()
    .single()

  if (insertError) {
    // Roll back the Google Calendar event so we don't leave an orphaned meeting
    await deleteGoogleMeetEvent(meetResult.eventId, baseUrl)
    console.error('Error saving booking:', insertError)
    const message = insertError.message.includes('overlap')
      ? 'This tutor was just booked for that time. Please choose another slot.'
      : insertError.message
    return NextResponse.json({ success: false, error: message }, { status: 409 })
  }

  return NextResponse.json({
    success: true,
    booking,
    message: 'Session booked! A Google Meet invite has been sent to both of you.',
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
