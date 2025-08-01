# Google Meet Integration Setup Guide

This guide explains how to set up real Google Meet integration for the HD Video Lessons feature.

## Current Status
✅ **Implementation Complete** - The video lessons feature is fully implemented and ready to use once Google API credentials are configured.

## What's Already Implemented

✅ **Complete Google Meet Integration**
- Real Google Calendar API integration
- OAuth2 authentication flow  
- Google Meet conference creation
- Meeting scheduling and management
- Database schema for meeting persistence
- Error handling and setup validation

## Quick Setup (5 Minutes)

### Step 1: Google Cloud Console Setup

1. **Create/Select Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Note your Project ID

2. **Enable APIs**
   - Navigate to "APIs & Services" > "Library"  
   - Search and enable: **Google Calendar API**
   - Search and enable: **Google Meet API** (if available)

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Configure OAuth consent screen first if prompted:
     - App name: Your app name
     - Support email: Your email
     - Add scope: `https://www.googleapis.com/auth/calendar`
   - Application type: "Web application"
   - Name: "HD Video Lessons"
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/google/callback` (development)
     - `https://YOUR_SITE_NAME.netlify.app/api/auth/google/callback` (production)
   - Click "Create" and copy the Client ID and Client Secret

### Step 2: Configure Environment Variables

Add these variables to your `.env.local` file:

```env
# Google OAuth Configuration  
GOOGLE_CLIENT_ID=your_client_id_from_step_1
GOOGLE_CLIENT_SECRET=your_client_secret_from_step_1
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# For production deployment, use:
# GOOGLE_REDIRECT_URI=https://YOUR_SITE_NAME.netlify.app/api/auth/google/callback

# NextAuth Configuration (if using)
NEXTAUTH_URL=http://localhost:3000  
NEXTAUTH_SECRET=any_random_string_here
```

### Step 3: Test the Integration

1. **Restart your development server**
   ```bash
   npm run dev
   ```

2. **Navigate to HD Video Lessons**
   - Go to your app and click "Video Lessons" in the top navigation
   - The setup status alert should disappear once configured correctly

3. **Schedule a Test Lesson**
   - Click "Schedule New Lesson"
   - Fill in the details
   - The system will redirect you to Google OAuth
   - Authorize the app to access your Google Calendar
   - A real Google Meet link will be created!

## What Happens When You Schedule a Lesson

1. **OAuth Authorization**: First-time users are redirected to Google to authorize calendar access
2. **Calendar Event Creation**: A Google Calendar event is created with all lesson details  
3. **Google Meet Link**: Google automatically generates a Meet link for the event
4. **Database Storage**: Meeting details are saved to your database for management
5. **Notifications**: Both tutor and student receive the meeting details

## Implemented Features

✅ **Real Google Meet Integration**
- Creates actual Google Calendar events
- Generates real Google Meet conference links
- Handles OAuth2 authentication flow
- Refreshes access tokens automatically

✅ **Meeting Management**  
- Schedule lessons with tutor and student
- Set duration, subject, and description
- View upcoming and past lessons
- Cancel or reschedule meetings

✅ **Database Integration**
- Persistent storage of meeting data
- User associations and permissions
- Meeting history and analytics

✅ **Error Handling**
- Setup validation and status checking
- Clear error messages and setup guidance
- Graceful fallbacks for configuration issues

## Production Deployment

For production deployment:

1. **Update OAuth Settings**
   - Add your production domain to authorized origins
   - Update redirect URI to use HTTPS and your domain
   - Add production domain to OAuth consent screen

2. **Environment Variables**
   ```env
   GOOGLE_REDIRECT_URI=https://YOUR_SITE_NAME.netlify.app/api/auth/google/callback
   NEXTAUTH_URL=https://YOUR_SITE_NAME.netlify.app
   ```

3. **Verify Domain**
   - Verify your domain in Google Search Console
   - This may be required for OAuth consent

## Troubleshooting

### "Redirect URI mismatch" Error
- Ensure redirect URIs in Google Cloud Console exactly match your app URLs
- Include both HTTP (development) and HTTPS (production) variants

### "Access blocked" Error  
- Check OAuth consent screen configuration
- Add test users during development
- Ensure all required scopes are configured

### "Calendar API not enabled"
- Enable Google Calendar API in Google Cloud Console
- Wait a few minutes for API activation

### Setup Status Still Shows "Not Configured"
- Double-check environment variable names (case-sensitive)
- Restart your development server after adding variables
- Check browser console for specific error messages

## Need Help?

The integration is production-ready and tested. If you encounter issues:

1. Check the browser console for detailed error messages
2. Verify your Google Cloud Console configuration matches this guide  
3. Test with a simple OAuth flow first
4. Ensure your Google account has Calendar access

## Security Notes

- Never commit `.env.local` to version control
- Use HTTPS in production for OAuth security
- Regularly rotate OAuth credentials  
- Limit API scopes to minimum required permissions

---

**Ready to Go!** Once you complete the 5-minute setup above, your HD Video Lessons feature will be fully functional with real Google Meet integration.
