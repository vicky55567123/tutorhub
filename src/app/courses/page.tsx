'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '@/components/CourseCard'
import { LoadingCard } from '@/components/LoadingSpinner'
import toast from 'react-hot-toast'

const courses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    description: 'Master calculus, algebra, and advanced mathematical concepts with expert guidance.',
    price: '$50/hour',
    rating: 4.9,
    students: 150,
    image: 'https://images.unsplash.com/photo-1509228627152-72ae4c67b5bf?w=400&h=300&fit=crop',
    category: 'Mathematics',
    duration: '12 weeks',
    level: 'Advanced',
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'Computer Science Fundamentals',
    description: 'Learn programming, algorithms, and computer science principles from industry experts.',
    price: '$60/hour',
    rating: 4.8,
    students: 200,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    category: 'Programming',
    duration: '16 weeks',
    level: 'Beginner',
    instructor: 'Prof. Michael Chen'
  },
  {
    id: 3,
    title: 'English Literature & Writing',
    description: 'Improve your writing skills and explore classic and modern literature.',
    price: '$45/hour',
    rating: 4.7,
    students: 120,
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'English',
    duration: '10 weeks',
    level: 'Intermediate',
    instructor: 'Lisa Thompson'
  },
  {
    id: 4,
    title: 'Physics & Chemistry',
    description: 'Understand the fundamental principles of physics and chemistry with hands-on examples.',
    price: '$55/hour',
    rating: 4.8,
    students: 90,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    category: 'Science',
    duration: '14 weeks',
    level: 'Intermediate',
    instructor: 'Dr. James Wilson'
  },
  {
    id: 5,
    title: 'Spanish Language Learning',
    description: 'Become fluent in Spanish with interactive lessons and conversation practice.',
    price: '$40/hour',
    rating: 4.9,
    students: 180,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
    category: 'Languages',
    duration: '8 weeks',
    level: 'Beginner',
    instructor: 'Emma Rodriguez'
  },
  {
    id: 6,
    title: 'Music Theory & Piano',
    description: 'Learn music theory and piano playing techniques from professional musicians.',
    price: '$50/hour',
    rating: 4.6,
    students: 75,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    category: 'Music',
    duration: '12 weeks',
    level: 'Beginner',
    instructor: 'David Park'
  }
]

const categories = [
  { name: 'All', color: 'from-gray-500 to-gray-600', icon: '📚' },
  { name: 'Mathematics', color: 'from-blue-500 to-indigo-600', icon: '🧮' },
  { name: 'Programming', color: 'from-green-500 to-emerald-600', icon: '💻' },
  { name: 'English', color: 'from-purple-500 to-pink-600', icon: '📖' },
  { name: 'Science', color: 'from-orange-500 to-red-600', icon: '🔬' },
  { name: 'Languages', color: 'from-pink-500 to-rose-600', icon: '🌍' },
  { name: 'Music', color: 'from-yellow-500 to-amber-600', icon: '🎵' }
]

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (categoryName: string) => {
    setIsLoading(true)
    setSelectedCategory(categoryName)
    toast.success(`Showing ${categoryName === 'All' ? 'all' : categoryName} courses`)
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-secondary-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Courses
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Explore thousands of courses taught by expert instructors from around the world
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg placeholder-gray-400 bg-white shadow-lg"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">🔍</span>
                </div>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900">Categories</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 shadow-md ${
                    category.name === selectedCategory 
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105` 
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 hover:shadow-lg'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            {isLoading ? 'Loading...' : `Found ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''}`}
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : (
            filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchTerm('')
                toast.success('Filters cleared')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Load More */}
        {!isLoading && filteredCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button 
              className="btn-secondary px-8 py-3"
              onClick={() => toast('Load more functionality coming soon!', { 
                icon: 'ℹ️',
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                }
              })}
            >
              Load More Courses
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
