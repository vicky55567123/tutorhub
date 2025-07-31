# Google Meet Integration Setup Guide

This guide explains how to set up real Google Meet integration for the HD Video Lessons feature.

## Current Status
🚧 **Not Yet Integrated** - The video lessons feature is implemented but requires Google API setup to create real Google Meet links.

## Prerequisites
- Google Cloud Console account
- Google Workspace or personal Google account
- Node.js application with Google APIs access

## Step 1: Google Cloud Console Setup

1. **Create/Select Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Note your Project ID

2. **Enable APIs**
   ```bash
   # Enable required APIs
   - Google Calendar API
   - Google Meet API (if available in your region)
   ```

3. **Create OAuth 2.0 Credentials**
   - Navigate to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Application type: "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback` (development)
     - `https://yourdomain.com/api/auth/callback` (production)
   - Download the JSON file

## Step 2: Install Dependencies

```bash
npm install googleapis
```

## Step 3: Environment Variables

Add to your `.env.local` file:

```env
# Google API Credentials
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
GOOGLE_REFRESH_TOKEN=your_refresh_token_here

# Optional: Service Account (for server-to-server)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

## Step 4: Get Refresh Token

Create a one-time script to get the refresh token:

```javascript
// scripts/get-refresh-token.js
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'http://localhost:3000/api/auth/callback'
);

const scopes = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/meetings.space.created'
];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
});

console.log('Authorize this app by visiting this url:', url);
// Visit the URL, authorize, and get the code
// Then exchange it for tokens
```

## Step 5: Update API Implementation

Replace the mock implementation in `/api/google-meet/create-meeting/route.ts`:

```typescript
import { google } from 'googleapis'

export async function POST(request: NextRequest) {
  try {
    const { title, description, startTime, duration, attendeeEmails } = await request.json()

    // Initialize Google APIs
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    )

    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client })

    // Create calendar event with Google Meet
    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: startTime,
        timeZone: 'Europe/London'
      },
      end: {
        dateTime: new Date(new Date(startTime).getTime() + duration * 60000).toISOString(),
        timeZone: 'Europe/London'
      },
      attendees: attendeeEmails?.map(email => ({ email })) || [],
      conferenceData: {
        createRequest: {
          requestId: `meet_${Date.now()}`,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      }
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1
    })

    const meetingUrl = response.data.conferenceData?.entryPoints?.[0]?.uri
    const eventId = response.data.id

    return NextResponse.json({
      success: true,
      meeting: {
        id: eventId,
        title,
        description,
        startTime,
        duration,
        meetingUrl,
        status: 'created',
        createdAt: new Date().toISOString()
      },
      message: 'Google Meet session created successfully'
    })

  } catch (error) {
    console.error('Google Calendar API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to create meeting',
      message: error.message
    }, { status: 500 })
  }
}
```

## Step 6: Database Integration

Set up a database table to store meetings:

```sql
CREATE TABLE video_meetings (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  start_time TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  meeting_url VARCHAR(500),
  instructor_id VARCHAR(255),
  student_id VARCHAR(255),
  status ENUM('scheduled', 'in-progress', 'completed', 'cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Step 7: Testing

1. Create a test meeting through the UI
2. Check Google Calendar for the event
3. Verify Google Meet link is generated
4. Test joining the meeting

## Security Notes

- Never expose your Google credentials in client-side code
- Use environment variables for all sensitive data
- Implement proper authentication before allowing meeting creation
- Consider rate limiting to prevent API abuse

## Troubleshooting

**Common Issues:**
- `invalid_client`: Check your OAuth credentials
- `insufficient_permissions`: Verify API scopes
- `quotaExceeded`: Check your API usage limits

**Debug Tips:**
- Enable Google API logging
- Check the Google Cloud Console for API usage
- Verify your OAuth consent screen is configured

## Production Deployment

Before deploying to production:
1. Update redirect URIs in Google Cloud Console
2. Set production environment variables
3. Test with real Google accounts
4. Monitor API usage and costs

---

**Current Implementation Status:**
- ✅ UI Components (Video Lessons page, scheduling modal)
- ✅ API Routes (placeholder implementation)
- ❌ Google Calendar API integration
- ❌ Database persistence
- ❌ Email notifications
- ❌ Meeting reminders

To complete the integration, follow steps 1-7 above.
