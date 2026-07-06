// Server-only Supabase client.
// Uses the SERVICE ROLE key which bypasses Row Level Security - never import
// this file from a 'use client' component or expose it to the browser.
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

let _admin: SupabaseClient | null = null

/**
 * Returns a singleton Supabase client authenticated with the service role
 * key, or null if the backend hasn't been configured yet (see .env.example).
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (!supabaseUrl || !serviceRoleKey) return null
  if (!_admin) {
    _admin = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }
  return _admin
}

/**
 * Builds a request-scoped Supabase client that forwards the caller's
 * access token, so PostgREST enforces Row Level Security as that user
 * (auth.uid() resolves to their id) instead of bypassing it.
 */
export function getSupabaseForToken(accessToken: string): SupabaseClient | null {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!supabaseUrl || !anonKey) return null
  return createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

/** Extracts the Supabase access token from an incoming API request. */
export function getAccessTokenFromRequest(request: Request): string | null {
  const header = request.headers.get('authorization') || request.headers.get('Authorization')
  if (!header) return null
  const match = header.match(/^Bearer\s+(.+)$/i)
  return match ? match[1] : null
}

/**
 * Read-only anonymous client for server-side routes that only need to read
 * publicly-readable data (e.g. the tutor directory), without requiring the
 * caller to be signed in.
 */
export function getSupabaseAnon(): SupabaseClient | null {
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  if (!supabaseUrl || !anonKey) return null
  return createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

interface PostgrestLikeError {
  message?: string | null
  code?: string | null
}

/**
 * Turns a raw Postgres/PostgREST error into a clear, actionable message when
 * it looks like a column/table is missing - almost always because a SQL
 * migration file (e.g. database/booking_payments_and_trial.sql) has been
 * shipped in the code but never actually run against this Supabase project.
 * Falls back to the original error message for anything else.
 */
export function friendlyDbError(err: PostgrestLikeError | null | undefined): {
  message: string
  migrationRequired: boolean
} {
  const raw = err?.message || ''
  const looksLikeMissingColumnOrTable =
    err?.code === '42703' || // undefined_column
    err?.code === '42P01' || // undefined_table
    /column .* does not exist/i.test(raw) ||
    /relation .* does not exist/i.test(raw)

  if (looksLikeMissingColumnOrTable) {
    return {
      message:
        'This database is missing recent columns/tables (likely the payments & free-trial update). ' +
        'An admin needs to run database/booking_payments_and_trial.sql in the Supabase SQL Editor, then refresh.',
      migrationRequired: true,
    }
  }

  return { message: raw || 'Unexpected database error', migrationRequired: false }
}
