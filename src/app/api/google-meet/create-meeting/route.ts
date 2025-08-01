import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const { title, description, startTime, duration, attendeeEmails, subject } = await request.json()

    // Validate required fields
    if (!title || !startTime) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields',
        message: 'Title and start time are required'
      }, { status: 400 })
    }

    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json({
        success: false,
        error: 'Google OAuth not configured',
        message: 'Please configure Google OAuth credentials in environment variables',
        requiresSetup: true,
        setupUrl: '/api/auth/google/authorize'
      }, { status: 503 })
    }

    // Check if refresh token is available
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
    console.log('Environment check:', {
      hasRefreshToken: !!refreshToken,
      refreshTokenLength: refreshToken ? refreshToken.length : 0,
      refreshTokenStart: refreshToken ? refreshToken.substring(0, 10) + '...' : 'NOT_FOUND'
    })

    if (!refreshToken) {
      console.log('No refresh token found, redirecting to auth')
      return NextResponse.json({
        success: false,
        error: 'Authorization required',
        message: 'Please authorize the application with Google to create meetings',
        requiresAuth: true,
        authUrl: '/api/auth/google/authorize'
      }, { status: 401 })
    }

    try {
      // Get the base URL from the request
      const url = new URL(request.url)
      const baseUrl = `${url.protocol}//${url.host}`

      // Initialize Google APIs
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${baseUrl}/api/auth/google/callback`
      )

      oauth2Client.setCredentials({
        refresh_token: refreshToken
      })

      const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

      // Calculate end time
      const startDateTime = new Date(startTime)
      const endDateTime = new Date(startDateTime.getTime() + (duration || 60) * 60000)

      // Create calendar event with Google Meet
      const event = {
        summary: title,
        description: description || 'HD Video Lesson',
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/London'
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/London'
        },
        attendees: attendeeEmails?.filter((email: string) => email.trim()).map((email: string) => ({ email: email.trim() })) || [],
        conferenceData: {
          createRequest: {
            requestId: `meet_${Date.now()}`,
            conferenceSolutionKey: {
              type: 'hangoutsMeet'
            }
          }
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 24 hours before
            { method: 'popup', minutes: 15 } // 15 minutes before
          ]
        }
      }

      const response = await calendar.events.insert({
        calendarId: 'primary',
        conferenceDataVersion: 1,
        sendUpdates: 'all', // Send email invitations to attendees
        requestBody: event
      })

      const meetingUrl = response.data.conferenceData?.entryPoints?.[0]?.uri
      const eventId = response.data.id
      const htmlLink = response.data.htmlLink

      // Create meeting object
      const meeting = {
        id: eventId,
        title,
        description: description || 'HD Video Lesson',
        subject: subject || 'General',
        startTime: startDateTime.toISOString(),
        duration: duration || 60,
        meetingUrl,
        calendarLink: htmlLink,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        attendees: attendeeEmails?.filter((email: string) => email.trim()) || [],
        userId: 'current_user' // TODO: Get actual user ID from session
      }

      // Save to simple in-memory storage (for demo purposes)
      // In production, this would be saved to a real database
      const globalThis = global as any
      globalThis.meetings = globalThis.meetings || []
      globalThis.meetings.push(meeting)

      console.log('Meeting saved to global storage:', meeting.title)
      console.log('Total meetings in storage:', globalThis.meetings.length)

      return NextResponse.json({
        success: true,
        meeting,
        message: 'Google Meet session created successfully! Invitations sent to attendees.'
      })

    } catch (googleError: any) {
      console.error('Google Calendar API error:', googleError)
      
      // Handle specific Google API errors
      if (googleError.code === 401) {
        return NextResponse.json({
          success: false,
          error: 'Google authorization expired',
          message: 'Please re-authorize the application with Google',
          requiresSetup: true,
          setupUrl: '/api/auth/google/authorize'
        }, { status: 401 })
      }

      return NextResponse.json({
        success: false,
        error: 'Google API error',
        message: `Failed to create Google Meet session: ${googleError.message}`,
        details: googleError.errors || []
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Error creating meeting:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create meeting',
        message: 'Unable to create video lesson. Please try again or contact support.'
      },
      { status: 500 }
    )
  }
}
