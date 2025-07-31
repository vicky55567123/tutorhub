'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { localStorageDB, UserProfile } from '../lib/supabase'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  type: 'student' | 'tutor'
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data: session, status } = useSession()

  useEffect(() => {
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
      
      // Also save to localStorage for consistency
      localStorage.setItem('current_user', JSON.stringify(nextAuthUser))
    } else {
      // Check localStorage for regular email/password users
      const storedUser = localStorage.getItem('current_user')
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          // Only use localStorage user if it's not from OAuth (has no image)
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
    // Sign out from NextAuth if user is OAuth user
    if (session) {
      await signOut({ redirect: false })
    }
    
    // Clear local state and storage
    setUser(null)
    localStorage.removeItem('current_user')
  }

  // Convert UserProfile to User type
  const convertProfileToUser = (profile: UserProfile): User => ({
    id: profile.id,
    name: profile.full_name,
    email: profile.email,
    avatar: profile.avatar_url,
    type: profile.user_type
  })

  const registerUser = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
    userType: 'student' | 'tutor'
  }): Promise<User> => {
    try {
      const profile = await localStorageDB.createUser({
        email: userData.email,
        full_name: `${userData.firstName} ${userData.lastName}`,
        user_type: userData.userType,
        password: userData.password
      })

      const user = convertProfileToUser(profile)
      login(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const loginWithEmailPassword = async (email: string, password: string): Promise<User> => {
    try {
      const profile = await localStorageDB.loginUser(email, password)
      const user = convertProfileToUser(profile)
      login(user)
      return user
    } catch (error) {
      throw error
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Use NextAuth to sign in with Google - this will open the real Google OAuth popup
      const result = await signIn('google', { 
        redirect: false,
        callbackUrl: '/'
      })
      
      if (result?.error) {
        if (result.error.includes('invalid_client') || result.error.includes('401')) {
          throw new Error('Google OAuth credentials are not configured properly. Please set up your Google OAuth app in Google Cloud Console and update your .env.local file with the correct GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.')
        }
        throw new Error(`Google sign-in failed: ${result.error}`)
      }
      
      // NextAuth will handle the OAuth flow and session management
      return Promise.resolve()
    } catch (error) {
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

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      registerUser,
      loginWithEmailPassword,
      isLoading, 
      signInWithGoogle, 
      signInWithFacebook
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
