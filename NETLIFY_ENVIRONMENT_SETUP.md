# Netlify Environment Variables Setup

## Required Environment Variables for Production

Add these environment variables in your Netlify dashboard under Site settings > Environment variables:

### NextAuth Configuration
```
NEXTAUTH_URL=https://yourtutor.netlify.app
NEXTAUTH_SECRET=your_production_secret_here_make_it_long_and_random
```

### Google OAuth Configuration
```
GOOGLE_CLIENT_ID=your_google_client_id_from_console
GOOGLE_CLIENT_SECRET=your_google_client_secret_from_console
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_from_console
```

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
   https://yourtutor.netlify.app/api/auth/callback/google
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
- Production: Google OAuth should work on `https://yourtutor.netlify.app`

## Troubleshooting

If you still get OAuth errors:
1. Verify the callback URL is exactly: `https://yourtutor.netlify.app/api/auth/callback/google`
2. Check that all environment variables are set in Netlify
3. Ensure Google Cloud Console has both development and production URLs
4. Redeploy the site after adding environment variables
