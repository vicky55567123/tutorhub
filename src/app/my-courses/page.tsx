'use client'

import { useAuth } from '@/components/AuthContext'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  BookOpenIcon,
  StarIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  CalendarIcon,
  AcademicCapIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Course {
  id: number
  title: string
  instructor: string
  progress: number
  totalLessons: number
  completedLessons: number
  duration: string
  nextLesson: string
  image: string
  status: 'active' | 'completed' | 'paused'
  enrolledDate: string
  lastAccessed: string
}

// Mock enrolled courses data - in real app, this would come from API
const enrolledCourses: Course[] = [
  {
    id: 1,
    title: 'GCSE Mathematics (Grades 4-9)',
    instructor: 'Farhana Kiran',
    progress: 0,
    totalLessons: 24,
    completedLessons: 0,
    duration: '20 weeks',
    nextLesson: 'Introduction to Algebra',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    status: 'active',
    enrolledDate: new Date().toLocaleDateString(),
    lastAccessed: 'Never'
  }
]

export default function MyCoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState<Course[]>(enrolledCourses)
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'all'>('all')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpenIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your courses.</p>
        </div>
      </div>
    )
  }

  const filteredCourses = courses.filter(course => {
    if (activeTab === 'all') return true
    return course.status === activeTab
  })

  const handleStartLesson = (courseId: number) => {
    toast.success('Starting lesson...', {
      icon: '🎓',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
    // In real app, navigate to lesson player
  }

  const handleViewCertificate = (courseId: number) => {
    toast.success('Certificate downloaded!', {
      icon: '🏆',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-600'
    if (progress >= 50) return 'bg-blue-600'
    if (progress >= 20) return 'bg-yellow-600'
    return 'bg-gray-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
              <p className="text-gray-600 mt-2">
                Continue your learning journey • {courses.length} course{courses.length !== 1 ? 's' : ''} enrolled
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Browse More Courses
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'active').length}
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
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
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
                <p className="text-sm text-gray-600">Total Hours</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((acc, course) => acc + (course.completedLessons * 1.5), 0).toFixed(1)}
                </p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-600" />
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
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'completed').length}
                </p>
              </div>
              <AcademicCapIcon className="h-8 w-8 text-yellow-600" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-2 shadow-sm mb-8"
        >
          <div className="flex space-x-2">
            {(['all', 'active', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                ({tab === 'all' ? courses.length : courses.filter(c => c.status === tab).length})
              </button>
            ))}
          </div>
        </motion.div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Course Image */}
                <div className="relative h-48">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                    </span>
                  </div>
                  {course.progress > 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white bg-opacity-90 rounded-lg p-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                            data-progress={course.progress}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <span>By {course.instructor}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <BookOpenIcon className="h-4 w-4 mr-2" />
                      <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-4">
                    <p><strong>Last accessed:</strong> {course.lastAccessed}</p>
                    {course.status === 'active' && (
                      <p><strong>Next lesson:</strong> {course.nextLesson}</p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  {course.status === 'active' && (
                    <button
                      onClick={() => handleStartLesson(course.id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                    </button>
                  )}

                  {course.status === 'completed' && (
                    <div className="space-y-2">
                      <button
                        onClick={() => handleStartLesson(course.id)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        Review Course
                      </button>
                      <button
                        onClick={() => handleViewCertificate(course.id)}
                        className="w-full flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                        View Certificate
                      </button>
                    </div>
                  )}

                  {course.status === 'paused' && (
                    <button
                      onClick={() => handleStartLesson(course.id)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      Resume Course
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-12 text-center shadow-sm"
          >
            <BookOpenIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'all' ? 'No courses enrolled yet' : `No ${activeTab} courses`}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all' 
                ? 'Start your learning journey by enrolling in your first course!'
                : `You don't have any ${activeTab} courses at the moment.`
              }
            </p>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Browse Courses
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
