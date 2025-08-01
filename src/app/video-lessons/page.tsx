'use client'

import { useAuth } from '@/components/AuthContext'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  VideoCameraIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  PlayIcon,
  PlusIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { VideoCameraIcon as VideoCameraIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface Meeting {
  id: string
  title: string
  description: string
  startTime: string
  duration: number
  meetingUrl: string
  instructor?: string
  student?: string
  subject: string
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress'
  createdAt: string
}

export default function VideoLessonsPage() {
  const { user } = useAuth()
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  useEffect(() => {
    if (user) {
      // Demo video lessons data
      const demoVideoLessons: Meeting[] = [
        {
          id: '1',
          title: 'Advanced Calculus: Derivatives and Applications',
          description: 'Master derivative techniques and their real-world applications in this comprehensive lesson.',
          startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
          duration: 60,
          meetingUrl: 'https://meet.google.com/demo-calculus-lesson',
          instructor: 'Dr. Sarah Wilson',
          subject: 'Mathematics',
          status: 'scheduled' as const,
          createdAt: new Date().toISOString()
        },
        {
          id: '2', 
          title: 'Organic Chemistry: Reaction Mechanisms',
          description: 'Deep dive into organic reaction mechanisms and synthesis strategies.',
          startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // In 3 days
          duration: 90,
          meetingUrl: 'https://meet.google.com/demo-chemistry-lesson',
          instructor: 'Prof. James Chen',
          subject: 'Chemistry',
          status: 'scheduled' as const,
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Physics: Quantum Mechanics Fundamentals',
          description: 'Introduction to quantum mechanics principles and wave-particle duality.',
          startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // In 5 days
          duration: 75,
          meetingUrl: 'https://meet.google.com/demo-physics-lesson',
          instructor: 'Dr. Maria Rodriguez',
          subject: 'Physics',
          status: 'scheduled' as const,
          createdAt: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Python Programming: Data Structures',
          description: 'Master lists, dictionaries, sets, and tuples in Python programming.',
          startTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
          duration: 60,
          meetingUrl: 'https://meet.google.com/demo-python-lesson',
          instructor: 'Alex Thompson',
          subject: 'Computer Science',
          status: 'completed' as const,
          createdAt: new Date().toISOString()
        },
        {
          id: '5',
          title: 'Biology: Cell Division and Mitosis',
          description: 'Comprehensive study of cell division processes and their importance.',
          startTime: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
          duration: 45,
          meetingUrl: 'https://meet.google.com/demo-biology-lesson',
          instructor: 'Dr. Emily Watson',
          subject: 'Biology',
          status: 'completed' as const,
          createdAt: new Date().toISOString()
        }
      ]

      // Always load demo content for now
      setIsLoading(true)
      // Simulate loading actual video lessons
      setTimeout(() => {
        setMeetings(demoVideoLessons)
        setIsLoading(false)
      }, 1000)
    }
  }, [user])

  const handleJoinMeeting = (meetingUrl: string, title: string) => {
    // Show demo message for now
    toast.success(`This is a demo lesson: ${title}`, {
      icon: '🎥',
      duration: 4000,
      style: {
        borderRadius: '10px',
        background: '#3B82F6',
        color: '#fff',
      }
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <CalendarIcon className="h-5 w-5 text-blue-600" />
      case 'in-progress':
        return <VideoCameraIconSolid className="h-5 w-5 text-green-600" />
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
      case 'cancelled':
        return <div className="h-5 w-5 text-red-600 flex items-center justify-center">✕</div>
      default:
        return <CalendarIcon className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'in-progress':
        return 'bg-green-100 text-green-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredMeetings = meetings.filter(meeting => {
    const now = new Date()
    const meetingTime = new Date(meeting.startTime)
    
    switch (activeTab) {
      case 'upcoming':
        return meetingTime > now && meeting.status === 'scheduled'
      case 'past':
        return meetingTime < now || meeting.status === 'completed'
      case 'all':
      default:
        return true
    }
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <VideoCameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600">Please sign in to access your video lessons.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">HD Video Lessons</h1>
              <p className="text-gray-600">
                Crystal clear video calls with screen sharing, whiteboard, and recording capabilities
              </p>
            </div>
            <button
              onClick={() => toast.success('This is a demo platform. Schedule real lessons after signing up!', { icon: '📚', duration: 4000 })}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Lesson
            </button>
          </div>
        </div>



        {/* Features Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <VideoCameraIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">HD 1080p Quality</div>
                <div className="text-sm text-gray-600">Crystal clear video</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <BookOpenIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Interactive Whiteboard</div>
                <div className="text-sm text-gray-600">Real-time collaboration</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg mr-3">
                <PlayIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Screen Sharing</div>
                <div className="text-sm text-gray-600">Share presentations</div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-red-100 p-2 rounded-lg mr-3">
                <CheckCircleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Session Recording</div>
                <div className="text-sm text-gray-600">Review anytime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'upcoming', label: 'Upcoming', count: meetings.filter(m => new Date(m.startTime) > new Date() && m.status === 'scheduled').length },
              { id: 'past', label: 'Past Sessions', count: meetings.filter(m => new Date(m.startTime) < new Date() || m.status === 'completed').length },
              { id: 'all', label: 'All Sessions', count: meetings.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Meetings List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="text-center py-12">
            <VideoCameraIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab === 'upcoming' ? 'No upcoming lessons' : 
               activeTab === 'past' ? 'No past sessions' : 
               'No video lessons yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming' ? 'Schedule your first HD video lesson with a tutor.' :
               activeTab === 'past' ? 'Your completed sessions will appear here.' :
               'Start by scheduling a video lesson with one of our expert tutors.'}
            </p>

            
            <button
              onClick={() => toast.success('This is a demo platform. Schedule real lessons after signing up!', { icon: '📚', duration: 4000 })}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Your First Lesson
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <motion.div
                key={meeting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <VideoCameraIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{meeting.title}</h3>
                      <p className="text-gray-600 mb-2">{meeting.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {formatDate(meeting.startTime)}
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {formatDuration(meeting.duration)}
                        </div>
                        {meeting.instructor && (
                          <div className="flex items-center">
                            <UserIcon className="h-4 w-4 mr-1" />
                            {meeting.instructor}
                          </div>
                        )}
                        <div className="flex items-center">
                          <BookOpenIcon className="h-4 w-4 mr-1" />
                          {meeting.subject}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      {getStatusIcon(meeting.status)}
                      <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(meeting.status)}`}>
                        {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                      </span>
                    </div>
                    
                    {meeting.status === 'scheduled' && new Date(meeting.startTime) > new Date() && (
                      <button
                        onClick={() => handleJoinMeeting(meeting.meetingUrl, meeting.title)}
                        className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <VideoCameraIcon className="h-4 w-4 mr-2" />
                        Join Lesson
                      </button>
                    )}
                    
                    {meeting.status === 'completed' && (
                      <button
                        onClick={() => toast('Recording feature coming soon!', { icon: 'ℹ️' })}
                        className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <PlayIcon className="h-4 w-4 mr-2" />
                        View Recording
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
