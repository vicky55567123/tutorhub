'use client'

import { useAuth } from '@/components/AuthContext'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  GlobeAltIcon,
  EyeIcon,
  EyeSlashIcon,
  DevicePhoneMobileIcon,
  KeyIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface NotificationSettings {
  emailDigest: boolean
  courseUpdates: boolean
  messageNotifications: boolean
  marketingEmails: boolean
  pushNotifications: boolean
  smsNotifications: boolean
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'students-only'
  showOnlineStatus: boolean
  allowDirectMessages: boolean
  shareProgressData: boolean
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [showPassword, setShowPassword] = useState(false)
  
  // Settings state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailDigest: true,
    courseUpdates: true,
    messageNotifications: true,
    marketingEmails: false,
    pushNotifications: true,
    smsNotifications: false
  })

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectMessages: true,
    shareProgressData: false
  })

  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    bio: '',
    location: '',
    timezone: 'GMT+0',
    language: 'English'
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CogIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to access settings.</p>
        </div>
      </div>
    )
  }

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!', {
      icon: '✅',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const handleChangePassword = () => {
    toast.success('Password change email sent!', {
      icon: '🔑',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. Please check your email.', {
        icon: '⚠️',
        style: {
          borderRadius: '10px',
          background: '#EF4444',
          color: '#fff',
        }
      })
    }
  }

  const updateNotificationSetting = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
    toast.success('Notification preferences updated!', {
      icon: '🔔',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const updatePrivacySetting = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }))
    toast.success('Privacy settings updated!', {
      icon: '🔒',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'account', name: 'Account', icon: KeyIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CogIcon className="h-8 w-8 text-gray-600 mr-3" />
            Settings
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your account preferences and privacy settings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-sm p-4">
              <nav className="space-y-2">
                {tabs.map(tab => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-xl shadow-sm">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="flex items-center mb-8">
                    <div className="relative">
                      <Image
                        src={(user as any).image || '/default-avatar.png'}
                        alt="Profile"
                        width={80}
                        height={80}
                        className="rounded-full"
                        unoptimized
                      />
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Change Picture
                      </button>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={profileData.firstName}
                        onChange={e => setProfileData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        title="First Name"
                        placeholder="Enter your first name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={profileData.lastName}
                        onChange={e => setProfileData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        title="Last Name"
                        placeholder="Enter your last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={e => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        title="Email"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={e => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={e => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="London, UK"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language
                      </label>
                      <select
                        value={profileData.language}
                        onChange={e => setProfileData(prev => ({ ...prev, language: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        title="Language Preference"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={e => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={handleSaveProfile}
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      <CheckCircleIcon className="h-5 w-5 mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'emailDigest', label: 'Daily Digest', desc: 'Get a daily summary of your activity' },
                          { key: 'courseUpdates', label: 'Course Updates', desc: 'New lessons and course announcements' },
                          { key: 'messageNotifications', label: 'Messages', desc: 'When you receive new messages' },
                          { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Course recommendations and promotions' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => updateNotificationSetting(item.key as keyof NotificationSettings)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications[item.key as keyof NotificationSettings]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof NotificationSettings]
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Push & SMS</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser notifications for important updates' },
                          { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Text messages for urgent notifications' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-600">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => updateNotificationSetting(item.key as keyof NotificationSettings)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                notifications[item.key as keyof NotificationSettings]
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  notifications[item.key as keyof NotificationSettings]
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Profile Visibility</h4>
                      <p className="text-sm text-gray-600 mb-4">Who can see your profile information</p>
                      <select
                        value={privacy.profileVisibility}
                        onChange={e => updatePrivacySetting('profileVisibility', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        title="Profile Visibility Setting"
                      >
                        <option value="public">Public - Anyone can see</option>
                        <option value="students-only">Students Only - Only enrolled students</option>
                        <option value="private">Private - Only you can see</option>
                      </select>
                    </div>

                    {[
                      { key: 'showOnlineStatus', label: 'Show Online Status', desc: 'Let others see when you\'re online' },
                      { key: 'allowDirectMessages', label: 'Allow Direct Messages', desc: 'Other users can send you messages' },
                      { key: 'shareProgressData', label: 'Share Progress Data', desc: 'Allow analytics on your learning progress' }
                    ].map(item => (
                      <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-900">{item.label}</h4>
                          <p className="text-sm text-gray-600">{item.desc}</p>
                        </div>
                        <button
                          onClick={() => updatePrivacySetting(item.key as keyof PrivacySettings, !privacy[item.key as keyof PrivacySettings])}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            privacy[item.key as keyof PrivacySettings]
                              ? 'bg-primary-600'
                              : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              privacy[item.key as keyof PrivacySettings]
                                ? 'translate-x-6'
                                : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Security</h2>
                  
                  <div className="space-y-6">
                    {/* Change Password */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                      <p className="text-gray-600 mb-4">
                        Since you signed up with Google, password changes are managed through Google.
                      </p>
                      <button
                        onClick={handleChangePassword}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <KeyIcon className="h-5 w-5 mr-2" />
                        Manage Google Account
                      </button>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <p className="text-gray-600 mb-4">
                        Add an extra layer of security to your account
                      </p>
                      <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <ShieldCheckIcon className="h-5 w-5 mr-2" />
                        Enable 2FA
                      </button>
                    </div>

                    {/* Connected Accounts */}
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Accounts</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-bold text-gray-900">G</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Google</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                          <span className="text-sm text-green-600 font-medium">Connected</span>
                        </div>
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                      <h3 className="text-lg font-medium text-red-900 mb-4">Danger Zone</h3>
                      <p className="text-red-700 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <button
                        onClick={handleDeleteAccount}
                        className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5 mr-2" />
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
