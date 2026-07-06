import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAnon, getSupabaseForToken, getAccessTokenFromRequest } from '@/lib/supabaseAdmin'

// GET /api/availability?tutorId=xxx - publicly readable list of a tutor's slots
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const tutorId = searchParams.get('tutorId')

  if (!tutorId) {
    return NextResponse.json({ success: false, error: 'tutorId is required' }, { status: 400 })
  }

  const supabase = getSupabaseAnon()
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
      { status: 503 }
    )
  }

  const { data, error } = await supabase
    .from('tutor_availability')
    .select('*')
    .eq('tutor_id', tutorId)
    .order('day_of_week', { ascending: true })

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, availability: data || [] })
}

// POST /api/availability - tutor adds a recurring weekly slot or a one-off date slot
// Body: { dayOfWeek?: number, specificDate?: string, startTime: string, endTime: string, isRecurring: boolean }
export async function POST(request: NextRequest) {
  const token = getAccessTokenFromRequest(request)
  if (!token) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const supabase = getSupabaseForToken(token)
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
      { status: 503 }
    )
  }

  const { data: userData, error: userError } = await supabase.auth.getUser(token)
  if (userError || !userData?.user) {
    return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 })
  }

  const body = await request.json()
  const { dayOfWeek, specificDate, startTime, endTime, isRecurring = true } = body

  if (!startTime || !endTime) {
    return NextResponse.json({ success: false, error: 'startTime and endTime are required' }, { status: 400 })
  }

  if (isRecurring && (dayOfWeek === undefined || dayOfWeek === null)) {
    return NextResponse.json({ success: false, error: 'dayOfWeek is required for recurring slots' }, { status: 400 })
  }

  if (!isRecurring && !specificDate) {
    return NextResponse.json({ success: false, error: 'specificDate is required for one-off slots' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('tutor_availability')
    .insert({
      tutor_id: userData.user.id,
      day_of_week: isRecurring ? dayOfWeek : null,
      specific_date: isRecurring ? null : specificDate,
      start_time: startTime,
      end_time: endTime,
      is_recurring: isRecurring,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, slot: data })
}

// DELETE /api/availability?id=xxx - tutor removes one of their own slots
export async function DELETE(request: NextRequest) {
  const token = getAccessTokenFromRequest(request)
  if (!token) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }

  const supabase = getSupabaseForToken(token)
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured' },
      { status: 503 }
    )
  }

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ success: false, error: 'id is required' }, { status: 400 })
  }

  const { error } = await supabase.from('tutor_availability').delete().eq('id', id)

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
