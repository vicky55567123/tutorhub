# Google Calendar API Setup for Video Lessons

## Issue: "Google API Error" when scheduling video lessons

The video lessons feature requires additional Google API setup beyond just OAuth authentication.

## Step-by-Step Fix

### Step 1: Enable Google Calendar API

1. **Go to Google Cloud Console:**
   - Navigate to: https://console.cloud.google.com/
   - Select your project

2. **Enable Calendar API:**
   - Go to "APIs & Services" > "Library"
   - Search for "Google Calendar API"
   - Click on "Google Calendar API"
   - Click "ENABLE" button

3. **Verify API is enabled:**
   - Go to "APIs & Services" > "Enabled APIs"
   - You should see "Google Calendar API" in the list

### Step 2: Update OAuth Scopes

1. **Go to OAuth Consent Screen:**
   - "APIs & Services" > "OAuth consent screen"
   - Click on "Data Access and Verification center" tab

2. **Check required scopes:**
   Your app needs these scopes for video lessons:
   - `https://www.googleapis.com/auth/calendar`
   - `https://www.googleapis.com/auth/calendar.events`

3. **Add scopes if missing:**
   - If you don't see these scopes, you may need to re-authorize
   - The scopes should be automatically requested by your app

### Step 3: Re-authorize Google Access

Since you may have authorized before enabling Calendar API, you need to re-authorize:

1. **Clear existing authorization:**
   - Go to your Google Account: https://myaccount.google.com/
   - Go to "Security" > "Third-party apps with account access"
   - Find your "TutorHub" app and remove it

2. **Test the authorization flow:**
   - Go to your app: http://localhost:3000/video-lessons
   - Try to schedule a lesson
   - It should redirect you to Google for re-authorization
   - This time it will request Calendar permissions

### Step 4: Verify Environment Variables

Check your `.env.local` has all required variables:

```env
# These should already be working (for OAuth login)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=demo_secret_for_development_only_12345
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# These are needed for video lessons
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token
```

### Step 5: Test Video Lesson Creation

1. **Go to Video Lessons page:**
   - Navigate to: http://localhost:3000/video-lessons

2. **Schedule a test lesson:**
   - Click "Schedule New Lesson"
   - Fill in the details
   - If it asks for authorization, approve it
   - Should create a real Google Calendar event with Meet link

## Troubleshooting Common Errors

### Error: "Calendar API has not been used"
**Solution:** Enable Google Calendar API in Google Cloud Console (Step 1)

### Error: "Invalid scope" or "Insufficient permissions"
**Solution:** Re-authorize the app to get Calendar permissions (Step 3)

### Error: "Refresh token invalid"
**Solution:** 
1. Remove app from Google Account permissions
2. Try scheduling a lesson again (will re-authorize)
3. New refresh token will be generated

### Error: "Redirect URI mismatch"
**Solution:** Ensure redirect URI in Google Cloud Console matches exactly:
- `http://localhost:3000/api/auth/callback/google`

## Expected Result

After fixing:
- ✅ Google Sign-up works (already fixed)
- ✅ Video lesson scheduling works
- ✅ Real Google Calendar events created
- ✅ Google Meet links generated automatically
- ✅ Email invitations sent to attendees

## Current Status Check

You can check if everything is working by:
1. Going to video lessons page
2. Clicking "Schedule New Lesson" 
3. Should work without API errors
4. Check your Google Calendar for the created event
