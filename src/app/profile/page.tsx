'use client'

import { useAuth } from '@/components/AuthContext'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  UserCircleIcon, 
  PencilIcon, 
  AcademicCapIcon,
  BookOpenIcon,
  StarIcon,
  MapPinIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.type === 'tutor' 
      ? 'Experienced tutor passionate about helping students achieve their goals.' 
      : 'Eager learner looking to expand knowledge and skills.',
    location: 'Location not specified',
    phone: 'Phone not provided',
    joinDate: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <UserCircleIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your profile.</p>
        </div>
      </div>
    )
  }

  const handleSave = () => {
    setIsEditing(false)
    toast.success('Profile updated successfully!', {
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset to original data
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.type === 'tutor' 
        ? 'Experienced tutor passionate about helping students achieve their goals.' 
        : 'Eager learner looking to expand knowledge and skills.',
      location: 'Location not specified',
      phone: 'Phone not provided',
      joinDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8"
        >
          <div className="h-32 bg-gradient-to-r from-primary-600 to-purple-600"></div>
          <div className="px-6 pb-6">
            <div className="flex items-end -mt-16 mb-4">
              <div className="relative">
                {user.avatar ? (
                  <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                      unoptimized
                      onError={(e) => {
                        console.log('Avatar failed to load:', user.avatar)
                        // Hide the image and show fallback
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                    <UserCircleIcon className="h-16 w-16 text-gray-400" />
                  </div>
                )}
                <button 
                  className="absolute bottom-0 right-0 h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors"
                  title="Change profile picture"
                  aria-label="Change profile picture"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              <div className="ml-4 pb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {user.type === 'tutor' ? '👨‍🏫 Tutor' : '🎓 Student'}
                  </span>
                  {user.type === 'tutor' && (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 ml-1">New tutor - No reviews yet</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="ml-auto pb-2">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{profileData.bio}</p>
              )}
            </motion.div>

            {/* Stats Section */}
            {user.type === 'tutor' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Teaching Stats</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">0</div>
                    <div className="text-sm text-gray-500">Students Taught</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">-</div>
                    <div className="text-sm text-gray-500">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">0</div>
                    <div className="text-sm text-gray-500">Lessons Given</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">0</div>
                    <div className="text-sm text-gray-500">Subjects</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">Start teaching to build your statistics!</p>
                </div>
              </motion.div>
            )}

            {/* Recent Activity */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="text-center py-8">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
                <p className="text-gray-500">
                  {user.type === 'tutor' 
                    ? 'Start teaching to see your activity here!' 
                    : 'Start learning to see your activity here!'
                  }
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Email</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Phone</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        className="text-sm text-gray-600 border-b border-gray-300 focus:border-primary-500 outline-none"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <div className="text-sm text-gray-600">{profileData.phone}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Location</div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        className="text-sm text-gray-600 border-b border-gray-300 focus:border-primary-500 outline-none"
                        placeholder="Enter location"
                      />
                    ) : (
                      <div className="text-sm text-gray-600">{profileData.location}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Joined</div>
                    <div className="text-sm text-gray-600">{profileData.joinDate}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-sm p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <BookOpenIcon className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-gray-900">
                    {user.type === 'tutor' ? 'Manage Courses' : 'My Courses'}
                  </span>
                </button>
                {user.type === 'tutor' && (
                  <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                    <AcademicCapIcon className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Create New Course</span>
                  </button>
                )}
                <button className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-900">
                    {user.type === 'tutor' ? 'Reviews & Ratings' : 'Rate Tutors'}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
