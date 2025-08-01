'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CourseCard from '@/components/CourseCard'
import { LoadingCard } from '@/components/LoadingSpinner'
import toast from 'react-hot-toast'

const courses = [
  // GCSE Courses
  {
    id: 1,
    title: 'GCSE Mathematics (Grades 4-9)',
    description: 'Complete GCSE Maths preparation covering Number, Algebra, Geometry, Statistics and Probability.',
    price: '£35/hour',
    rating: 4.9,
    students: 250,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop',
    category: 'GCSE',
    subject: 'Mathematics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Sarah Johnson',
    examBoard: 'AQA, Edexcel, OCR'
  },
  {
    id: 2,
    title: 'GCSE Physics (Grades 4-9)',
    description: 'Master GCSE Physics topics including Forces, Energy, Waves, Electricity and Particle Physics.',
    price: '£40/hour',
    rating: 4.8,
    students: 180,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&h=300&fit=crop',
    category: 'GCSE',
    subject: 'Physics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Prof. David Wilson',
    examBoard: 'AQA, Edexcel, OCR'
  },
  {
    id: 3,
    title: 'GCSE Chemistry (Grades 4-9)',
    description: 'Comprehensive GCSE Chemistry covering Atomic Structure, Bonding, Chemical Reactions and Analysis.',
    price: '£38/hour',
    rating: 4.9,
    students: 160,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    category: 'GCSE',
    subject: 'Chemistry',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Emma Thompson',
    examBoard: 'AQA, Edexcel, OCR'
  },
  {
    id: 4,
    title: 'GCSE Biology (Grades 4-9)',
    description: 'GCSE Biology essentials: Cell Biology, Human Biology, Genetics, Evolution and Ecology.',
    price: '£36/hour',
    rating: 4.7,
    students: 200,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop',
    category: 'GCSE',
    subject: 'Biology',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Michael Roberts',
    examBoard: 'AQA, Edexcel, OCR'
  },
  {
    id: 5,
    title: 'GCSE Computer Science (Grades 4-9)',
    description: 'GCSE Computer Science: Programming, Algorithms, Data Structures and Computer Systems.',
    price: '£42/hour',
    rating: 4.8,
    students: 140,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
    category: 'GCSE',
    subject: 'Computer Science',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Mr. James Chen',
    examBoard: 'AQA, Edexcel, OCR'
  },
  // Additional Courses
  {
    id: 6,
    title: 'Advanced Mathematics',
    description: 'Master calculus, algebra, and advanced mathematical concepts with expert guidance.',
    price: '$50/hour',
    rating: 4.9,
    students: 150,
    image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=400&h=300&fit=crop',
    category: 'Mathematics',
    duration: '12 weeks',
    level: 'Advanced',
    instructor: 'Prof. Lisa Anderson'
  },
  {
    id: 7,
    title: 'Computer Science Fundamentals',
    description: 'Learn programming, algorithms, and computer science principles from industry experts.',
    price: '$60/hour',
    rating: 4.8,
    students: 200,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
    category: 'Programming',
    duration: '16 weeks',
    level: 'Beginner',
    instructor: 'Prof. Michael Chen'
  },
  {
    id: 8,
    title: 'English Literature & Writing',
    description: 'Improve your writing skills and explore classic and modern literature.',
    price: '$45/hour',
    rating: 4.7,
    students: 120,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    category: 'English',
    duration: '10 weeks',
    level: 'Intermediate',
    instructor: 'Lisa Thompson'
  },
  {
    id: 9,
    title: 'Physics & Chemistry',
    description: 'Understand the fundamental principles of physics and chemistry with hands-on examples.',
    price: '$55/hour',
    rating: 4.8,
    students: 90,
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=400&h=300&fit=crop',
    category: 'Science',
    duration: '14 weeks',
    level: 'Intermediate',
    instructor: 'Dr. James Wilson'
  }
]

const categories = [
  { name: 'All', color: 'from-gray-500 to-gray-600', icon: '📚' },
  { name: 'GCSE', color: 'from-indigo-500 to-purple-600', icon: '🎓' },
  { name: 'Mathematics', color: 'from-blue-500 to-indigo-600', icon: '🧮' },
  { name: 'Programming', color: 'from-green-500 to-emerald-600', icon: '💻' },
  { name: 'English', color: 'from-purple-500 to-pink-600', icon: '📖' },
  { name: 'Science', color: 'from-orange-500 to-red-600', icon: '🔬' }
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
