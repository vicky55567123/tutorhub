import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing Google Calendar API access...')
    
    // Check environment variables
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        details: {
          hasClientId: !!process.env.GOOGLE_CLIENT_ID,
          hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
          hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN
        }
      })
    }

    // Initialize OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google/callback`
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    // Test Calendar API
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
    
    console.log('Attempting to list calendars...')
    const calendarsResponse = await calendar.calendarList.list()
    
    console.log('Calendar API test successful!')
    
    return NextResponse.json({
      success: true,
      message: 'Calendar API is working!',
      calendarsCount: calendarsResponse.data.items?.length || 0,
      calendars: calendarsResponse.data.items?.map(cal => ({
        id: cal.id,
        summary: cal.summary,
        primary: cal.primary
      })) || []
    })

  } catch (error: any) {
    console.error('Calendar API test error:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      details: error.errors || [],
      suggestion: error.message.includes('not been used') 
        ? 'Enable Google Calendar API in Google Cloud Console'
        : error.message.includes('invalid_grant')
        ? 'Refresh token may be expired or invalid'
        : 'Check your Google Cloud Console configuration'
    })
  }
}
