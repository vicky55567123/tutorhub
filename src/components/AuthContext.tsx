'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { supabase, isSupabaseConfigured, authOperations, dbOperations, localStorageDB, UserProfile } from '../lib/supabase'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  type: 'student' | 'tutor' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  loginWithEmailPassword: (email: string, password: string) => Promise<User>
  registerUser: (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: 'student' | 'tutor'
  }) => Promise<User>
  logout: () => void
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  getAccessToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Convert a Supabase profile row into the shape the rest of the app expects
const profileToUser = (profile: UserProfile): User => ({
  id: profile.id,
  name: profile.full_name,
  email: profile.email,
  avatar: profile.avatar_url,
  type: profile.user_type === 'tutor' ? 'tutor' : profile.user_type === 'admin' ? 'admin' : 'student',
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  // ---------------------------------------------------------------------
  // Real Supabase Auth (email/password + Google OAuth) - primary path once
  // NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are configured.
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return

    let isMounted = true

    const loadFromSession = async (supabaseUserId: string, fallback?: { email?: string; name?: string; avatar?: string }) => {
      try {
        let profile = await dbOperations.getProfile(supabaseUserId)
        if (!profile && fallback?.email) {
          // Profile row hasn't been created by the DB trigger yet (edge case) - create it now
          profile = await dbOperations.upsertProfile({
            id: supabaseUserId,
            email: fallback.email,
            full_name: fallback.name || fallback.email,
            user_type: 'student',
            avatar_url: fallback.avatar,
          })
        }
        if (profile && isMounted) {
          const u = profileToUser(profile)
          setUser(u)
          localStorage.setItem('current_user', JSON.stringify(u))
        }
      } catch (error) {
        console.error('Error loading Supabase profile:', error)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        loadFromSession(data.session.user.id, {
          email: data.session.user.email || undefined,
          name: (data.session.user.user_metadata as any)?.full_name,
          avatar: (data.session.user.user_metadata as any)?.avatar_url,
        })
      } else {
        setIsLoading(false)
      }
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (newSession?.user) {
        setIsLoading(true)
        loadFromSession(newSession.user.id, {
          email: newSession.user.email || undefined,
          name: (newSession.user.user_metadata as any)?.full_name,
          avatar: (newSession.user.user_metadata as any)?.avatar_url,
        })
      } else {
        setUser(null)
        localStorage.removeItem('current_user')
      }
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  // ---------------------------------------------------------------------
  // Legacy fallback path: NextAuth session (Google/Facebook/GitHub) and the
  // localStorage demo database. Only used when Supabase isn't configured.
  // ---------------------------------------------------------------------
  useEffect(() => {
    if (isSupabaseConfigured) return // Supabase effect above takes over

    if (status === 'loading') {
      setIsLoading(true)
      return
    }

    if (session?.user) {
      // Convert NextAuth session to our User format
      const sessionUser = session.user as any
      const nextAuthUser: User = {
        id: sessionUser.id || session.user.email || Date.now().toString(),
        name: session.user.name || '',
        email: session.user.email || '',
        avatar: session.user.image || undefined,
        type: sessionUser.userType || 'student'
      }
      setUser(nextAuthUser)
      localStorage.setItem('current_user', JSON.stringify(nextAuthUser))
    } else {
      // Check localStorage for regular email/password users
      const storedUser = localStorage.getItem('current_user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          if (!parsedUser.avatar || !parsedUser.avatar.includes('googleusercontent')) {
            setUser(parsedUser)
          }
        } catch (error) {
          console.error('Error parsing stored user:', error)
          localStorage.removeItem('current_user')
        }
      }
    }

    setIsLoading(false)
  }, [session, status])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('current_user', JSON.stringify(userData))
  }

  const logout = async () => {
    if (isSupabaseConfigured) {
      await authOperations.signOut()
    }
    if (session) {
      await signOut({ redirect: false })
    }
    setUser(null)
    localStorage.removeItem('current_user')
  }

  const registerUser = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: 'student' | 'tutor'
  }): Promise<User> => {
    const fullName = `${userData.firstName} ${userData.lastName}`.trim()

    if (isSupabaseConfigured) {
      const result = await authOperations.signUp({
        email: userData.email,
        password: userData.password,
        fullName,
        userType: userData.userType,
      })

      if (!result.user) {
        throw new Error('Sign up failed')
      }

      // If email confirmation is required, Supabase won't return a session yet.
      if (!result.session) {
        const pendingUser: User = {
          id: result.user.id,
          name: fullName,
          email: userData.email,
          type: userData.userType,
        }
        throw Object.assign(new Error('Please check your inbox to confirm your email before logging in.'), {
          code: 'EMAIL_CONFIRMATION_REQUIRED',
          user: pendingUser,
        })
      }

      const profile = await dbOperations.getProfile(result.user.id)
      const user = profile
        ? profileToUser(profile)
        : { id: result.user.id, name: fullName, email: userData.email, type: userData.userType }
      login(user)
      return user
    }

    // Fallback: localStorage demo database
    try {
      const profile = await localStorageDB.createUser({
        email: userData.email,
        full_name: fullName,
        user_type: userData.userType,
        password: userData.password
      })
      const user = profileToUser(profile)
      login(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const loginWithEmailPassword = async (email: string, password: string): Promise<User> => {
    if (isSupabaseConfigured) {
      const result = await authOperations.signIn(email, password)
      if (!result.user) throw new Error('Invalid email or password')

      const profile = await dbOperations.getProfile(result.user.id)
      const user = profile
        ? profileToUser(profile)
        : { id: result.user.id, name: email, email, type: 'student' as const }
      login(user)
      return user
    }

    try {
      const profile = await localStorageDB.loginUser(email, password)
      const user = profileToUser(profile)
      login(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    if (isSupabaseConfigured) {
      setIsLoading(true)
      try {
        await authOperations.signInWithGoogle(`${window.location.origin}/dashboard`)
        // Browser will redirect to Google, then back - no further action here.
      } catch (error) {
        setIsLoading(false)
        throw error
      }
      return
    }

    try {
      setIsLoading(true)
      console.log('Starting Google sign-in process...')
      
      // Use NextAuth to sign in with Google - this will open the real Google OAuth popup
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/'
      })
      
      console.log('Google sign-in result:', result)
      
      if (result?.error) {
        console.error('Google sign-in error:', result.error)
        
        if (result.error.includes('invalid_client') || result.error.includes('401')) {
          throw new Error('Google OAuth credentials are not configured properly. Please set up your Google OAuth app in Google Cloud Console and update your .env.local file with the correct GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.')
        }
        if (result.error.includes('redirect_uri_mismatch')) {
          throw new Error('Redirect URI mismatch. Please add http://localhost:3002/api/auth/callback/google to your Google Cloud Console OAuth settings.')
        }
        throw new Error(`Google sign-in failed: ${result.error}`)
      }
      
      // NextAuth will handle the OAuth flow and session management
      setIsLoading(false)
      return Promise.resolve()
    } catch (error) {
      setIsLoading(false)
      console.error('Google sign-in error:', error)
      throw error
    }
  }

  const signInWithFacebook = async () => {
    try {
      // Use NextAuth to sign in with Facebook
      const result = await signIn('facebook', { 
        redirect: false,
        callbackUrl: '/'
      })
      
      if (result?.error) {
        if (result.error.includes('invalid_client') || result.error.includes('401')) {
          throw new Error('Facebook OAuth credentials are not configured properly. Please set up your Facebook OAuth app and update your .env.local file.')
        }
        throw new Error(`Facebook sign-in failed: ${result.error}`)
      }
      
      return Promise.resolve()
    } catch (error) {
      console.error('Facebook sign-in error:', error)
      throw error
    }
  }

  // Returns the current Supabase access token, used to authenticate calls to
  // our own API routes (e.g. /api/bookings) so Row Level Security applies.
  const getAccessToken = async (): Promise<string | null> => {
    if (!isSupabaseConfigured || !supabase) return null
    const { data } = await supabase.auth.getSession()
    return data.session?.access_token || null
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      registerUser,
      loginWithEmailPassword,
      isLoading, 
      signInWithGoogle, 
      signInWithFacebook,
      getAccessToken,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Demo users for testing
export const demoUsers = {
  student: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=400&h=400&fit=crop&crop=face',
    type: 'student' as const
  },
  tutor: {
    id: '2', 
    name: 'Dr. Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    type: 'tutor' as const
  }
}

