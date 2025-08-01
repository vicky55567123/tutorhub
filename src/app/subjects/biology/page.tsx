'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BeakerIcon,
  HeartIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  EyeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    name: 'GCSE',
    description: 'Foundation biology covering cell biology, genetics, and ecology',
    topics: [
      'Cell Biology',
      'Organisation',
      'Infection and Response',
      'Bioenergetics', 
      'Homeostasis and Response',
      'Inheritance, Variation and Evolution',
      'Ecology'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC']
  },
  {
    name: 'IGCSE',
    description: 'International biology curriculum with practical applications',
    topics: [
      'Characteristics and Classification of Living Organisms',
      'Organisation and Maintenance of the Organism',
      'Movement in and out of Cells',
      'Biological Molecules',
      'Enzymes',
      'Plant Nutrition',
      'Human Nutrition',
      'Transport in Plants',
      'Transport in Animals',
      'Diseases and Immunity',
      'Excretion in Humans',
      'Coordination and Response',
      'Drugs',
      'Reproduction',
      'Inheritance',
      'Variation and Selection',
      'Organisms and their Environment'
    ],
    examBoards: ['CIE', 'Edexcel']
  },
  {
    name: 'A Level',
    description: 'Advanced biology for university preparation',
    topics: [
      'Biological Molecules',
      'Cells',
      'Organisms Exchange Substances',
      'Genetic Information, Variation and Relationships',
      'Energy Transfers in and between Organisms',
      'Organisms Respond to Changes',
      'Genetics, Populations, Evolution and Ecosystems',
      'Gene Expression'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  },
  {
    name: 'AS Level',
    description: 'First year of A Level biology',
    topics: [
      'Biological Molecules',
      'Cells',
      'Organisms Exchange Substances',
      'Genetic Information and Variation'
    ],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE']
  }
]

const studyResources = [
  {
    title: 'Interactive Diagrams',
    description: 'Detailed biological diagrams with labels and explanations',
    icon: EyeIcon,
    features: ['Cell structures', 'Body systems', 'Plant anatomy', 'Molecular models']
  },
  {
    title: 'Practical Guides',
    description: 'Step-by-step laboratory procedures and experiments',
    icon: BeakerIcon,
    features: ['Required practicals', 'Safety procedures', 'Data analysis', 'Equipment guides']
  },
  {
    title: 'Case Studies',
    description: 'Real-world applications of biological concepts',
    icon: GlobeAltIcon,
    features: ['Disease studies', 'Conservation', 'Biotechnology', 'Research findings']
  },
  {
    title: 'Video Lessons',
    description: 'Visual explanations of complex biological processes',
    icon: UserGroupIcon,
    features: ['Process animations', 'Microscopy', 'Field studies', 'Expert interviews']
  }
]

const popularCourses = [
  { name: 'GCSE Biology AQA', students: '18,000+', rating: 4.9 },
  { name: 'A Level Biology OCR', students: '14,000+', rating: 4.8 },
  { name: 'IGCSE Biology CIE', students: '11,000+', rating: 4.7 },
  { name: 'AS Level Biology Edexcel', students: '7,500+', rating: 4.8 }
]

const keyAreas = [
  {
    title: 'Cell Biology',
    description: 'Structure and function of cells, organelles, and cellular processes',
    icon: '🔬'
  },
  {
    title: 'Genetics',
    description: 'Inheritance patterns, DNA structure, and genetic engineering',
    icon: '🧬'
  },
  {
    title: 'Ecology',
    description: 'Ecosystems, biodiversity, and environmental interactions',
    icon: '🌱'
  },
  {
    title: 'Human Biology',
    description: 'Body systems, health, disease, and medical applications',
    icon: '❤️'
  }
]

export default function BiologyPage() {
  const [selectedLevel, setSelectedLevel] = useState('GCSE')

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
              <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl">
                <HeartIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Biology
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore the fascinating world of living organisms. From molecular biology to ecology, 
              discover the principles that govern life on Earth with our comprehensive resources.
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
                      ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50'
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
                    {selectedLevel} Biology
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Topics:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {examLevels.find(level => level.name === selectedLevel)?.topics.map((topic, index) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Available Exam Boards:</h4>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {examLevels.find(level => level.name === selectedLevel)?.examBoards.map((board) => (
                      <span key={board} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        {board}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-4">
                    <Link 
                      href={`/courses?subject=biology&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Start Learning {selectedLevel} Biology
                      </motion.button>
                    </Link>
                    <Link 
                      href={`/video-lessons?subject=biology&level=${selectedLevel.toLowerCase()}`}
                      className="block w-full"
                    >
                      <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-green-300 py-3 px-6 rounded-xl font-semibold transition-all duration-300">
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
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                    <resource.icon className="h-6 w-6 text-green-600" />
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
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
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
              Popular Biology Courses
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularCourses.map((course, index) => (
                <motion.div
                  key={course.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:border-green-300 transition-colors duration-300"
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
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200">
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
