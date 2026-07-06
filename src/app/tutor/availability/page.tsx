'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { PlusIcon, TrashIcon, ClockIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@/components/AuthContext'
import { isSupabaseConfigured, TutorAvailability } from '@/lib/supabase'

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function TutorAvailabilityPage() {
  const { user, getAccessToken } = useAuth()
  const [slots, setSlots] = useState<TutorAvailability[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [dayOfWeek, setDayOfWeek] = useState(1)
  const [startTime, setStartTime] = useState('16:00')
  const [endTime, setEndTime] = useState('19:00')

  const loadSlots = async () => {
    if (!user) return
    setIsLoading(true)
    try {
      const res = await fetch(`/api/availability?tutorId=${user.id}`)
      const data = await res.json()
      if (data.success) setSlots(data.availability)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadSlots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleAddSlot = async () => {
    if (startTime >= endTime) {
      toast.error('End time must be after start time')
      return
    }
    setIsSaving(true)
    try {
      const token = await getAccessToken()
      if (!token) {
        toast.error('Please log in again')
        return
      }
      const res = await fetch('/api/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ dayOfWeek, startTime, endTime, isRecurring: true }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Availability added')
        setSlots((prev) => [...prev, data.slot])
      } else {
        toast.error(data.error || 'Failed to add availability')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to add availability')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteSlot = async (id: string) => {
    try {
      const token = await getAccessToken()
      if (!token) return
      const res = await fetch(`/api/availability?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) {
        setSlots((prev) => prev.filter((s) => s.id !== id))
        toast.success('Slot removed')
      } else {
        toast.error(data.error || 'Failed to remove slot')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to remove slot')
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Backend not configured</h1>
        <p className="text-gray-600">
          See <code className="bg-gray-100 px-1 rounded">BACKEND_SETUP.md</code> to connect Supabase before managing
          availability.
        </p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Please log in</h1>
        <p className="text-gray-600">Log in as a tutor to manage your weekly availability.</p>
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

  const slotsByDay = DAY_NAMES.map((_, dow) => slots.filter((s) => s.is_recurring && s.day_of_week === dow))

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <CalendarDaysIcon className="h-8 w-8 text-primary-600" />
          My Availability
        </h1>
        <p className="text-gray-600 mt-1">
          Set the weekly hours you&apos;re free to teach. Students will only be able to book slots inside these windows.
        </p>
      </div>

      {/* Add new slot */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-4">Add a weekly time window</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <select
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(Number(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2"
            aria-label="Day of week"
          >
            {DAY_NAMES.map((d, i) => (
              <option key={d} value={i}>
                {d}
              </option>
            ))}
          </select>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
            aria-label="Start time"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
            aria-label="End time"
          />
          <button
            onClick={handleAddSlot}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-medium rounded-lg px-4 py-2"
          >
            <PlusIcon className="h-5 w-5" /> Add
          </button>
        </div>
      </motion.div>

      {/* Existing slots grouped by day */}
      {isLoading ? (
        <p className="text-gray-500">Loading your availability...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DAY_NAMES.map((day, dow) => (
            <div key={day} className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-3">{day}</h3>
              {slotsByDay[dow].length === 0 ? (
                <p className="text-sm text-gray-400">No availability set</p>
              ) : (
                <ul className="space-y-2">
                  {slotsByDay[dow].map((slot) => (
                    <li
                      key={slot.id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700"
                    >
                      <span className="flex items-center gap-2">
                        <ClockIcon className="h-4 w-4 text-primary-600" />
                        {slot.start_time.slice(0, 5)} - {slot.end_time.slice(0, 5)}
                      </span>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        aria-label="Remove slot"
                        className="text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
