'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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
  logout: () => void
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  signInWithGitHub: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const signInWithGoogle = async () => {
    // Demo Google authentication
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const demoUser: User = {
      id: Date.now().toString(),
      name: 'Google Demo User',
      email: 'demo@google.com',
      type: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=400&h=400&fit=crop&crop=face'
    }
    
    login(demoUser)
    return Promise.resolve()
  }

  const signInWithFacebook = async () => {
    // Demo Facebook authentication
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const demoUser: User = {
      id: Date.now().toString(),
      name: 'Facebook Demo User',
      email: 'demo@facebook.com',
      type: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=400&h=400&fit=crop&crop=face'
    }
    
    login(demoUser)
    return Promise.resolve()
  }

  const signInWithGitHub = async () => {
    // Demo GitHub authentication
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const demoUser: User = {
      id: Date.now().toString(),
      name: 'GitHub Demo User',
      email: 'demo@github.com',
      type: 'student',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=400&h=400&fit=crop&crop=face'
    }
    
    login(demoUser)
    return Promise.resolve()
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading, 
      signInWithGoogle, 
      signInWithFacebook, 
      signInWithGitHub 
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
