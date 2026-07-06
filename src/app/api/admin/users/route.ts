import { NextRequest, NextResponse } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest, friendlyDbError } from '@/lib/supabaseAdmin'

/**
 * Admin-only user management: create brand-new tutor/student accounts, or
 * update an existing profile's details (phone, subjects, rate, bio, etc.).
 *
 * Access control mirrors /api/admin/stats: the caller's own access token is
 * verified, then their profiles.user_type must be 'admin' before the
 * service-role client is used to bypass RLS.
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

interface CreateUserBody {
  userType?: 'student' | 'tutor'
  fullName?: string
  email?: string
  password?: string
  phone?: string | null
  subjects?: string[]
  hourlyRate?: number | null
  bio?: string | null
  yearsExperience?: number | null
  qualifications?: string[]
}

/** POST: create a brand-new student/tutor account on the admin's behalf. */
export async function POST(request: NextRequest) {
  const check = await requireAdmin(request)
  if (check.error) return check.error
  const { admin } = check

  const body = (await request.json().catch(() => null)) as CreateUserBody | null
  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }

  const { userType, fullName, email, password, phone, subjects, hourlyRate, bio, yearsExperience, qualifications } = body

  if (userType !== 'student' && userType !== 'tutor') {
    return NextResponse.json({ success: false, error: 'userType must be "student" or "tutor"' }, { status: 400 })
  }
  if (!fullName?.trim() || !email?.trim() || !password) {
    return NextResponse.json({ success: false, error: 'fullName, email and password are required' }, { status: 400 })
  }
  if (password.length < 6) {
    return NextResponse.json({ success: false, error: 'Password must be at least 6 characters' }, { status: 400 })
  }

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName.trim(), user_type: userType },
  })

  if (createError || !created?.user) {
    return NextResponse.json({ success: false, error: createError?.message || 'Failed to create user' }, { status: 400 })
  }

  // A DB trigger (handle_new_user) already inserted a basic profile row from
  // the auth user metadata - now fill in the rest of the details.
  const { data: profile, error: updateError } = await admin
    .from('profiles')
    .update({
      full_name: fullName.trim(),
      phone: phone || null,
      subjects: subjects || [],
      hourly_rate: userType === 'tutor' ? hourlyRate ?? null : null,
      bio: userType === 'tutor' ? bio || null : null,
      years_experience: userType === 'tutor' ? yearsExperience ?? null : null,
      qualifications: userType === 'tutor' ? qualifications || [] : [],
      is_approved: true,
    })
    .eq('id', created.user.id)
    .select()
    .single()

  if (updateError) {
    const { message, migrationRequired } = friendlyDbError(updateError)
    return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
  }

  return NextResponse.json({ success: true, profile })
}

interface UpdateUserBody {
  id?: string
  fullName?: string
  phone?: string | null
  subjects?: string[]
  hourlyRate?: number | null
  bio?: string | null
  yearsExperience?: number | null
  qualifications?: string[]
  isApproved?: boolean
}

/** PATCH: update an existing student/tutor's profile details. */
export async function PATCH(request: NextRequest) {
  const check = await requireAdmin(request)
  if (check.error) return check.error
  const { admin } = check

  const body = (await request.json().catch(() => null)) as UpdateUserBody | null
  if (!body?.id) {
    return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  }

  const { id, fullName, phone, subjects, hourlyRate, bio, yearsExperience, qualifications, isApproved } = body

  const updates: Record<string, unknown> = {}
  if (fullName !== undefined) updates.full_name = fullName
  if (phone !== undefined) updates.phone = phone
  if (subjects !== undefined) updates.subjects = subjects
  if (hourlyRate !== undefined) updates.hourly_rate = hourlyRate
  if (bio !== undefined) updates.bio = bio
  if (yearsExperience !== undefined) updates.years_experience = yearsExperience
  if (qualifications !== undefined) updates.qualifications = qualifications
  if (isApproved !== undefined) updates.is_approved = isApproved

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 })
  }

  const { data: profile, error } = await admin.from('profiles').update(updates).eq('id', id).select().single()

  if (error) {
    const { message, migrationRequired } = friendlyDbError(error)
    return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
  }

  return NextResponse.json({ success: true, profile })
}
