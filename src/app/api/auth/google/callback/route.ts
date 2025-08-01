import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Authorization failed',
        details: error
      }, { status: 400 })
    }

    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'No authorization code received'
      }, { status: 400 })
    }

    // Get the base URL from the request
    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`
    const redirectUri = `${baseUrl}/api/auth/google/callback`

    console.log('Callback Debug Info:', {
      baseUrl,
      redirectUri,
      host: url.host,
      protocol: url.protocol
    })

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUri
    )

    // Exchange code for tokens
    const { tokens } = await oauth2Client.getToken(code)
    
    // In production, save the refresh token securely
    console.log('Google OAuth Tokens:', {
      access_token: tokens.access_token?.substring(0, 20) + '...',
      refresh_token: tokens.refresh_token,
      expires_in: tokens.expiry_date
    })

    // For development, display the refresh token
    return NextResponse.json({
      success: true,
      message: 'Authorization successful! Check server logs for refresh token.',
      refreshToken: tokens.refresh_token,
      note: 'Save the refresh token to your .env.local file as GOOGLE_REFRESH_TOKEN'
    })

  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process authorization',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
