// Server-only helper for creating a Google Calendar event with a Google Meet
// video-conference link attached. Used by the booking API route (and can be
// reused by any other server code that needs to create a meeting).
import { google } from 'googleapis'

export interface CreateMeetParams {
  title: string
  description?: string
  startTime: string // ISO string
  durationMinutes: number
  attendeeEmails?: string[]
  timeZone?: string
}

export interface CreateMeetResult {
  eventId: string
  meetingUrl?: string
  calendarLink?: string
}

export class GoogleMeetNotConfiguredError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GoogleMeetNotConfiguredError'
  }
}

export class GoogleMeetAuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'GoogleMeetAuthError'
  }
}

/**
 * Creates a Google Calendar event (with a Google Meet link) using a single
 * server-side "booking" Google account. The refresh token is generated once
 * via /api/auth/google/authorize and stored as GOOGLE_REFRESH_TOKEN.
 */
export async function createGoogleMeetEvent(
  params: CreateMeetParams,
  baseUrl: string
): Promise<CreateMeetResult> {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

  if (!clientId || !clientSecret) {
    throw new GoogleMeetNotConfiguredError(
      'Google OAuth credentials are not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.'
    )
  }

  if (!refreshToken) {
    throw new GoogleMeetAuthError(
      'The booking calendar has not been authorized with Google yet. Visit /api/auth/google/authorize once as an admin.'
    )
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, `${baseUrl}/api/auth/google/callback`)
  oauth2Client.setCredentials({ refresh_token: refreshToken })

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  const startDateTime = new Date(params.startTime)
  const endDateTime = new Date(startDateTime.getTime() + params.durationMinutes * 60000)
  const timeZone = params.timeZone || 'Europe/London'

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: params.title,
        description: params.description || 'Online tutoring session',
        start: { dateTime: startDateTime.toISOString(), timeZone },
        end: { dateTime: endDateTime.toISOString(), timeZone },
        attendees: (params.attendeeEmails || [])
          .filter((email) => !!email && email.trim())
          .map((email) => ({ email: email.trim() })),
        conferenceData: {
          createRequest: {
            requestId: `meet_${Date.now()}`,
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 15 },
          ],
        },
      },
    })

    const eventId = response.data.id
    if (!eventId) {
      throw new Error('Google Calendar did not return an event id')
    }

    return {
      eventId,
      meetingUrl: response.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri
        || response.data.hangoutLink
        || undefined,
      calendarLink: response.data.htmlLink || undefined,
    }
  } catch (error: any) {
    if (error?.code === 401) {
      throw new GoogleMeetAuthError('Google authorization has expired. Please re-authorize at /api/auth/google/authorize.')
    }
    throw error
  }
}

/** Cancels/deletes a previously created Google Calendar event. */
export async function deleteGoogleMeetEvent(eventId: string, baseUrl: string): Promise<void> {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) return // nothing to do, not configured

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, `${baseUrl}/api/auth/google/callback`)
  oauth2Client.setCredentials({ refresh_token: refreshToken })
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

  try {
    await calendar.events.delete({ calendarId: 'primary', eventId, sendUpdates: 'all' })
  } catch (error) {
    console.error('Failed to delete Google Calendar event:', error)
  }
}
