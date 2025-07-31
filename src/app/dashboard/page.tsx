'use client'

import { useAuth } from '@/components/AuthContext'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon,
  BookOpenIcon,
  StarIcon,
  ClockIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CalendarIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

export default function DashboardPage() {
  const { user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<number[]>([])

  useEffect(() => {
    if (user) {
      // Get enrolled courses from localStorage
      const enrolled = JSON.parse(localStorage.getItem(`enrolledCourses_${user.email}`) || '[]')
      setEnrolledCourses(enrolled)
    }
  }, [user])

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
              <p className="text-sm font-bold text-gray-900">None scheduled</p>
              <p className="text-xs text-gray-400 mt-1">Book your first session</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

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
              <p className="text-sm font-bold text-gray-900">None scheduled</p>
              <p className="text-xs text-gray-400 mt-1">Create your availability</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl p-6 shadow-sm mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Teaching Schedule</h2>
        <div className="text-center py-12">
          <CalendarIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled</h3>
          <p className="text-gray-500 mb-6">
            Set up your availability and start accepting students!
          </p>
          <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <AcademicCapIcon className="h-5 w-5 mr-2" />
            Set Availability
          </button>
        </div>
      </motion.div>
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
