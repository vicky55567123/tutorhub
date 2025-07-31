'use client'

import { useAuth } from '@/components/AuthContext'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  HeartIcon,
  StarIcon,
  ClockIcon,
  UserIcon,
  BookOpenIcon,
  TrashIcon,
  PlusIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface FavoriteItem {
  id: number
  type: 'course' | 'tutor'
  title: string
  instructor?: string
  subject?: string
  rating: number
  reviewCount: number
  price: string
  image: string
  addedDate: string
  description: string
}

// Mock favorites data - in real app, this would come from API
const mockFavorites: FavoriteItem[] = []

export default function FavoritesPage() {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<FavoriteItem[]>(mockFavorites)
  const [activeTab, setActiveTab] = useState<'all' | 'courses' | 'tutors'>('all')

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <HeartIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your favorites.</p>
        </div>
      </div>
    )
  }

  const filteredFavorites = favorites.filter(item => {
    if (activeTab === 'all') return true
    return activeTab === 'courses' ? item.type === 'course' : item.type === 'tutor'
  })

  const handleRemoveFavorite = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id))
    toast.success('Removed from favorites', {
      icon: '💔',
      style: {
        borderRadius: '10px',
        background: '#EF4444',
        color: '#fff',
      }
    })
  }

  const handleAddFavorite = () => {
    toast.success('Browse courses and tutors to add favorites!', {
      icon: '❤️',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <HeartSolidIcon className="h-8 w-8 text-red-500 mr-3" />
                My Favorites
              </h1>
              <p className="text-gray-600 mt-2">
                Your saved courses and tutors • {favorites.length} item{favorites.length !== 1 ? 's' : ''} saved
              </p>
            </div>
            <button 
              onClick={() => window.location.href = '/courses'}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Browse More
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Favorite Courses</p>
                <p className="text-2xl font-bold text-gray-900">
                  {favorites.filter(item => item.type === 'course').length}
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
                <p className="text-sm text-gray-600">Favorite Tutors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {favorites.filter(item => item.type === 'tutor').length}
                </p>
              </div>
              <UserIcon className="h-8 w-8 text-green-600" />
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
                <p className="text-sm text-gray-600">Total Saved</p>
                <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
              </div>
              <HeartSolidIcon className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-2 shadow-sm mb-8"
        >
          <div className="flex space-x-2">
            {(['all', 'courses', 'tutors'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab === 'all' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)} 
                ({tab === 'all' 
                  ? favorites.length 
                  : favorites.filter(item => item.type === (tab === 'courses' ? 'course' : 'tutor')).length
                })
              </button>
            ))}
          </div>
        </motion.div>

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => handleRemoveFavorite(item.id)}
                      title="Remove from favorites"
                      className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-red-100 transition-colors group-hover:scale-110"
                    >
                      <TrashIcon className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.type === 'course' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type === 'course' ? 'Course' : 'Tutor'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  {item.instructor && (
                    <p className="text-sm text-gray-600 mb-2">By {item.instructor}</p>
                  )}
                  
                  {item.subject && (
                    <p className="text-sm text-gray-600 mb-2">Subject: {item.subject}</p>
                  )}

                  <div className="flex items-center mb-3">
                    <div className="flex items-center mr-3">
                      {renderStars(item.rating)}
                    </div>
                    <span className="text-sm text-gray-600">
                      {item.rating} ({item.reviewCount} reviews)
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-gray-900">{item.price}</span>
                    <span className="text-xs text-gray-500">
                      Added {item.addedDate}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                      {item.type === 'course' ? 'Enroll Now' : 'View Profile'}
                      <ArrowRightIcon className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-12 text-center shadow-sm"
          >
            <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'all' 
                ? 'No favorites yet'
                : `No favorite ${activeTab} yet`
              }
            </h3>
            <p className="text-gray-600 mb-6">
              {activeTab === 'all'
                ? 'Start building your favorites by saving courses and tutors you like!'
                : `You haven't saved any ${activeTab} to your favorites yet.`
              }
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/courses'}
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors mr-3"
              >
                <BookOpenIcon className="h-5 w-5 mr-2" />
                Browse Courses
              </button>
              <button 
                onClick={() => window.location.href = '/tutors'}
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <UserIcon className="h-5 w-5 mr-2" />
                Find Tutors
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
