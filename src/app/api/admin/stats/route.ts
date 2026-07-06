import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest } from '@/lib/supabaseAdmin'

/**
 * Admin-only aggregated stats: how many tutors/students are registered, how
 * many sessions have been booked, and a per-person hours breakdown (with
 * subjects) for both students and tutors.
 *
 * Access control: the caller's own Supabase access token is verified, then
 * their `profiles.user_type` must be 'admin'. Only then do we use the
 * service-role admin client to read every profile/booking (bypassing RLS,
 * which otherwise only lets each user see their own bookings).
 */
export async function GET(request: NextRequest) {
  const token = getAccessTokenFromRequest(request)
  if (!token) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const userClient = getSupabaseForToken(token)
  if (!userClient) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
      { status: 503 }
    )
  }

  const { data: userData, error: userError } = await userClient.auth.getUser(token)
  if (userError || !userData?.user) {
    return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 })
  }

  const { data: callerProfile, error: callerError } = await userClient
    .from('profiles')
    .select('user_type')
    .eq('id', userData.user.id)
    .single()

  if (callerError || callerProfile?.user_type !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admins only' }, { status: 403 })
  }

  const admin = getSupabaseAdmin()
  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured', message: 'SUPABASE_SERVICE_ROLE_KEY is missing.' },
      { status: 503 }
    )
  }

  const [{ data: profiles, error: profilesError }, { data: bookings, error: bookingsError }] = await Promise.all([
    admin
      .from('profiles')
      .select('id, full_name, email, user_type, subjects, hourly_rate, created_at')
      .order('created_at', { ascending: false }),
    admin.from('bookings').select('id, student_id, tutor_id, subject, title, duration_minutes, status, start_time'),
  ])

  if (profilesError) {
    return NextResponse.json({ success: false, error: profilesError.message }, { status: 500 })
  }
  if (bookingsError) {
    return NextResponse.json({ success: false, error: bookingsError.message }, { status: 500 })
  }

  const allProfiles = profiles || []
  const allBookings = bookings || []

  const now = new Date()
  // "Active" bookings count toward hours - i.e. everything except ones the
  // student/tutor cancelled. Completed sessions still count (real hours taught).
  const activeStatuses = new Set(['scheduled', 'confirmed', 'in-progress', 'completed'])

  const students = allProfiles
    .filter((p) => p.user_type === 'student')
    .map((p) => {
      const own = allBookings.filter((b) => b.student_id === p.id && activeStatuses.has(b.status))
      const totalHours = own.reduce((sum, b) => sum + (b.duration_minutes || 0), 0) / 60
      const subjects = Array.from(new Set(own.map((b) => b.subject).filter(Boolean))) as string[]
      return {
        id: p.id,
        name: p.full_name || p.email,
        email: p.email,
        sessionsCount: own.length,
        totalHours: Math.round(totalHours * 100) / 100,
        subjects,
      }
    })
    .sort((a, b) => b.totalHours - a.totalHours)

  const tutors = allProfiles
    .filter((p) => p.user_type === 'tutor')
    .map((p) => {
      const own = allBookings.filter((b) => b.tutor_id === p.id && activeStatuses.has(b.status))
      const totalHours = own.reduce((sum, b) => sum + (b.duration_minutes || 0), 0) / 60

      const hoursBySubject = new Map<string, number>()
      for (const b of own) {
        const subj = b.subject || 'General'
        hoursBySubject.set(subj, (hoursBySubject.get(subj) || 0) + (b.duration_minutes || 0) / 60)
      }

      const subjectBreakdown = Array.from(hoursBySubject.entries())
        .map(([subject, hours]) => ({ subject, hours: Math.round(hours * 100) / 100 }))
        .sort((a, b) => b.hours - a.hours)

      return {
        id: p.id,
        name: p.full_name || p.email,
        email: p.email,
        hourlyRate: p.hourly_rate,
        sessionsCount: own.length,
        totalHours: Math.round(totalHours * 100) / 100,
        subjectBreakdown,
      }
    })
    .sort((a, b) => b.totalHours - a.totalHours)

  const upcomingSessions = allBookings.filter(
    (b) => activeStatuses.has(b.status) && b.status !== 'completed' && new Date(b.start_time) > now
  ).length

  return NextResponse.json({
    success: true,
    stats: {
      totalTutors: tutors.length,
      totalStudents: students.length,
      totalSessions: allBookings.length,
      upcomingSessions,
    },
    students,
    tutors,
  })
}
