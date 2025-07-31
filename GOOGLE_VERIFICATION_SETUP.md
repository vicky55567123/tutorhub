# Google OAuth Verification Setup Guide

## Issue: "Your app has not met homepage requirements"

This error occurs because Google requires domain verification for OAuth apps in production mode.

## Quick Fix for Development (Recommended)

### Step 1: Add Test Users to OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "OAuth consent screen"
3. Scroll down to "Test users" section
4. Click "ADD USERS"
5. Add the email addresses you want to test with (including your own)
6. Click "SAVE"

**Benefits:**
- No domain verification needed
- Works immediately
- Perfect for development and testing

### Step 2: Set App to Testing Mode

1. In OAuth consent screen, ensure "Publishing status" is set to "Testing"
2. This allows up to 100 test users without verification

## Production Solution (For Live Deployment)

### Step 1: Get a Real Domain

1. Purchase a domain (e.g., from Namecheap, GoDaddy, etc.)
2. Point it to your hosting service (Netlify, Vercel, etc.)

### Step 2: Verify Domain Ownership

1. In Google Cloud Console, go to "APIs & Services" > "Credentials"
2. Click on your OAuth 2.0 Client ID
3. Under "Authorized domains", add your domain
4. Follow Google's domain verification process:
   - Add DNS TXT record, OR
   - Upload HTML verification file, OR
   - Use Google Analytics/Search Console

### Step 3: Update OAuth Settings

1. **Authorized JavaScript origins:**
   - `https://yourdomain.com`
   - `http://localhost:3000` (for development)

2. **Authorized redirect URIs:**
   - `https://yourdomain.com/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

3. **Update .env.local for production:**
   ```env
   NEXTAUTH_URL=https://yourdomain.com
   ```

## Alternative: Use Netlify/Vercel Subdomain

If you don't want to buy a domain:

1. Deploy to Netlify/Vercel (they provide free subdomains)
2. Use their subdomain for verification:
   - `https://your-app-name.netlify.app`
   - `https://your-app-name.vercel.app`

## Current Recommendation

For immediate development, use **Option 1: Add Test Users**. This is the fastest solution and perfect for testing your Google Sign-up functionality.

For production deployment, you'll need a real domain and verification.
