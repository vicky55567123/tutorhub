import { NextRequest, NextResponse } from 'next/server'
import { createGoogleMeetEvent, GoogleMeetAuthError, GoogleMeetNotConfiguredError } from '@/lib/googleMeet'

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

    const url = new URL(request.url)
    const baseUrl = `${url.protocol}//${url.host}`

    try {
      const { eventId, meetingUrl, calendarLink } = await createGoogleMeetEvent(
        {
          title,
          description,
          startTime,
          durationMinutes: duration || 60,
          attendeeEmails,
        },
        baseUrl
      )

      // Create meeting object
      const meeting = {
        id: eventId,
        title,
        description: description || 'HD Video Lesson',
        subject: subject || 'General',
        startTime: new Date(startTime).toISOString(),
        duration: duration || 60,
        meetingUrl,
        calendarLink,
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

      if (googleError instanceof GoogleMeetNotConfiguredError) {
        return NextResponse.json({
          success: false,
          error: 'Google OAuth not configured',
          message: googleError.message,
          requiresSetup: true,
          setupUrl: '/api/auth/google/authorize'
        }, { status: 503 })
      }

      if (googleError instanceof GoogleMeetAuthError) {
        return NextResponse.json({
          success: false,
          error: 'Authorization required',
          message: googleError.message,
          requiresAuth: true,
          authUrl: '/api/auth/google/authorize'
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

