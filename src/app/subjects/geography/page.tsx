'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  GlobeAltIcon,
  MapIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  CloudIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    name: 'GCSE',
    description: 'Foundation geography covering physical and human geography',
    topics: [
      'Living with the Physical Environment',
      'Natural Hazards',
      'Physical Landscapes in the UK',
      'Challenges in the Human Environment',
      'Urban Issues and Challenges',
      'The Changing Economic World',
      'The Challenge of Resource Management',
      'Geographical Applications'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC']
  },
  {
    name: 'IGCSE',
    description: 'International geography with global case studies',
    topics: [
      'Population and Settlement',
      'The Natural Environment',
      'Economic Development',
      'Environmental Management',
      'Case Studies'
    ],
    examBoards: ['CIE', 'Edexcel']
  },
  {
    name: 'A Level',
    description: 'Advanced geography for university preparation',
    topics: [
      'Water and Carbon Cycles',
      'Coastal Systems and Landscapes',
      'Hazards',
      'Global Systems and Global Governance',
      'Changing Places',
      'Contemporary Urban Environments',
      'Population and the Environment',
      'Resource Security',
      'Independent Investigation'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  },
  {
    name: 'AS Level',
    description: 'First year of A Level geography',
    topics: [
      'Physical Geography',
      'Human Geography',
      'Geographical Skills',
      'Fieldwork'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  }
]

const studyResources = [
  {
    title: 'Case Studies',
    description: 'Real-world examples and geographical investigations',
    icon: MapIcon,
    features: ['Location studies', 'Development projects', 'Natural disasters', 'Urban planning']
  },
  {
    title: 'Data Analysis',
    description: 'Statistical and graphical data interpretation',
    icon: AcademicCapIcon,
    features: ['Population data', 'Climate graphs', 'Economic indicators', 'GIS mapping']
  },
  {
    title: 'Fieldwork Guides',
    description: 'Practical geography skills and investigations',
    icon: CloudIcon,
    features: ['Data collection', 'Sampling methods', 'Risk assessment', 'Analysis techniques']
  },
  {
    title: 'Interactive Maps',
    description: 'Dynamic geographical visualizations and tools',
    icon: GlobeAltIcon,
    features: ['World maps', 'Thematic mapping', 'Satellite imagery', 'Climate data']
  }
]

const popularCourses = [
  { name: 'GCSE Geography AQA', students: '19,200+', rating: 4.8 },
  { name: 'A Level Geography Edexcel', students: '13,600+', rating: 4.9 },
  { name: 'IGCSE Geography CIE', students: '10,800+', rating: 4.7 },
  { name: 'AS Level Geography OCR', students: '7,400+', rating: 4.8 }
]

const keyAreas = [
  {
    title: 'Physical Geography',
    description: 'Landforms, weather, climate, and natural processes',
    icon: '🏔️'
  },
  {
    title: 'Human Geography',
    description: 'Population, settlement, economic and social geography',
    icon: '🏙️'
  },
  {
    title: 'Environmental Issues',
    description: 'Sustainability, climate change, and conservation',
    icon: '🌍'
  },
  {
    title: 'Development',
    description: 'Economic development, globalization, and inequality',
    icon: '📈'
  }
]

export default function GeographyPage() {
  const [selectedLevel, setSelectedLevel] = useState('GCSE')

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
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
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl">
                <GlobeAltIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Geography
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our planet&apos;s diverse landscapes, environments, and human societies. 
              From physical processes to global challenges, understand the world around us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Areas */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Key Areas of Study
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyAreas.map((area, index) => (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {area.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Exam Levels Selection */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
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
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
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
                    {selectedLevel} Geography
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {examLevels.find(level => level.name === selectedLevel)?.topics.map((topic, index) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Available Exam Boards:</h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.examBoards.map((board) => (
                      <span key={board} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium">
                        {board}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Link 
                      href={`/courses?subject=geography&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Start Learning {selectedLevel} Geography
                      </motion.button>
                    </Link>
                    <Link 
                      href={`/video-lessons?subject=geography&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-emerald-300 py-3 px-6 rounded-xl font-semibold transition-all duration-300">
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
            transition={{ delay: 0.6, duration: 0.8 }}
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
                  transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-4">
                    <resource.icon className="h-6 w-6 text-emerald-600" />
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
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
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
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Popular Geography Courses
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:border-emerald-300 transition-colors duration-300"
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
                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
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
