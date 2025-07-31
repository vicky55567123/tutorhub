'use client'

import { createClient } from '@supabase/supabase-js'

// For development mode, we'll use local storage as the primary database
// You can replace these with your actual Supabase project credentials later
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client (only if credentials are provided)
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Types for our user data
export interface UserProfile {
  id: string
  email: string
  full_name: string
  user_type: 'student' | 'tutor'
  avatar_url?: string
  created_at: string
  updated_at: string
}

// Database operations
export const dbOperations = {
  // Create user profile after signup
  async createUserProfile(userId: string, userData: {
    email: string
    full_name: string
    user_type: 'student' | 'tutor'
    avatar_url?: string
  }) {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .insert([{
        id: userId,
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Get user profile
  async getUserProfile(userId: string) {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Update user profile
  async updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    if (!supabase) {
      throw new Error('Supabase not configured')
    }

    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Local storage fallback for development
export const localStorageDB = {
  async createUser(userData: {
    email: string
    full_name: string
    user_type: 'student' | 'tutor'
    password: string
  }) {
    const userId = Date.now().toString()
    const userProfile: UserProfile = {
      id: userId,
      email: userData.email,
      full_name: userData.full_name,
      user_type: userData.user_type,
      avatar_url: userData.user_type === 'student' 
        ? 'https://images.unsplash.com/photo-1494790108755-2616b612b3dd?w=400&h=400&fit=crop&crop=face'
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Store in localStorage (for development)
    const existingUsers = this.getAllUsers()
    const emailExists = existingUsers.find(user => user.email === userData.email)
    
    if (emailExists) {
      throw new Error('Email already exists')
    }

    existingUsers.push(userProfile)
    localStorage.setItem('tutor_hub_users', JSON.stringify(existingUsers))
    
    return userProfile
  },

  async loginUser(email: string, password: string) {
    const users = this.getAllUsers()
    const user = users.find(u => u.email === email)
    
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // In a real app, you'd verify the password hash
    // For demo purposes, we'll just return the user
    return user
  },

  getAllUsers(): UserProfile[] {
    const usersJson = localStorage.getItem('tutor_hub_users')
    return usersJson ? JSON.parse(usersJson) : []
  },

  async getUserByEmail(email: string) {
    const users = this.getAllUsers()
    return users.find(user => user.email === email) || null
  }
}
