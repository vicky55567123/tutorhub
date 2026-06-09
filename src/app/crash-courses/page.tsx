'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CrashCourse {
  id: string
  title: string
  subject: string
  level: string
  duration: string
  sessions: number
  price: string
  originalPrice: string
  description: string
  features: string[]
  topics: string[]
  nextStartDate: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  image: string
}

const crashCourses: CrashCourse[] = [
  {
    id: 'gcse-math-crash',
    title: 'GCSE Mathematics Crash Course',
    subject: 'Mathematics',
    level: 'GCSE',
    duration: '2 weeks',
    sessions: 10,
    price: '£149',
    originalPrice: '£299',
    description: 'Master GCSE Mathematics in just 2 weeks with our intensive crash course. Perfect for last-minute exam preparation.',
    features: [
      'Daily 2-hour intensive sessions',
      'Past paper practice',
      'Exam techniques & strategies',
      'Personal tutor support',
      'Course materials included'
    ],
    topics: ['Algebra', 'Geometry', 'Statistics', 'Number Theory', 'Trigonometry'],
    nextStartDate: '2025-09-01',
    difficulty: 'Intermediate',
    image: '/images/math-crash.jpg'
  },
  {
    id: 'alevel-physics-crash',
    title: 'A-Level Physics Crash Course',
    subject: 'Physics',
    level: 'A-Level',
    duration: '3 weeks',
    sessions: 15,
    price: '£229',
    originalPrice: '£449',
    description: 'Comprehensive A-Level Physics revision covering all key topics with practical experiments and problem-solving.',
    features: [
      'Expert physics tutors',
      'Laboratory demonstrations',
      'Formula sheet mastery',
      'Mock exams included',
      'Small class sizes (max 8 students)'
    ],
    topics: ['Mechanics', 'Waves', 'Electricity', 'Magnetism', 'Modern Physics'],
    nextStartDate: '2025-09-05',
    difficulty: 'Advanced',
    image: '/images/physics-crash.jpg'
  },
  {
    id: 'gcse-english-crash',
    title: 'GCSE English Literature Crash Course',
    subject: 'English Literature',
    level: 'GCSE',
    duration: '10 days',
    sessions: 8,
    price: '£119',
    originalPrice: '£249',
    description: 'Intensive GCSE English Literature preparation focusing on key texts, essay writing, and exam techniques.',
    features: [
      'Text analysis mastery',
      'Essay writing workshops',
      'Character & theme exploration',
      'Exam board specific content',
      'Practice papers & marking'
    ],
    topics: ['Shakespeare', 'Modern Texts', 'Poetry', 'Essay Techniques', 'Critical Analysis'],
    nextStartDate: '2025-09-03',
    difficulty: 'Intermediate',
    image: '/images/english-crash.jpg'
  },
  {
    id: 'alevel-chemistry-crash',
    title: 'A-Level Chemistry Crash Course',
    subject: 'Chemistry',
    level: 'A-Level',
    duration: '3 weeks',
    sessions: 15,
    price: '£249',
    originalPrice: '£499',
    description: 'Complete A-Level Chemistry revision with practical work, calculations, and organic chemistry mastery.',
    features: [
      'Practical experiments',
      'Calculation workshops',
      'Organic chemistry focus',
      'Periodic table mastery',
      'Industrial chemistry applications'
    ],
    topics: ['Organic Chemistry', 'Physical Chemistry', 'Inorganic Chemistry', 'Analysis', 'Calculations'],
    nextStartDate: '2025-09-07',
    difficulty: 'Advanced',
    image: '/images/chemistry-crash.jpg'
  },
  {
    id: 'gcse-science-crash',
    title: 'GCSE Combined Science Crash Course',
    subject: 'Combined Science',
    level: 'GCSE',
    duration: '2.5 weeks',
    sessions: 12,
    price: '£179',
    originalPrice: '£359',
    description: 'Comprehensive GCSE Combined Science crash course covering Biology, Chemistry, and Physics.',
    features: [
      'All three sciences covered',
      'Practical skills development',
      'Scientific method mastery',
      'Calculation practice',
      'Required practicals review'
    ],
    topics: ['Biology', 'Chemistry', 'Physics', 'Practical Skills', 'Scientific Method'],
    nextStartDate: '2025-09-02',
    difficulty: 'Intermediate',
    image: '/images/science-crash.jpg'
  },
  {
    id: 'alevel-biology-crash',
    title: 'A-Level Biology Crash Course',
    subject: 'Biology',
    level: 'A-Level',
    duration: '3 weeks',
    sessions: 15,
    price: '£229',
    originalPrice: '£449',
    description: 'Intensive A-Level Biology course covering all topics from molecular biology to ecology.',
    features: [
      'Microscopy sessions',
      'Genetics problem solving',
      'Ecology field studies',
      'Molecular biology focus',
      'Exam technique workshops'
    ],
    topics: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Biology'],
    nextStartDate: '2025-09-04',
    difficulty: 'Advanced',
    image: '/images/biology-crash.jpg'
  }
]

const subjects = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Literature', 'Combined Science']
const levels = ['All', 'GCSE', 'A-Level']

const formatCourseDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-')
  return `${day}/${month}/${year}`
}

export default function CrashCoursesPage() {
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [selectedLevel, setSelectedLevel] = useState('All')
  const [selectedCourse, setSelectedCourse] = useState<CrashCourse | null>(null)

  const filteredCourses = crashCourses.filter(course => {
    return (selectedSubject === 'All' || course.subject === selectedSubject) &&
           (selectedLevel === 'All' || course.level === selectedLevel)
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              ⚡ Crash Courses
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Intensive, focused learning designed to maximize your exam success in minimum time
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">📚 Expert Tutors</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">⏱️ Fast Results</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-6 py-3">
                <span className="font-semibold">🎯 Exam Focused</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Subject Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(subject)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedSubject === subject
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Level</label>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedLevel === level
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              {/* Course Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1 text-sm font-medium">
                    {course.level}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    course.difficulty === 'Beginner' ? 'bg-green-400 text-green-900' :
                    course.difficulty === 'Intermediate' ? 'bg-yellow-400 text-yellow-900' :
                    'bg-red-400 text-red-900'
                  }`}>
                    {course.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="opacity-90 text-sm">{course.subject}</p>
              </div>

              <div className="p-6">
                {/* Price and Duration */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-800">{course.price}</span>
                      <span className="text-lg text-gray-400 line-through">{course.originalPrice}</span>
                    </div>
                    <p className="text-sm text-green-600 font-medium">50% OFF Limited Time</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-bold text-gray-800">{course.duration}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{course.description}</p>

                {/* Key Info */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">📅 Sessions:</span>
                    <span className="ml-2">{course.sessions} intensive sessions</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">🗓️ Next Start:</span>
                    <span className="ml-2">{formatCourseDate(course.nextStartDate)}</span>
                  </div>
                </div>

                {/* Topics Preview */}
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Topics Covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.slice(0, 3).map((topic, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {topic}
                      </span>
                    ))}
                    {course.topics.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        +{course.topics.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    View Details
                  </button>
                  <Link
                    href={`https://wa.me/923134567890?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(course.title)}%20crash%20course.%20Can%20you%20provide%20more%20details?`}
                    target="_blank"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 text-sm"
                  >
                    💬 Enroll
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCourse.title}</h2>
                  <p className="text-gray-600">{selectedCourse.description}</p>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Course Features</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedCourse.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <h3 className="text-xl font-bold text-gray-800 mb-4">All Topics Covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.topics.map((topic, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Course Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-medium">{selectedCourse.level}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedCourse.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sessions:</span>
                        <span className="font-medium">{selectedCourse.sessions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className="font-medium">{selectedCourse.difficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Start:</span>
                        <span className="font-medium">{formatCourseDate(selectedCourse.nextStartDate)}</span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Price:</span>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-gray-800">{selectedCourse.price}</span>
                            <span className="text-gray-400 line-through ml-2">{selectedCourse.originalPrice}</span>
                          </div>
                        </div>
                        <p className="text-green-600 font-medium text-sm mt-1">50% OFF - Limited Time Offer!</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      href={`https://wa.me/923134567890?text=Hi!%20I%20want%20to%20enroll%20in%20the%20${encodeURIComponent(selectedCourse.title)}%20starting%20${formatCourseDate(selectedCourse.nextStartDate)}.%20Please%20send%20me%20enrollment%20details.`}
                      target="_blank"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 text-center"
                    >
                      💬 Enroll via WhatsApp
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Why Choose Our Crash Courses */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl text-white p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Crash Courses?</h2>
            <p className="text-xl opacity-90">Fast-track your success with proven intensive learning methods</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Lightning Fast Results</h3>
              <p className="opacity-90">Cover months of syllabus in weeks with our intensive format</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-bold mb-2">Expert Tutors</h3>
              <p className="opacity-90">Learn from qualified teachers with proven exam success records</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Exam Focused</h3>
              <p className="opacity-90">Every session designed specifically for maximum exam performance</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
