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
    if (!process.env.GOOGLE_REFRESH_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'Authorization required',
        message: 'Please authorize the application with Google to create meetings',
        requiresAuth: true,
        authUrl: '/api/auth/google/authorize'
      }, { status: 401 })
    }

    try {
      // Initialize Google APIs
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google/callback`
      )

      oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
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
        attendees: attendeeEmails?.filter((email: string) => email.trim()) || []
      }

      // TODO: Save to database
      // await saveMeetingToDatabase(meeting)

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
