# Netlify Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables in your Netlify dashboard under Site settings > Environment variables,
then **trigger a new deploy** (env var changes only take effect on the next build - Netlify does not
hot-reload them like `next dev` does locally).

### Supabase (REQUIRED - powers accounts, tutor availability & bookings)

Without these three, every page that talks to the backend (Book a Session, My
Availability, Edit My Profile, Dashboard sessions) will show
"Backend not configured". Copy the values from your local `.env.local` file
(or from your Supabase project -> Project Settings -> API):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

`NEXT_PUBLIC_*` variables are baked into the JavaScript bundle at build time,
which is why simply setting them and restarting the app isn't enough on
Netlify - a full rebuild is required.

### NextAuth Configuration
```
NEXTAUTH_URL=https://YOUR_SITE_NAME.netlify.app
NEXTAUTH_SECRET=your_production_secret_here_make_it_long_and_random
```

### Google OAuth & Google Meet Configuration

`GOOGLE_REDIRECT_URI` must point at your **production** domain (not
localhost), and this exact URL must also be added to "Authorized redirect
URIs" in Google Cloud Console -> APIs & Services -> Credentials.

```
GOOGLE_CLIENT_ID=your_google_client_id_from_console
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_console
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_from_console
GOOGLE_REDIRECT_URI=https://YOUR_SITE_NAME.netlify.app/api/auth/google/callback
GOOGLE_REFRESH_TOKEN=your_refresh_token_here
```

If `GOOGLE_REFRESH_TOKEN` isn't set yet, visit
`https://YOUR_SITE_NAME.netlify.app/api/auth/google/authorize` once (logged
in) to generate one, then add it here and redeploy - otherwise booking a
session will fail when trying to create the Google Meet link.

### Facebook OAuth Configuration (if needed)
```
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
NEXT_PUBLIC_FACEBOOK_CLIENT_ID=your_facebook_client_id
```

## Google Cloud Console Configuration

**IMPORTANT:** You need to add the production callback URL to your Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Click on your OAuth 2.0 Client ID
4. In the "Authorized redirect URIs" section, add:
   ```
   https://YOUR_SITE_NAME.netlify.app/api/auth/callback/google
   ```
5. Keep the existing localhost URI for development:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Save the changes

## Netlify Configuration Steps

1. Log into your Netlify dashboard
2. Go to your site settings
3. Navigate to "Environment variables"
4. Add each variable listed above
5. Redeploy your site

## Testing

After configuration:
- Development: Google OAuth should work on `http://localhost:3000`
- Production: Google OAuth should work on `https://YOUR_SITE_NAME.netlify.app`

## Troubleshooting

**"Backend not configured" / "See BACKEND_SETUP.md to connect Supabase"**
- `NEXT_PUBLIC_SUPABASE_URL` and/or `NEXT_PUBLIC_SUPABASE_ANON_KEY` are missing
  (or were added after the last deploy - Netlify won't pick them up until you
  redeploy). Add them in Site settings -> Environment variables, then go to
  **Deploys -> Trigger deploy -> Clear cache and deploy site**.

If you still get OAuth errors:
1. Verify the callback URL is exactly: `https://YOUR_SITE_NAME.netlify.app/api/auth/callback/google`
2. Check that all environment variables are set in Netlify
3. Ensure Google Cloud Console has both development and production URLs
4. Redeploy the site after adding environment variables (a plain redeploy is
   not always enough - use "Clear cache and deploy site" if changes don't
   seem to take effect)
