# Google OAuth Setup Guide for TutorHub

## 🚀 Quick Start (Demo Mode)
The app is currently running in **demo mode** with simulated Google authentication. To enable real Google OAuth, follow the steps below.

## 🔧 Setting Up Real Google OAuth

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Name it "TutorHub" or similar

### Step 2: Enable Google+ API
1. Go to **APIs & Services** > **Library**
2. Search for "Google+ API" 
3. Click **Enable**

### Step 3: Create OAuth Credentials
1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Web application**
4. Add authorized origins:
   - `http://localhost:3000` (for development)
   - `https://yourdomain.com` (for production)
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

### Step 4: Update Environment Variables
1. Copy your **Client ID** and **Client Secret**
2. Update `.env.local`:
```env
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
NEXTAUTH_SECRET=your_secure_random_string_here
```

### Step 5: Generate NextAuth Secret
Run this command to generate a secure secret:
```bash
openssl rand -base64 32
```

## 🎯 Current Features (Demo Mode)
- ✅ Simulated Google signup/login
- ✅ User profile creation with name and email
- ✅ User type selection (Student/Tutor)
- ✅ Profile picture assignment
- ✅ Session persistence
- ✅ Proper error handling

## 🔄 How It Works Now

### Demo Mode (Current):
1. User clicks "Sign up with Google"
2. System simulates OAuth flow
3. Creates user profile using form data
4. Logs user in automatically
5. Shows success message

### Production Mode (With Real OAuth):
1. User clicks "Sign up with Google"
2. Redirects to real Google OAuth
3. User authorizes TutorHub access
4. Google returns user data
5. System creates profile and logs in

## 📝 Additional OAuth Providers
To enable Facebook and GitHub OAuth, follow similar steps:

### Facebook:
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create app and get Client ID/Secret
3. Add to environment variables

### GitHub:
1. Go to GitHub Settings > Developer settings
2. Create OAuth App
3. Add credentials to environment

## 🚨 Security Notes
- Never commit real credentials to version control
- Use different credentials for development and production
- Regularly rotate your OAuth secrets
- Keep `.env.local` in `.gitignore`

## 🎉 Benefits of Real OAuth
- ✅ Real Google account integration
- ✅ Automatic profile picture from Google
- ✅ Verified email addresses
- ✅ Enhanced security
- ✅ Professional user experience
- ✅ No password management needed
