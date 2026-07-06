'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import {
  CalendarIcon,
  ClockIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { useAuth } from '@/components/AuthContext'
import { isSupabaseConfigured, dbOperations, UserProfile, TutorAvailability } from '@/lib/supabase'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const SLOT_STEP_MINUTES = 30
const DAYS_AHEAD = 14

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function toDateKey(date: Date) {
  return date.toISOString().split('T')[0]
}

function timeStringToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** Builds bookable start-time slots for a given calendar day from the tutor's
 *  recurring/one-off availability windows, excluding already-booked ranges. */
function computeSlotsForDay(
  day: Date,
  availability: TutorAvailability[],
  busySlots: { start_time: string; end_time: string }[],
  durationMinutes: number
): Date[] {
  const dayKey = toDateKey(day)
  const dow = day.getDay()

  const windows = availability.filter(
    (a) => (a.is_recurring && a.day_of_week === dow) || (!a.is_recurring && a.specific_date === dayKey)
  )

  const slots: Date[] = []
  const now = new Date()

  for (const window of windows) {
    const startMin = timeStringToMinutes(window.start_time)
    const endMin = timeStringToMinutes(window.end_time)

    for (let m = startMin; m + durationMinutes <= endMin; m += SLOT_STEP_MINUTES) {
      const slotStart = new Date(day)
      slotStart.setHours(0, 0, 0, 0)
      slotStart.setMinutes(m)
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60000)

      if (slotStart <= now) continue

      const overlaps = busySlots.some((b) => {
        const bStart = new Date(b.start_time)
        const bEnd = new Date(b.end_time)
        return slotStart < bEnd && slotEnd > bStart
      })

      if (!overlaps) slots.push(slotStart)
    }
  }

  return slots
}

export default function BookSessionPage() {
  const { user, getAccessToken } = useAuth()

  const [tutors, setTutors] = useState<UserProfile[]>([])
  const [loadingTutors, setLoadingTutors] = useState(true)
  const [search, setSearch] = useState('')

  const [selectedTutor, setSelectedTutor] = useState<UserProfile | null>(null)
  const [availability, setAvailability] = useState<TutorAvailability[]>([])
  const [busySlots, setBusySlots] = useState<{ start_time: string; end_time: string }[]>([])
  const [loadingAvailability, setLoadingAvailability] = useState(false)

  const [selectedDay, setSelectedDay] = useState<Date>(() => new Date())
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null)
  const [duration, setDuration] = useState(60)
  const [subject, setSubject] = useState('')
  const [customSubject, setCustomSubject] = useState('')
  const [topic, setTopic] = useState('')
  const [description, setDescription] = useState('')
  const [isBooking, setIsBooking] = useState(false)

  const days = useMemo(() => Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(new Date(), i)), [])

  useEffect(() => {
    async function loadTutors() {
      setLoadingTutors(true)
      try {
        const res = await fetch('/api/tutors')
        const data = await res.json()
        if (data.success) setTutors(data.tutors)
        else if (!isSupabaseConfigured) {
          toast.error('Backend not configured yet - see BACKEND_SETUP.md')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingTutors(false)
      }
    }
    loadTutors()
  }, [])

  useEffect(() => {
    if (!selectedTutor) return

    async function loadAvailability() {
      setLoadingAvailability(true)
      setSelectedSlot(null)
      setSubject('')
      setCustomSubject('')
      setTopic('')
      try {
        const res = await fetch(`/api/availability?tutorId=${selectedTutor!.id}`)
        const data = await res.json()
        setAvailability(data.success ? data.availability : [])

        const from = new Date()
        const to = addDays(from, DAYS_AHEAD)
        const busy = await dbOperations.getTutorBusySlots(selectedTutor!.id, from.toISOString(), to.toISOString())
        setBusySlots(busy)
      } catch (error) {
        console.error(error)
        toast.error('Failed to load tutor availability')
      } finally {
        setLoadingAvailability(false)
      }
    }
    loadAvailability()
  }, [selectedTutor])

  const slotsForSelectedDay = useMemo(() => {
    if (!selectedTutor) return []
    return computeSlotsForDay(selectedDay, availability, busySlots, duration)
  }, [selectedTutor, selectedDay, availability, busySlots, duration])

  const handleBook = async () => {
    if (!user) {
      toast.error('Please log in as a student to book a session')
      return
    }
    if (!selectedTutor || !selectedSlot) {
      toast.error('Please choose a tutor, day and time slot')
      return
    }

    const finalSubject = (subject === '__other__' ? customSubject : subject).trim()
    if (!finalSubject) {
      toast.error('Please select the subject you want to study')
      return
    }
    if (!topic.trim()) {
      toast.error('Please tell the tutor which topic you want to focus on')
      return
    }

    const sessionTitle = `${finalSubject} - ${topic.trim()}`

    setIsBooking(true)
    try {
      const token = await getAccessToken()
      if (!token) {
        toast.error('Your session has expired. Please log in again.')
        setIsBooking(false)
        return
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tutorId: selectedTutor.id,
          title: sessionTitle,
          subject: finalSubject,
          description: [`Topic: ${topic.trim()}`, description.trim()].filter(Boolean).join('\n\n'),
          startTime: selectedSlot.toISOString(),
          durationMinutes: duration,
          tutorEmail: selectedTutor.email,
          studentEmail: user.email,
        }),
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Session booked! Check your email for the Google Meet invite.')
        setSelectedSlot(null)
        setSubject('')
        setCustomSubject('')
        setTopic('')
        setDescription('')
        // Refresh busy slots so the just-booked slot disappears
        const from = new Date()
        const to = addDays(from, DAYS_AHEAD)
        const busy = await dbOperations.getTutorBusySlots(selectedTutor.id, from.toISOString(), to.toISOString())
        setBusySlots(busy)
      } else if (data.requiresAuth || data.requiresSetup) {
        toast.error(data.error || 'Google Meet is not set up yet on the server.')
      } else {
        toast.error(data.error || 'Failed to book session')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to book session')
    } finally {
      setIsBooking(false)
    }
  }

  const filteredTutors = tutors.filter((t) => {
    const q = search.toLowerCase()
    if (!q) return true
    return (
      t.full_name?.toLowerCase().includes(q) ||
      t.bio?.toLowerCase().includes(q) ||
      (t.subjects || []).some((s) => s.toLowerCase().includes(q))
    )
  })

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking is not set up yet</h1>
        <p className="text-gray-600">
          Configure Supabase environment variables and run the schema in{' '}
          <code className="bg-gray-100 px-1 rounded">database/schema.sql</code> to enable real student &amp; tutor
          accounts, availability, and booking. See <code className="bg-gray-100 px-1 rounded">BACKEND_SETUP.md</code>{' '}
          for step-by-step instructions.
        </p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
        <p className="text-gray-600">Log in as a student from the navigation bar to book a tutoring session.</p>
      </div>
    )
  }

  if (user.type === 'tutor') {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <UserCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">This page is for students</h1>
        <p className="text-gray-600 mb-6">
          Tutor accounts can&apos;t book sessions with other tutors. Manage your own schedule and profile instead:
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="/tutor/availability" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium">
            My Availability
          </a>
          <a href="/tutor/profile" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
            Edit My Profile
          </a>
          <a href="/dashboard" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
            Dashboard
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="h-8 w-8 text-primary-600" />
          Book a Tutoring Session
        </h1>
        <p className="text-gray-600 mt-1">Pick a tutor, choose an available time slot, and we&apos;ll set up a Google Meet automatically.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tutor list */}
        <div className="lg:col-span-1">
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutors or subjects"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {loadingTutors ? (
            <p className="text-gray-500">Loading tutors...</p>
          ) : filteredTutors.length === 0 ? (
            <p className="text-gray-500">No tutors found yet. Ask a tutor to sign up!</p>
          ) : (
            <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
              {filteredTutors.map((tutor) => (
                <button
                  key={tutor.id}
                  onClick={() => setSelectedTutor(tutor)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedTutor?.id === tutor.id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                      {tutor.full_name?.charAt(0) || '?'}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{tutor.full_name}</p>
                      <p className="text-xs text-gray-500 truncate">
                        {(tutor.subjects || []).join(', ') || 'General tutoring'}
                      </p>
                    </div>
                  </div>
                  {tutor.hourly_rate ? (
                    <p className="text-sm text-gray-700 mt-2">£{tutor.hourly_rate}/hour</p>
                  ) : null}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Calendar + slots */}
        <div className="lg:col-span-2">
          {!selectedTutor ? (
            <div className="h-full flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-200 rounded-xl p-12">
              Select a tutor to see their availability
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Availability for {selectedTutor.full_name}
                </h2>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  aria-label="Session duration"
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value={30}>30 minutes</option>
                  <option value={60}>60 minutes</option>
                  <option value={90}>90 minutes</option>
                </select>
              </div>

              {/* Day picker */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-4">
                {days.map((day) => {
                  const isSelected = toDateKey(day) === toDateKey(selectedDay)
                  return (
                    <button
                      key={toDateKey(day)}
                      onClick={() => setSelectedDay(day)}
                      className={`flex-shrink-0 w-16 py-2 rounded-lg text-center border ${
                        isSelected ? 'bg-primary-600 text-white border-primary-600' : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="text-xs">{DAY_NAMES[day.getDay()].slice(0, 3)}</div>
                      <div className="font-semibold">{day.getDate()}</div>
                    </button>
                  )
                })}
              </div>

              {/* Time slots */}
              {loadingAvailability ? (
                <p className="text-gray-500">Loading availability...</p>
              ) : slotsForSelectedDay.length === 0 ? (
                <p className="text-gray-500 flex items-center gap-2">
                  <ClockIcon className="h-5 w-5" /> No open slots on this day. Try another date.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                  {slotsForSelectedDay.map((slot) => {
                    const isSelected = selectedSlot?.getTime() === slot.getTime()
                    return (
                      <button
                        key={slot.toISOString()}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 rounded-lg border text-sm font-medium ${
                          isSelected
                            ? 'bg-primary-600 text-white border-primary-600'
                            : 'border-gray-200 hover:border-primary-300 text-gray-700'
                        }`}
                      >
                        {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </button>
                    )
                  })}
                </div>
              )}

              {selectedSlot && (
                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <div>
                    <label htmlFor="booking-subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    {(selectedTutor.subjects || []).length > 0 ? (
                      <>
                        <select
                          id="booking-subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          <option value="">Select a subject...</option>
                          {(selectedTutor.subjects || []).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                          <option value="__other__">Other...</option>
                        </select>
                        {subject === '__other__' && (
                          <input
                            value={customSubject}
                            onChange={(e) => setCustomSubject(e.target.value)}
                            placeholder="Enter the subject"
                            className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg"
                          />
                        )}
                      </>
                    ) : (
                      <input
                        id="booking-subject"
                        value={customSubject}
                        onChange={(e) => {
                          setCustomSubject(e.target.value)
                          setSubject('__other__')
                        }}
                        placeholder="e.g. Mathematics, Physics"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <label htmlFor="booking-topic" className="block text-sm font-medium text-gray-700 mb-1">
                      Topic *
                    </label>
                    <input
                      id="booking-topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="What topic do you want to focus on? e.g. Quadratic equations"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label htmlFor="booking-notes" className="block text-sm font-medium text-gray-700 mb-1">
                      Additional notes (optional)
                    </label>
                    <textarea
                      id="booking-notes"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Anything else the tutor should know before the session"
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handleBook}
                    disabled={isBooking}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {isBooking ? (
                      'Booking...'
                    ) : (
                      <>
                        <VideoCameraIcon className="h-5 w-5" />
                        Confirm &amp; Create Google Meet
                      </>
                    )}
                  </button>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    {selectedSlot.toLocaleString([], { dateStyle: 'full', timeStyle: 'short' })} · {duration} min
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
