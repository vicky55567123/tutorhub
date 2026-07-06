import { NextRequest, NextResponse } from 'next/server'
import { SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest, friendlyDbError } from '@/lib/supabaseAdmin'

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
}

/** PATCH: approve or reject a booking's submitted bank-transfer payment proof. */
export async function PATCH(request: NextRequest) {
  const check = await requireAdmin(request)
  if (check.error) return check.error
  const { admin } = check

  const body = (await request.json().catch(() => null)) as UpdatePaymentBody | null
  if (!body?.id || !body?.paymentStatus) {
    return NextResponse.json({ success: false, error: 'id and paymentStatus are required' }, { status: 400 })
  }

  if (!['paid', 'unpaid', 'rejected'].includes(body.paymentStatus)) {
    return NextResponse.json({ success: false, error: 'paymentStatus must be paid, unpaid or rejected' }, { status: 400 })
  }

  const { data: booking, error } = await admin
    .from('bookings')
    .update({ payment_status: body.paymentStatus })
    .eq('id', body.id)
    .select()
    .single()

  if (error) {
    const { message, migrationRequired } = friendlyDbError(error)
    return NextResponse.json({ success: false, error: message, migrationRequired }, { status: 500 })
  }

  return NextResponse.json({ success: true, booking })
}
