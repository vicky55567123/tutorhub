import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const hasClientId = !!process.env.GOOGLE_CLIENT_ID
    const hasClientSecret = !!process.env.GOOGLE_CLIENT_SECRET
    const hasRedirectUri = !!process.env.GOOGLE_REDIRECT_URI

    // For initial setup, we only need the OAuth credentials
    // Refresh token will be obtained through the OAuth flow
    const isConfigured = hasClientId && hasClientSecret && hasRedirectUri

    const missingVars = []
    if (!hasClientId) missingVars.push('GOOGLE_CLIENT_ID')
    if (!hasClientSecret) missingVars.push('GOOGLE_CLIENT_SECRET')
    if (!hasRedirectUri) missingVars.push('GOOGLE_REDIRECT_URI')

    return NextResponse.json({
      success: true,
      isConfigured,
      status: {
        hasClientId,
        hasClientSecret,
        hasRedirectUri
      },
      missingVars,
      message: isConfigured 
        ? 'Google Meet integration is ready'
        : 'Google Meet integration requires setup',
      setupUrl: isConfigured ? null : '/api/auth/google/authorize',
      nextSteps: isConfigured ? [] : [
        'Complete Google Cloud Console OAuth setup',
        'Add required environment variables',
        'Restart development server'
      ]
    })

  } catch (error) {
    console.error('Error checking Google setup status:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to check setup status'
    }, { status: 500 })
  }
}
