'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CalculatorIcon,
  ChartBarIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    name: 'GCSE',
    description: 'Foundation and Higher tier mathematics',
    topics: [
      'Number',
      'Algebra',
      'Ratio, Proportion & Rates of Change',
      'Geometry & Measures',
      'Probability',
      'Statistics'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC']
  },
  {
    name: 'IGCSE',
    description: 'International curriculum mathematics',
    topics: [
      'Number',
      'Algebra & Graphs',
      'Coordinate Geometry',
      'Geometry',
      'Mensuration',
      'Trigonometry',
      'Matrices & Transformations',
      'Probability & Statistics'
    ],
    examBoards: ['CIE', 'Edexcel']
  },
  {
    name: 'A Level',
    description: 'Advanced mathematics for university preparation',
    topics: [
      'Pure Mathematics',
      'Statistics',
      'Mechanics',
      'Decision Mathematics',
      'Further Pure Mathematics'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  },
  {
    name: 'AS Level',
    description: 'First year of A Level mathematics',
    topics: [
      'Pure Mathematics 1',
      'Statistics 1',
      'Mechanics 1'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  }
]

const studyResources = [
  {
    title: 'Revision Notes',
    description: 'Comprehensive notes covering all topics with clear explanations and examples',
    icon: AcademicCapIcon,
    features: ['Topic summaries', 'Key formulas', 'Worked examples', 'Common mistakes']
  },
  {
    title: 'Practice Questions',
    description: 'Thousands of practice questions organized by topic and difficulty',
    icon: ChartBarIcon,
    features: ['Topic-based questions', 'Mixed practice', 'Difficulty levels', 'Instant feedback']
  },
  {
    title: 'Past Papers',
    description: 'Complete collection of past exam papers with mark schemes',
    icon: ClockIcon,
    features: ['Recent papers', 'Mark schemes', 'Examiner reports', 'Grade boundaries']
  },
  {
    title: 'Video Tutorials',
    description: 'Step-by-step video explanations for complex mathematical concepts',
    icon: UserGroupIcon,
    features: ['Concept videos', 'Problem solving', 'Exam techniques', 'Quick reviews']
  }
]

const popularCourses = [
  { name: 'GCSE Maths AQA', students: '15,000+', rating: 4.8 },
  { name: 'A Level Maths Edexcel', students: '12,000+', rating: 4.9 },
  { name: 'IGCSE Maths CIE', students: '8,000+', rating: 4.7 },
  { name: 'AS Level Maths OCR', students: '6,000+', rating: 4.8 }
]

export default function MathsPage() {
  const [selectedLevel, setSelectedLevel] = useState('GCSE')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl">
                <CalculatorIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Mathematics
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master mathematics with our comprehensive resources covering algebra, geometry, calculus, statistics, and more. 
              From basic concepts to advanced problem-solving techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Exam Levels Selection */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Choose Your Level
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {examLevels.map((level) => (
                <button
                  key={level.name}
                  onClick={() => setSelectedLevel(level.name)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedLevel === level.name
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>

            {/* Selected Level Details */}
            <motion.div
              key={selectedLevel}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedLevel} Mathematics
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {examLevels.find(level => level.name === selectedLevel)?.topics.map((topic, index) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Available Exam Boards:</h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.examBoards.map((board) => (
                      <span key={board} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        {board}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Link 
                      href={`/courses?subject=maths&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Start Learning {selectedLevel} Maths
                      </motion.button>
                    </Link>
                    <Link 
                      href={`/video-lessons?subject=maths&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-blue-300 py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                        Watch Video Lessons
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Study Resources */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Study Resources
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyResources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
                    <resource.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {resource.description}
                  </p>
                  <ul className="space-y-1">
                    {resource.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Popular Mathematics Courses
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.5 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200 hover:border-blue-300 transition-colors duration-300"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{course.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>{course.students} students</span>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  <Link href={`/courses?search=${encodeURIComponent(course.name)}`}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
                      Explore Course
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
