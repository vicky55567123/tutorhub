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
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'
import { VideoCameraIcon as VideoCameraIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import CreateMeetingModal from '@/components/CreateMeetingModal'

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
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [setupStatus, setSetupStatus] = useState<any>(null)

  const checkSetupStatus = useCallback(async () => {
    try {
      const response = await fetch('/api/google-meet/setup-status')
      const data = await response.json()
      setSetupStatus(data)
    } catch (error) {
      console.error('Error checking setup status:', error)
    }
  }, [])

  const fetchMeetings = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/google-meet/meetings?userId=${user?.id}`)
      const data = await response.json()
      
      if (data.success) {
        setMeetings(data.meetings)
      } else {
        toast.error('Failed to load video lessons')
      }
    } catch (error) {
      console.error('Error fetching meetings:', error)
      toast.error('Failed to load video lessons')
    } finally {
      setIsLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    if (user) {
      checkSetupStatus()
      fetchMeetings()
    }
  }, [user, fetchMeetings, checkSetupStatus])

  const handleJoinMeeting = (meetingUrl: string, title: string) => {
    // Open Google Meet in a new tab
    window.open(meetingUrl, '_blank')
    toast.success(`Joining ${title}...`, {
      icon: '🎥',
      style: {
        borderRadius: '10px',
        background: '#10B981',
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
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
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
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Schedule Lesson
            </button>
          </div>
        </div>

        {/* Setup Status Alert */}
        {setupStatus && !setupStatus.isConfigured && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start">
              <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mt-0.5 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-amber-800 mb-1">
                  Google Meet Setup Required
                </h3>
                <p className="text-sm text-amber-700 mb-3">
                  To use HD Video Lessons, you need to configure Google Meet integration. 
                  This requires setting up Google Cloud Console credentials.
                </p>
                <div className="text-sm text-amber-700">
                  <p className="font-medium mb-1">Missing configuration:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {setupStatus.missingVars?.map((varName: string) => (
                      <li key={varName}>{varName}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3">
                  <a 
                    href="/GOOGLE_MEET_SETUP.md"
                    className="text-sm font-medium text-amber-800 hover:text-amber-900 underline"
                  >
                    View Setup Instructions →
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

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
            
            {/* Setup Notice - Only show if not configured */}
            {setupStatus && !setupStatus.isConfigured && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">ℹ️</span>
                    </div>
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="text-sm font-medium text-blue-800 mb-1">Google Meet Integration</h4>
                    <p className="text-sm text-blue-700">
                      Video lessons are powered by Google Meet. Real meeting links will be generated once Google Calendar API is configured.
                    </p>
                    <p className="text-xs text-blue-600 mt-2">
                      See GOOGLE_MEET_SETUP.md for setup instructions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ready Status - Show when configured */}
            {setupStatus && setupStatus.isConfigured && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-sm">✅</span>
                    </div>
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="text-sm font-medium text-green-800 mb-1">Google Meet Ready</h4>
                    <p className="text-sm text-green-700">
                      Google Meet integration is configured and ready. Schedule lessons to create real Google Meet links!
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={() => setIsCreateModalOpen(true)}
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

      {/* Create Meeting Modal */}
      <CreateMeetingModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchMeetings}
        setupStatus={setupStatus}
      />
    </div>
  )
}
