'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BookOpenIcon,
  PencilIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  DocumentTextIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    name: 'GCSE',
    description: 'Foundation literature covering poetry, prose, and drama analysis',
    topics: [
      'Shakespeare',
      'Poetry Anthology',
      'Modern Drama',
      '19th Century Novel',
      'Literary Analysis',
      'Context and Themes',
      'Character Development'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC']
  },
  {
    name: 'IGCSE',
    description: 'International literature curriculum with global perspectives',
    topics: [
      'Poetry',
      'Prose',
      'Drama',
      'Unseen Analysis',
      'Creative Writing',
      'Comparative Studies'
    ],
    examBoards: ['CIE', 'Edexcel']
  },
  {
    name: 'A Level',
    description: 'Advanced literature for university preparation',
    topics: [
      'Love Through the Ages',
      'Political and Social Protest Writing',
      'World War One and Literature',
      'The Gothic',
      'Comedy',
      'Dystopian Literature',
      'Comparative Analysis',
      'Independent Critical Study'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  },
  {
    name: 'AS Level',
    description: 'First year of A Level literature',
    topics: [
      'Poetry Analysis',
      'Prose Study',
      'Drama Analysis',
      'Contextual Study',
      'Literary Criticism'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  }
]

const studyResources = [
  {
    title: 'Text Analysis',
    description: 'Detailed breakdowns of literary texts and themes',
    icon: DocumentTextIcon,
    features: ['Character analysis', 'Theme exploration', 'Symbolism', 'Language techniques']
  },
  {
    title: 'Essay Writing',
    description: 'Structured approach to literary essay composition',
    icon: PencilIcon,
    features: ['Essay structure', 'Critical arguments', 'Quotation analysis', 'Exam technique']
  },
  {
    title: 'Context Guides',
    description: 'Historical and cultural contexts of literary works',
    icon: LightBulbIcon,
    features: ['Historical background', 'Social context', 'Author biography', 'Literary movements']
  },
  {
    title: 'Revision Notes',
    description: 'Comprehensive summaries and key quotations',
    icon: BookOpenIcon,
    features: ['Plot summaries', 'Key quotes', 'Themes overview', 'Character maps']
  }
]

const popularCourses = [
  { name: 'GCSE English Literature AQA', students: '22,000+', rating: 4.9 },
  { name: 'A Level English Literature OCR', students: '15,800+', rating: 4.8 },
  { name: 'IGCSE English Literature CIE', students: '12,400+', rating: 4.7 },
  { name: 'AS Level English Literature Edexcel', students: '8,900+', rating: 4.8 }
]

const keyTexts = [
  {
    title: 'Shakespeare',
    description: 'Macbeth, Romeo and Juliet, Hamlet, The Tempest, and more',
    icon: '🎭'
  },
  {
    title: 'Poetry',
    description: 'Power and Conflict, Love and Relationships anthology',
    icon: '📝'
  },
  {
    title: 'Modern Drama',
    description: 'An Inspector Calls, Blood Brothers, The History Boys',
    icon: '🎪'
  },
  {
    title: '19th Century Fiction',
    description: 'Jekyll and Hyde, A Christmas Carol, Pride and Prejudice',
    icon: '📚'
  }
]

export default function EnglishLiteraturePage() {
  const [selectedLevel, setSelectedLevel] = useState('GCSE')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
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
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl">
                <BookOpenIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                English Literature
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Dive deep into the world of literature. Analyze poetry, drama, and prose with our comprehensive guides, 
              from Shakespeare to contemporary writers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Texts */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Key Literary Genres
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyTexts.map((text, index) => (
                <motion.div
                  key={text.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-4xl mb-4">{text.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {text.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {text.description}
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
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300 hover:bg-purple-50'
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
                    {selectedLevel} English Literature
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {examLevels.find(level => level.name === selectedLevel)?.topics.map((topic, index) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Available Exam Boards:</h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.examBoards.map((board) => (
                      <span key={board} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {board}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Link 
                      href={`/courses?subject=english-literature&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Start Learning {selectedLevel} Literature
                      </motion.button>
                    </Link>
                    <Link 
                      href={`/video-lessons?subject=english-literature&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-purple-300 py-3 px-6 rounded-xl font-semibold transition-all duration-300">
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
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-4">
                    <resource.icon className="h-6 w-6 text-purple-600" />
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
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
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
              Popular Literature Courses
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200 hover:border-purple-300 transition-colors duration-300"
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
                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
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
