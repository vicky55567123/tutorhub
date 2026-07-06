'use client'

import { useAuth } from '@/components/AuthContext'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  UserCircleIcon,
  BookOpenIcon,
  StarIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CalendarIcon,
  TrophyIcon,
  VideoCameraIcon,
  XCircleIcon
} from '@heroicons/react/24/outline'
import { Booking, isSupabaseConfigured, dbOperations } from '@/lib/supabase'

export default function DashboardPage() {
  const { user, getAccessToken } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loadingBookings, setLoadingBookings] = useState(true)
  const [hourlyRate, setHourlyRate] = useState<number | null | undefined>(undefined)

  useEffect(() => {
    if (user) {
      // Get enrolled courses from localStorage
      const enrolled = JSON.parse(localStorage.getItem(`enrolledCourses_${user.email}`) || '[]')
      setEnrolledCourses(enrolled)
    }
  }, [user])

  useEffect(() => {
    if (!user || user.type !== 'tutor' || !isSupabaseConfigured) return
    dbOperations
      .getProfile(user.id)
      .then((profile) => setHourlyRate(profile?.hourly_rate ?? null))
      .catch(() => setHourlyRate(null))
  }, [user])

  const loadBookings = useCallback(async () => {
    if (!user || !isSupabaseConfigured) {
      setLoadingBookings(false)
      return
    }
    setLoadingBookings(true)
    try {
      const token = await getAccessToken()
      if (!token) {
        setLoadingBookings(false)
        return
      }
      const res = await fetch('/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (data.success) setBookings(data.bookings)
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoadingBookings(false)
    }
  }, [user, getAccessToken])

  useEffect(() => {
    loadBookings()
  }, [loadBookings])

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const token = await getAccessToken()
      if (!token) return
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookingId, status: 'cancelled' }),
      })
      const data = await res.json()
      if (data.success) {
        toast.success('Session cancelled')
        setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b)))
      } else {
        toast.error(data.error || 'Failed to cancel session')
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to cancel session')
    }
  }

  const upcomingBookings = bookings
    .filter((b) => b.status !== 'cancelled' && b.status !== 'completed' && new Date(b.start_time) > new Date())
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())

  const nextBooking = upcomingBookings[0]

  const UpcomingSessions = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-sm mb-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Sessions</h2>
        {user?.type === 'student' ? (
          <Link href="/book-session" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            + Book a session
          </Link>
        ) : (
          <Link href="/tutor/availability" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Manage availability
          </Link>
        )}
      </div>

      {loadingBookings ? (
        <p className="text-gray-500 text-center py-8">Loading your sessions...</p>
      ) : upcomingBookings.length === 0 ? (
        <div className="text-center py-12">
          <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled</h3>
          <p className="text-gray-500 mb-6">
            {user?.type === 'student'
              ? 'Book a session with one of our tutors to get started!'
              : 'Set your availability so students can book sessions with you.'}
          </p>
          <Link
            href={user?.type === 'student' ? '/book-session' : '/tutor/availability'}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            {user?.type === 'student' ? 'Book a Session' : 'Set Availability'}
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingBookings.map((booking) => {
            const other = user?.type === 'student' ? booking.tutor : booking.student
            return (
              <div
                key={booking.id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-50 rounded-lg p-4"
              >
                <div>
                  <p className="font-medium text-gray-900">{booking.title}</p>
                  <p className="text-sm text-gray-500">
                    with {other?.full_name || 'Unknown'} ·{' '}
                    {new Date(booking.start_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {booking.meeting_url && (
                    <a
                      href={booking.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg"
                    >
                      <VideoCameraIcon className="h-4 w-4" /> Join Meeting
                    </a>
                  )}
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 text-sm font-medium rounded-lg"
                  >
                    <XCircleIcon className="h-4 w-4" /> Cancel
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your dashboard.</p>
        </div>
      </div>
    )
  }

  const StudentDashboard = () => (
    <>
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-600 to-purple-600 rounded-2xl p-6 text-white mb-8"
      >
        <div className="flex items-center space-x-4">
          {user.avatar ? (
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={user.avatar}
                alt={user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <UserCircleIcon className="h-16 w-16 text-white" />
          )}
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}! 🎓</h1>
            <p className="text-primary-100">Ready to continue your learning journey?</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Courses Enrolled</p>
              <p className="text-2xl font-bold text-gray-900">{enrolledCourses.length}</p>
              <p className="text-xs text-gray-400 mt-1">
                {enrolledCourses.length === 0 ? 'Start learning today!' : `${enrolledCourses.length} active course${enrolledCourses.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <BookOpenIcon className="h-8 w-8 text-primary-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-400 mt-1">Your journey begins here</p>
            </div>
            <ClockIcon className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Certificates</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-400 mt-1">Complete courses to earn</p>
            </div>
            <TrophyIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Session</p>
              <p className="text-sm font-bold text-gray-900">
                {nextBooking
                  ? new Date(nextBooking.start_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                  : 'None scheduled'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {nextBooking ? `with ${nextBooking.tutor?.full_name || 'your tutor'}` : 'Book your first session'}
              </p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      <UpcomingSessions />

      {/* Current Courses */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            <div className="text-center py-8">
              <BookOpenIcon className="h-12 w-12 text-primary-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {enrolledCourses.length} Course{enrolledCourses.length !== 1 ? 's' : ''} Enrolled
              </h3>
              <p className="text-gray-500 mb-4">
                Continue your learning journey where you left off
              </p>
              <button 
                onClick={() => window.location.href = '/my-courses'}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <AcademicCapIcon className="h-5 w-5 mr-2" />
                View My Courses
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
            <p className="text-gray-500 mb-6">
              Browse our course catalog and start your learning journey today!
            </p>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <AcademicCapIcon className="h-5 w-5 mr-2" />
              Browse Courses
            </button>
          </div>
        )}
      </motion.div>
    </>
  )

  const TutorDashboard = () => (
    <>
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-8"
      >
        <div className="flex items-center space-x-4">
          {user.avatar ? (
            <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={user.avatar}
                alt={user.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
          ) : (
            <UserCircleIcon className="h-16 w-16 text-white" />
          )}
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {user.name}! 👨‍🏫</h1>
            <p className="text-green-100">Ready to inspire your students today?</p>
          </div>
        </div>
      </motion.div>

      {(hourlyRate === null || hourlyRate === 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        >
          <p className="text-sm text-amber-800">
            <strong>Set your hourly rate</strong> so students can book (and pay for) paid sessions with you. Free
            trial sessions still work without one.
          </p>
          <Link
            href="/tutor/profile"
            className="inline-flex shrink-0 items-center justify-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg px-4 py-2"
          >
            Set hourly rate
          </Link>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-400 mt-1">Start teaching today!</p>
            </div>
            <UserCircleIcon className="h-8 w-8 text-primary-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Hours Taught</p>
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-xs text-gray-400 mt-1">Your teaching journey begins</p>
            </div>
            <ClockIcon className="h-8 w-8 text-green-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
              <p className="text-xs text-gray-400 mt-1">No reviews yet</p>
            </div>
            <StarIcon className="h-8 w-8 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Next Session</p>
              <p className="text-sm font-bold text-gray-900">
                {nextBooking
                  ? new Date(nextBooking.start_time).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                  : 'None scheduled'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {nextBooking ? `with ${nextBooking.student?.full_name || 'your student'}` : 'Create your availability'}
              </p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      <UpcomingSessions />
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {user.type === 'tutor' ? <TutorDashboard /> : <StudentDashboard />}
      </div>
    </div>
  )
}
