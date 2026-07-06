'use client'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client (only if credentials are provided)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

/** True once NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set. */
export const isSupabaseConfigured = !!supabase

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------
export interface UserProfile {
  id: string
  email: string
  full_name: string
  user_type: 'student' | 'tutor' | 'admin'
  avatar_url?: string
  phone?: string
  timezone?: string
  subjects?: string[]
  bio?: string
  hourly_rate?: number
  years_experience?: number
  qualifications?: string[]
  is_approved?: boolean
  created_at: string
  updated_at: string
}

export interface TutorAvailability {
  id: string
  tutor_id: string
  day_of_week: number | null // 0=Sunday .. 6=Saturday
  specific_date: string | null // 'YYYY-MM-DD'
  start_time: string // 'HH:MM:SS'
  end_time: string // 'HH:MM:SS'
  is_recurring: boolean
  created_at: string
}

export type BookingStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
export type PaymentStatus = 'unpaid' | 'pending' | 'paid' | 'free' | 'rejected'

export interface Booking {
  id: string
  student_id: string
  tutor_id: string
  title: string
  subject?: string
  description?: string
  start_time: string
  end_time: string
  duration_minutes: number
  status: BookingStatus
  is_trial: boolean
  price: number
  payment_status: PaymentStatus
  payment_reference?: string
  payment_proof?: string
  payment_submitted_at?: string
  google_event_id?: string
  meeting_url?: string
  calendar_link?: string
  cancelled_by?: string
  cancellation_reason?: string
  created_at: string
  updated_at: string
  // Optional joined data
  student?: Pick<UserProfile, 'id' | 'full_name' | 'email' | 'avatar_url'>
  tutor?: Pick<UserProfile, 'id' | 'full_name' | 'email' | 'avatar_url'>
}

// ----------------------------------------------------------------------------
// Auth helpers (Supabase Auth - real, persisted accounts)
// ----------------------------------------------------------------------------
export const authOperations = {
  async signUp(params: { email: string; password: string; fullName: string; userType: 'student' | 'tutor' }) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: {
          full_name: params.fullName,
          user_type: params.userType,
        },
      },
    })

    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    if (!supabase) throw new Error('Supabase not configured')

    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signInWithGoogle(redirectTo?: string) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: redirectTo || (typeof window !== 'undefined' ? window.location.origin : undefined) },
    })
    if (error) throw error
    return data
  },

  async signOut() {
    if (!supabase) return
    await supabase.auth.signOut()
  },

  async getSession() {
    if (!supabase) return null
    const { data } = await supabase.auth.getSession()
    return data.session
  },
}

// Database operations against Supabase tables (respect Row Level Security)
export const dbOperations = {
  async getProfile(userId: string): Promise<UserProfile | null> {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single()
    if (error) {
      if (error.code === 'PGRST116') return null // no rows
      throw error
    }
    return data as UserProfile
  },

  async upsertProfile(profile: Partial<UserProfile> & { id: string }): Promise<UserProfile> {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ ...profile, updated_at: new Date().toISOString() })
      .select()
      .single()
    if (error) throw error
    return data as UserProfile
  },

  async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase
      .from('profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data as UserProfile
  },

  async listTutors(): Promise<UserProfile[]> {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_type', 'tutor')
      .order('full_name', { ascending: true })
    if (error) throw error
    return (data || []) as UserProfile[]
  },

  async getTutorAvailability(tutorId: string): Promise<TutorAvailability[]> {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase
      .from('tutor_availability')
      .select('*')
      .eq('tutor_id', tutorId)
      .order('day_of_week', { ascending: true })
    if (error) throw error
    return (data || []) as TutorAvailability[]
  },

  async getTutorBusySlots(tutorId: string, from: string, to: string) {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.rpc('get_tutor_busy_slots', {
      p_tutor_id: tutorId,
      p_from: from,
      p_to: to,
    })
    if (error) throw error
    return (data || []) as { start_time: string; end_time: string }[]
  },
}

// ----------------------------------------------------------------------------
// Legacy localStorage fallback - only used when Supabase env vars are not
// configured yet, so the demo/dev experience keeps working out of the box.
// ----------------------------------------------------------------------------
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
