import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createHash } from 'crypto'
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
    // without printing the actual secret values. Compare these lengths
    // against what you expect locally to catch truncation in Netlify's env
    // var UI (a very common cause of an *immediate* invalid_grant on a
    // freshly-minted token, as opposed to the 7-day Testing-mode expiry).
    clientIdLength: clientId ? clientId.trim().length : 0,
    clientIdLooksTrimmed: clientId ? clientId === clientId.trim() : null,
    clientIdLast6: clientId ? clientId.trim().slice(-6) : null,
    clientSecretLength: clientSecret ? clientSecret.trim().length : 0,
    clientSecretLooksTrimmed: clientSecret ? clientSecret === clientSecret.trim() : null,
    // A short, non-reversible fingerprint of the secret (NOT the secret
    // itself) so you can confirm two deploys/environments are using the
    // exact same secret value without ever exposing it.
    clientSecretFingerprint: clientSecret
      ? createHash('sha256').update(clientSecret.trim()).digest('hex').slice(0, 12)
      : null,
    refreshTokenLength: refreshToken ? refreshToken.trim().length : 0,
    refreshTokenLooksTrimmed: refreshToken ? refreshToken === refreshToken.trim() : null,
    refreshTokenLast6: refreshToken ? refreshToken.trim().slice(-6) : null,
    // Netlify auto-injects these at build/runtime - lets us prove exactly
    // which deploy and context is actually serving this request, to rule
    // out "the env var change didn't actually get deployed yet" as a cause.
    netlifyContext: process.env.CONTEXT ?? null,
    netlifyDeployId: process.env.DEPLOY_ID ?? null,
    netlifyCommitRef: process.env.COMMIT_REF ?? null,
    netlifySiteUrl: process.env.URL ?? null,
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
        ' This means the refresh token itself is dead. If this token is more than a few minutes old, the most likely cause is your OAuth consent screen still being in "Testing" publishing status in Google Cloud Console, which auto-expires refresh tokens after 7 days. Fix: publish the app to "In production". BUT if you just generated this token moments ago via /api/auth/google/authorize and it is ALREADY failing, the 7-day rule cannot be the cause (not enough time has passed) - instead this means GOOGLE_CLIENT_ID and/or GOOGLE_CLIENT_SECRET stored in this environment do not match the pair that was active when the token was issued. Check the clientIdLength/clientSecretLength below against your Google Cloud Console credentials, make sure there is only ONE Netlify env var entry per key (no duplicate scoped entries), and make sure the redeploy that picked up the new GOOGLE_REFRESH_TOKEN did not happen with a stale/different GOOGLE_CLIENT_SECRET. Re-authorizing again will not help unless the client id/secret pairing is fixed first.'
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
