'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  XMarkIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface CreateMeetingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  setupStatus?: any
}

export default function CreateMeetingModal({ isOpen, onClose, onSuccess, setupStatus }: CreateMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    startDate: '',
    startTime: '',
    duration: 60,
    attendeeEmails: ['']
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.startDate || !formData.startTime) {
      toast.error('Please fill in all required fields')
      return
    }

    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`)
    
    const meetingData = {
      title: formData.title,
      description: formData.description,
      subject: formData.subject,
      startTime: startDateTime.toISOString(),
      duration: formData.duration,
      attendeeEmails: formData.attendeeEmails.filter(email => email.trim() !== '')
    }
    
    try {
      const response = await fetch('/api/google-meet/create-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meetingData)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success('Video lesson scheduled successfully!')
        onSuccess()
        onClose()
      } else if (data.requiresAuth) {
        // Redirect to Google OAuth authorization
        window.location.href = data.authUrl
      } else {
        toast.error(data.error || 'Failed to schedule lesson')
      }
    } catch (error) {
      console.error('Error creating meeting:', error)
      toast.error('Failed to schedule lesson')
    }
  }

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.attendeeEmails]
    newEmails[index] = value
    setFormData({ ...formData, attendeeEmails: newEmails })
  }

  const addEmailField = () => {
    setFormData({
      ...formData,
      attendeeEmails: [...formData.attendeeEmails, '']
    })
  }

  const removeEmailField = (index: number) => {
    const newEmails = formData.attendeeEmails.filter((_, i) => i !== index)
    setFormData({ ...formData, attendeeEmails: newEmails })
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      subject: '',
      startDate: '',
      startTime: '',
      duration: 60,
      attendeeEmails: ['']
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
          onClick={handleClose}
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mr-4">
                <VideoCameraIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Schedule HD Video Lesson</h3>
                <p className="text-sm text-gray-500">Create a Google Meet session for tutoring</p>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={handleClose}
              aria-label="Close modal"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., GCSE Mathematics - Algebra Basics"
              />
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Geography">Geography</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of what will be covered in this lesson..."
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  required
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  id="startTime"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>

            {/* Attendee Emails */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Invite Attendees (Optional)
              </label>
              {formData.attendeeEmails.map((email, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="attendee@example.com"
                  />
                  {formData.attendeeEmails.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmailField(index)}
                      className="ml-2 px-3 py-2 text-red-600 hover:text-red-700 transition-colors"
                      title="Remove this email field"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addEmailField}
                className="text-blue-600 hover:text-blue-700 text-sm transition-colors"
              >
                + Add another attendee
              </button>
            </div>

            {/* Features Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What&apos;s included:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• HD 1080p video quality</li>
                <li>• Interactive whiteboard and screen sharing</li>
                <li>• Real-time chat during the session</li>
                <li>• Session recording (optional)</li>
                <li>• Mobile and desktop support</li>
              </ul>
            </div>

            {/* Setup Notice - Only show if not configured */}
            {setupStatus && !setupStatus.isConfigured && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xs">⚠️</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-yellow-900 mb-1">Setup Required</h4>
                    <p className="text-sm text-yellow-800">
                      Google Meet integration requires API configuration. Meeting will be scheduled but Google Meet link will be available once setup is complete.
                    </p>
                    <p className="text-xs text-yellow-700 mt-1">
                      See GOOGLE_MEET_SETUP.md for detailed instructions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Ready Notice - Show when configured */}
            {setupStatus && setupStatus.isConfigured && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✅</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium text-green-900 mb-1">Google Meet Ready</h4>
                    <p className="text-sm text-green-800">
                      Real Google Meet links will be created automatically for your lesson.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Lesson
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
