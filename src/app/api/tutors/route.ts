import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAnon } from '@/lib/supabaseAdmin'

// Public tutor directory - lists every approved tutor profile.
export async function GET(request: NextRequest) {
  const supabase = getSupabaseAnon()
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: 'Backend not configured', message: 'Supabase environment variables are missing.' },
      { status: 503 }
    )
  }

  const { searchParams } = new URL(request.url)
  const subject = searchParams.get('subject')

  let query = supabase
    .from('profiles')
    .select('id, full_name, email, avatar_url, subjects, bio, hourly_rate, years_experience, qualifications, is_approved')
    .eq('user_type', 'tutor')
    .order('full_name', { ascending: true })

  if (subject) {
    query = query.contains('subjects', [subject])
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching tutors:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, tutors: data || [] })
}
