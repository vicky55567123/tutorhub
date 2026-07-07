import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest, friendlyDbError } from '@/lib/supabaseAdmin'
import { isEmailConfigured } from '@/lib/email'
import { isGoogleMeetConfigured } from '@/lib/googleMeet'

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
      .select(
        'id, full_name, email, user_type, phone, subjects, hourly_rate, bio, years_experience, qualifications, is_approved, created_at'
      )
      .order('created_at', { ascending: false }),
    admin
      .from('bookings')
      .select(
        'id, student_id, tutor_id, subject, title, duration_minutes, status, start_time, end_time, is_trial, price, payment_status, payment_reference, payment_proof, payment_submitted_at'
      ),
  ])

  if (profilesError) {
    const { message, migrationRequired } = friendlyDbError(profilesError)
    return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
  }
  if (bookingsError) {
    const { message, migrationRequired } = friendlyDbError(bookingsError)
    return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
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
      const totalPaid = own.reduce((sum, b) => sum + (b.payment_status === 'paid' ? Number(b.price) || 0 : 0), 0)

      const sessions = own
        .map((b) => {
          const tutor = allProfiles.find((tp) => tp.id === b.tutor_id)
          return {
            id: b.id,
            title: b.title,
            subject: b.subject || 'General',
            withName: tutor?.full_name || tutor?.email || 'Unknown tutor',
            startTime: b.start_time,
            endTime: b.end_time,
            durationMinutes: b.duration_minutes,
            status: b.status,
            isTrial: !!b.is_trial,
            price: Number(b.price) || 0,
            paymentStatus: b.payment_status,
            paymentReference: b.payment_reference || null,
            paymentProof: b.payment_proof || null,
            paymentSubmittedAt: b.payment_submitted_at || null,
          }
        })
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

      return {
        id: p.id,
        name: p.full_name || p.email,
        email: p.email,
        phone: p.phone || null,
        sessionsCount: own.length,
        totalHours: Math.round(totalHours * 100) / 100,
        totalPaid: Math.round(totalPaid * 100) / 100,
        subjects,
        joinedAt: p.created_at,
        sessions,
      }
    })
    .sort((a, b) => b.totalHours - a.totalHours)

  const tutors = allProfiles
    .filter((p) => p.user_type === 'tutor')
    .map((p) => {
      const own = allBookings.filter((b) => b.tutor_id === p.id && activeStatuses.has(b.status))
      const totalHours = own.reduce((sum, b) => sum + (b.duration_minutes || 0), 0) / 60
      const totalEarned = own.reduce((sum, b) => sum + (b.payment_status === 'paid' ? Number(b.price) || 0 : 0), 0)

      const hoursBySubject = new Map<string, number>()
      const revenueBySubject = new Map<string, number>()
      for (const b of own) {
        const subj = b.subject || 'General'
        hoursBySubject.set(subj, (hoursBySubject.get(subj) || 0) + (b.duration_minutes || 0) / 60)
        if (b.payment_status === 'paid') {
          revenueBySubject.set(subj, (revenueBySubject.get(subj) || 0) + (Number(b.price) || 0))
        }
      }

      const subjectBreakdown = Array.from(hoursBySubject.entries())
        .map(([subject, hours]) => ({
          subject,
          hours: Math.round(hours * 100) / 100,
          revenue: Math.round((revenueBySubject.get(subject) || 0) * 100) / 100,
        }))
        .sort((a, b) => b.hours - a.hours)

      const sessions = own
        .map((b) => {
          const student = allProfiles.find((sp) => sp.id === b.student_id)
          return {
            id: b.id,
            title: b.title,
            subject: b.subject || 'General',
            withName: student?.full_name || student?.email || 'Unknown student',
            startTime: b.start_time,
            endTime: b.end_time,
            durationMinutes: b.duration_minutes,
            status: b.status,
            isTrial: !!b.is_trial,
            price: Number(b.price) || 0,
            paymentStatus: b.payment_status,
            paymentReference: b.payment_reference || null,
            paymentProof: b.payment_proof || null,
            paymentSubmittedAt: b.payment_submitted_at || null,
          }
        })
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())

      return {
        id: p.id,
        name: p.full_name || p.email,
        email: p.email,
        phone: p.phone || null,
        hourlyRate: p.hourly_rate,
        bio: p.bio || null,
        yearsExperience: p.years_experience ?? null,
        qualifications: p.qualifications || [],
        isApproved: !!p.is_approved,
        sessionsCount: own.length,
        totalHours: Math.round(totalHours * 100) / 100,
        totalEarned: Math.round(totalEarned * 100) / 100,
        subjectBreakdown,
        joinedAt: p.created_at,
        sessions,
      }
    })
    .sort((a, b) => b.totalHours - a.totalHours)

  const upcomingSessions = allBookings.filter(
    (b) => activeStatuses.has(b.status) && b.status !== 'completed' && new Date(b.start_time) > now
  ).length

  const totalRevenue = allBookings.reduce(
    (sum, b) => sum + (b.payment_status === 'paid' ? Number(b.price) || 0 : 0),
    0
  )
  const totalTrials = allBookings.filter((b) => b.is_trial && b.status !== 'cancelled').length
  const pendingPayments = allBookings.filter((b) => b.payment_status === 'pending').length

  return NextResponse.json({
    success: true,
    stats: {
      totalTutors: tutors.length,
      totalStudents: students.length,
      totalSessions: allBookings.length,
      upcomingSessions,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalTrials,
      pendingPayments,
    },
    students,
    tutors,
    // Lets the Admin Dashboard show a clear "not configured" banner instead
    // of leaving admins to guess why bookings show "video link pending" or
    // why no emails ever arrive - both silently no-op when unset.
    integrations: {
      emailConfigured: isEmailConfigured(),
      googleMeetConfigured: isGoogleMeetConfigured(),
    },
  })
}
