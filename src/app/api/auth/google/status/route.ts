import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getSupabaseForToken, getSupabaseAdmin, getAccessTokenFromRequest } from '@/lib/supabaseAdmin'

/**
 * Admin-only diagnostic: actually attempts to use GOOGLE_REFRESH_TOKEN to get
 * a fresh Google access token (the same operation createGoogleMeetEvent()
 * relies on) and reports Google's real response - instead of just checking
 * whether the environment variables are *present* (see
 * /api/google-meet/setup-status, which only checks that).
 *
 * This exists because "Google authorization has expired or was revoked" can
 * have several different root causes that all look identical from the
 * booking flow (missing env var, wrong client id/secret pairing, a stale
 * value that didn't actually get redeployed, a revoked/expired token, the
 * OAuth consent screen still in "Testing" mode, etc) - this endpoint pins
 * down exactly which one it is.
 *
 * Visit while logged in as an admin: GET /api/auth/google/status
 */
export async function GET(request: NextRequest) {
  const token = getAccessTokenFromRequest(request)
  if (!token) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 })
  }
  const userClient = getSupabaseForToken(token)
  if (!userClient) {
    return NextResponse.json({ success: false, error: 'Backend not configured' }, { status: 503 })
  }
  const { data: userData, error: userError } = await userClient.auth.getUser(token)
  if (userError || !userData?.user) {
    return NextResponse.json({ success: false, error: 'Invalid or expired session' }, { status: 401 })
  }
  const { data: callerProfile } = await userClient.from('profiles').select('user_type').eq('id', userData.user.id).single()
  if (callerProfile?.user_type !== 'admin') {
    return NextResponse.json({ success: false, error: 'Admins only' }, { status: 403 })
  }

  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

  const envStatus = {
    hasClientId: !!clientId,
    hasClientSecret: !!clientSecret,
    hasRefreshToken: !!refreshToken,
    // Helps spot copy/paste mistakes (accidental whitespace/newline/quotes)
    // without printing the actual secret values.
    refreshTokenLength: refreshToken ? refreshToken.trim().length : 0,
    refreshTokenLooksTrimmed: refreshToken ? refreshToken === refreshToken.trim() : null,
  }

  if (!clientId || !clientSecret) {
    return NextResponse.json({
      success: false,
      configured: false,
      envStatus,
      diagnosis: 'GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET are missing from this environment. Set them in Netlify -> Environment variables and redeploy.',
    })
  }
  if (!refreshToken) {
    return NextResponse.json({
      success: false,
      configured: false,
      envStatus,
      diagnosis: 'GOOGLE_REFRESH_TOKEN is missing from this environment. Visit /api/auth/google/authorize, copy the refreshToken from the JSON response, set it in Netlify -> Environment variables, then redeploy.',
    })
  }

  const url = new URL(request.url)
  const baseUrl = `${url.protocol}//${url.host}`
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, `${baseUrl}/api/auth/google/callback`)
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  try {
    // This is the exact operation that fails inside createGoogleMeetEvent -
    // exchanging the refresh token for a fresh access token. If this
    // succeeds, the token itself is valid and the problem (if any) is
    // elsewhere (e.g. Calendar API not enabled, insufficient scopes).
    const { token: accessToken } = await oauth2Client.getAccessToken()
    if (!accessToken) {
      return NextResponse.json({
        success: false,
        configured: true,
        envStatus,
        diagnosis: 'Google returned no access token for this refresh token, with no error - this is unusual. Try re-authorizing at /api/auth/google/authorize.',
      })
    }

    // Also do a trivial, harmless Calendar API call to confirm the Calendar
    // API itself is enabled and reachable with this token (a valid access
    // token alone doesn't guarantee the Calendar API is turned on for this
    // Google Cloud project).
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    const calendarList = await calendar.calendarList.list({ maxResults: 1 })

    return NextResponse.json({
      success: true,
      configured: true,
      envStatus,
      diagnosis: 'GOOGLE_REFRESH_TOKEN is valid and the Calendar API is reachable. Google Meet event creation should work.',
      calendarsFound: calendarList.data.items?.length ?? 0,
    })
  } catch (error: any) {
    const status = error?.code ?? error?.response?.status
    const reason =
      error?.response?.data?.error ||
      error?.response?.data?.error_description ||
      error?.errors?.[0]?.reason ||
      error?.message

    let diagnosis = `Google rejected the request (status ${status ?? 'unknown'}, reason: ${reason ?? 'unknown'}).`
    if (reason === 'invalid_grant') {
      diagnosis +=
        ' This specifically means the refresh token itself is dead - either it was revoked, the Google account\'s password/security settings changed, it\'s older than 6 months unused, or (very common) your OAuth consent screen is still in "Testing" publishing status in Google Cloud Console, which causes Google to auto-expire refresh tokens after 7 days regardless of use. Fix: in Google Cloud Console -> APIs & Services -> OAuth consent screen, either publish the app to "In production", or add this Google account under "Test users" AND re-authorize (redo /api/auth/google/authorize) right before testing so the 7-day window hasn\'t elapsed. Also double check GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET on Netlify are the exact pair the token was issued for - a mismatched client/secret also produces invalid_grant.'
    } else if (status === 403 || reason === 'accessNotConfigured' || /calendar api/i.test(String(reason))) {
      diagnosis +=
        ' This looks like the Google Calendar API is not enabled for this Google Cloud project. Fix: Google Cloud Console -> APIs & Services -> Library -> search "Google Calendar API" -> Enable.'
    }

    return NextResponse.json({
      success: false,
      configured: true,
      envStatus,
      googleError: { status, reason },
      diagnosis,
    })
  }
}
