# Google OAuth Verification Setup Guide

## Issue: "Your app has not met homepage requirements"

This error occurs because Google requires domain verification for OAuth apps in production mode.

## Quick Fix for Development (Recommended)

### Step 1: Configure OAuth Consent Screen and Add Test Users

**For your specific situation (App currently "In Production"):**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "OAuth consent screen"
3. Click on the **"Audience"** tab on the left side

**Current Status Check:**
- ✅ User type: External (correct)
- ❌ Publishing status: "In Production" (this is the problem)
- ⚠️ OAuth user cap: Shows user limit message

**To fix the verification issue:**

4. **Switch back to Testing mode:**
   - In the Audience tab, you should see "Publishing status: In Production"
   - Click on **"Back to testing"** or **"Switch to testing"** button
   - This will immediately resolve the "homepage requirements" error

5. **Add test users (after switching to testing):**
   - After switching to testing mode, you should see a "Test users" section appear
   - Click **"ADD USERS"** or **"+ Add users"**
   - Add your email address (and any others you want to test with)
   - Click **"SAVE"**

**Why this fixes the issue:**
- "In Production" mode requires domain verification and Google's app review
- "Testing" mode allows up to 100 test users without verification
- The OAuth user cap only applies in production mode

**Benefits:**
- No domain verification needed
- Works immediately
- Perfect for development and testing

### Step 2: Verify the Switch to Testing Mode

**After clicking "Back to testing", verify:**

1. **Publishing status changed:**
   - Should now show "Publishing status: Testing"
   - The user cap warning should disappear or become less prominent

2. **Test users section appears:**
   - You should now see a "Test users" section in the Audience tab
   - If not visible immediately, refresh the page

3. **Add your email as test user:**
   - Click "ADD USERS" in the test users section
   - Add your email address
   - Add any other emails you want to test with
   - Click "SAVE"

4. **Verify other tabs:**
   - **Overview tab:** Should show "Testing" status
   - **Branding tab:** Ensure app name is set (TutorHub)
   - **Clients tab:** Your OAuth credentials should be visible

**Important Notes:**
- Testing mode allows up to 100 users without verification
- Your app will work immediately for added test users
- No domain verification required in testing mode
- The "unverified app" warning will still appear but users can proceed

### Alternative: If Audience tab doesn't show Test Users

If you don't see test users option in the Audience tab:

1. **Go to Overview tab first**
2. **Check if your app needs to be configured:**
   - Look for any "Configure" or "Setup" buttons
   - Complete any required setup steps

3. **Ensure External user type:**
   - In Overview, check that User Type is "External"
   - If it shows "Internal", you need Google Workspace for test users

4. **Save and refresh:**
   - Make changes in Overview/Branding tabs
   - Click "SAVE" 
   - Refresh the page and check Audience tab again

### Alternative: Bypass Verification Temporarily

If you still can't find test users section, try this approach:

1. **Go to Credentials page** instead:
   - "APIs & Services" > "Credentials"
   - Click on your OAuth 2.0 Client ID

2. **Add localhost to authorized domains:**
   - Under "Authorized JavaScript origins", ensure you have:
     - `http://localhost:3000`
   - Under "Authorized redirect URIs", ensure you have:
     - `http://localhost:3000/api/auth/callback/google`

3. **Use a different Google account:**
   - Sometimes using the same email that owns the project works
   - Or try with a Gmail account that has developer access

4. **Check your app's verification status:**
   - Go back to "OAuth consent screen"
   - Look for any warnings or verification requirements
   - Click "EDIT APP" if available to modify settings

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

## Common Issues and Solutions

### "Test users" section not visible in Audience tab

**Scenario 1: App not fully configured**
- Go to "Overview" tab first
- Complete any required setup (app name, support email, etc.)
- Save changes and refresh page

**Scenario 2: Wrong user type**
- In "Overview" tab, check "User Type"
- Must be "External" to add test users
- If "Internal", you need Google Workspace

**Scenario 3: App in wrong publishing status**
- In "Overview" tab, check "Publishing status"
- Should be "Testing" not "In production"
- Click to change back to testing mode if needed

**Scenario 4: New Google Cloud Console interface**
- Test users are in the "Audience" tab (not the main screen)
- Click specifically on "Audience" in the left sidebar
- Look for "Test users" section within that tab

### "Access blocked" error when testing

1. **Check OAuth consent screen status:**
   - Must be in "Testing" mode
   - Your email must be added as a test user

2. **Verify redirect URIs:**
   - Must exactly match your app URL
   - Include both HTTP (development) and HTTPS (production)

3. **Clear browser cache:**
   - Clear cookies for Google accounts
   - Try incognito/private browsing mode

### Still having issues?

**Quick Debug Steps:**
1. Open browser console (F12) when clicking "Sign up with Google"
2. Look for error messages in console
3. Check Network tab for failed requests
4. Verify your .env.local file has correct values

**Expected Flow:**
1. Click "Sign up with Google" → Opens Google popup
2. Select your Google account → Shows app permission screen
3. Click "Continue" or "Allow" → Redirects back to your app
4. Should be logged in successfully

## Current Recommendation

For immediate development, use **Option 1: Add Test Users**. This is the fastest solution and perfect for testing your Google Sign-up functionality.

For production deployment, you'll need a real domain and verification.
