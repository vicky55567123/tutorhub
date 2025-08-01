#!/bin/bash

# Production Environment Variables for Netlify
# Copy these values and add them to your Netlify environment variables

echo "=== NETLIFY ENVIRONMENT VARIABLES ==="
echo ""
echo "NEXTAUTH_URL=https://yourtutor.netlify.app"
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
echo "GOOGLE_CLIENT_ID=your_google_client_id_from_console"
echo "GOOGLE_CLIENT_SECRET=your_google_client_secret_from_console"
echo "NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_from_console"
echo ""
echo "=== GOOGLE CLOUD CONSOLE SETUP ==="
echo "Add this callback URL to your Google OAuth app:"
echo "https://yourtutor.netlify.app/api/auth/callback/google"
echo ""
echo "=== INSTRUCTIONS ==="
echo "1. Add all the environment variables above to Netlify"
echo "2. Add the callback URL to Google Cloud Console"
echo "3. Redeploy your Netlify site"
