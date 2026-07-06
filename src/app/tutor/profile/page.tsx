'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { PlusIcon, XMarkIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/components/AuthContext'
import { supabase, isSupabaseConfigured, dbOperations, UserProfile } from '@/lib/supabase'

const SUGGESTED_SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Further Maths',
  'Statistics',
  'English',
]

export default function TutorProfileEditPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [subjects, setSubjects] = useState<string[]>([])
  const [subjectInput, setSubjectInput] = useState('')
  const [bio, setBio] = useState('')
  const [hourlyRate, setHourlyRate] = useState<string>('')
  const [yearsExperience, setYearsExperience] = useState<string>('')
  const [qualifications, setQualifications] = useState<string[]>([])
  const [qualificationInput, setQualificationInput] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    async function loadProfile() {
      if (!user || !isSupabaseConfigured) {
        setIsLoading(false)
        return
      }
      try {
        const profile = await dbOperations.getProfile(user.id)
        if (profile) {
          setSubjects(profile.subjects || [])
          setBio(profile.bio || '')
          setHourlyRate(profile.hourly_rate != null ? String(profile.hourly_rate) : '')
          setYearsExperience(profile.years_experience != null ? String(profile.years_experience) : '')
          setQualifications(profile.qualifications || [])
          setPhone(profile.phone || '')
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast.error('Failed to load your profile')
      } finally {
        setIsLoading(false)
      }
    }
    loadProfile()
  }, [user])

  const addSubject = (subject: string) => {
    const trimmed = subject.trim()
    if (!trimmed) return
    if (subjects.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setSubjectInput('')
      return
    }
    setSubjects((prev) => [...prev, trimmed])
    setSubjectInput('')
  }

  const removeSubject = (subject: string) => {
    setSubjects((prev) => prev.filter((s) => s !== subject))
  }

  const addQualification = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    setQualifications((prev) => [...prev, trimmed])
    setQualificationInput('')
  }

  const removeQualification = (q: string) => {
    setQualifications((prev) => prev.filter((item) => item !== q))
  }

  const handleSave = async () => {
    if (!user || !supabase) return

    if (subjects.length === 0) {
      toast.error('Please add at least one subject you teach')
      return
    }

    setIsSaving(true)
    try {
      const updates: Partial<UserProfile> = {
        subjects,
        bio: bio.trim() || undefined,
        hourly_rate: hourlyRate ? Number(hourlyRate) : undefined,
        years_experience: yearsExperience ? Number(yearsExperience) : undefined,
        qualifications,
        phone: phone.trim() || undefined,
      }
      await dbOperations.updateProfile(user.id, updates)
      toast.success('Profile updated! Students will now see your subjects and details.')
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save your profile. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Backend not configured</h1>
        <p className="text-gray-600">See BACKEND_SETUP.md to connect Supabase before editing your profile.</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
        <p className="text-gray-600">Log in as a tutor to edit your public profile.</p>
      </div>
    )
  }

  if (user.type !== 'tutor') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tutors only</h1>
        <p className="text-gray-600">This page is only available to tutor accounts.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <AcademicCapIcon className="h-8 w-8 text-primary-600" />
          Edit My Tutor Profile
        </h1>
        <p className="text-gray-600 mt-1">
          This information is shown to students on the Book a Session page - make sure your subjects are accurate!
        </p>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading your profile...</p>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          {/* Subjects */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subjects you teach *</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {subjects.map((subject) => (
                <span
                  key={subject}
                  className="inline-flex items-center gap-1 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {subject}
                  <button onClick={() => removeSubject(subject)} aria-label={`Remove ${subject}`}>
                    <XMarkIcon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              {subjects.length === 0 && <span className="text-sm text-gray-400">No subjects added yet</span>}
            </div>
            <div className="flex gap-2 mb-2">
              <input
                value={subjectInput}
                onChange={(e) => setSubjectInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSubject(subjectInput)
                  }
                }}
                placeholder="Type a subject and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addSubject(subjectInput)}
                className="flex items-center gap-1 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium"
              >
                <PlusIcon className="h-4 w-4" /> Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_SUBJECTS.filter((s) => !subjects.includes(s)).map((s) => (
                <button
                  key={s}
                  onClick={() => addSubject(s)}
                  className="text-xs px-2 py-1 border border-gray-200 rounded-full text-gray-600 hover:border-primary-300 hover:text-primary-700"
                >
                  + {s}
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell students about your teaching style, experience and specialities..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Rate & experience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
                Hourly rate (£)
              </label>
              <input
                id="rate"
                type="number"
                min={0}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(e.target.value)}
                placeholder="e.g. 35"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                Years of experience
              </label>
              <input
                id="experience"
                type="number"
                min={0}
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                placeholder="e.g. 5"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Contact phone (optional)
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+44..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Qualifications</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {qualifications.map((q) => (
                <span
                  key={q}
                  className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {q}
                  <button onClick={() => removeQualification(q)} aria-label={`Remove ${q}`}>
                    <XMarkIcon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              {qualifications.length === 0 && <span className="text-sm text-gray-400">None added yet</span>}
            </div>
            <div className="flex gap-2">
              <input
                value={qualificationInput}
                onChange={(e) => setQualificationInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addQualification(qualificationInput)
                  }
                }}
                placeholder="e.g. QTS, PhD Physics"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => addQualification(qualificationInput)}
                className="flex items-center gap-1 px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium"
              >
                <PlusIcon className="h-4 w-4" /> Add
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </motion.div>
      )}
    </div>
  )
}
