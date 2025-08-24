'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  BeakerIcon,
  CalculatorIcon,
  AcademicCapIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
  BookOpenIcon,
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    name: 'GCSE',
    description: 'General Certificate of Secondary Education - UK qualification for students aged 14-16',
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    gradeRange: '9-1 (9 being the highest)',
    duration: '2 years',
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    name: 'IGCSE',
    description: 'International General Certificate of Secondary Education - Globally recognized qualification',
    examBoards: ['Cambridge CIE', 'Edexcel Pearson'],
    gradeRange: 'A*-G (A* being the highest)',
    duration: '2 years',
    color: 'from-emerald-500 to-emerald-700',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-800',
    borderColor: 'border-emerald-200'
  }
]

const coreSubjects = [
  {
    name: 'Mathematics',
    icon: CalculatorIcon,
    description: 'Algebra, Geometry, Statistics, and Problem-solving',
    topics: ['Number', 'Algebra', 'Geometry & Measures', 'Statistics & Probability'],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800'
  },
  {
    name: 'Chemistry',
    icon: BeakerIcon,
    description: 'Atomic Structure, Chemical Reactions, and Analysis',
    topics: ['Atomic Structure', 'Bonding', 'Chemical Changes', 'Organic Chemistry'],
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800'
  },
  {
    name: 'Physics',
    icon: GlobeAltIcon,
    description: 'Forces, Energy, Waves, and Electricity',
    topics: ['Forces & Motion', 'Energy', 'Waves', 'Electricity & Magnetism'],
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800'
  },
  {
    name: 'Biology',
    icon: AcademicCapIcon,
    description: 'Cell Biology, Human Biology, and Genetics',
    topics: ['Cell Biology', 'Organisation', 'Infection & Response', 'Bioenergetics'],
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800'
  },
  {
    name: 'Computer Science',
    icon: ComputerDesktopIcon,
    description: 'Programming, Algorithms, and Computer Systems',
    topics: ['Programming', 'Data Structures', 'Computer Systems', 'Networks'],
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800'
  },
  {
    name: 'English Language',
    icon: BookOpenIcon,
    description: 'Reading, Writing, Speaking, and Listening Skills',
    topics: ['Reading Comprehension', 'Creative Writing', 'Language Analysis', 'Spoken Language'],
    color: 'from-rose-500 to-rose-700',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-800'
  }
]

const features = [
  'Expert qualified teachers',
  'Exam board specific preparation',
  'Regular progress assessments',
  'Past paper practice',
  'Individual learning plans',
  'Flexible online sessions'
]

const stats = [
  { label: 'Students Enrolled', value: '12,000+', icon: UserGroupIcon },
  { label: 'Average Grade Improvement', value: '2.3 Grades', icon: StarIcon },
  { label: 'Success Rate', value: '96%', icon: CheckCircleIcon },
  { label: 'Expert Tutors', value: '400+', icon: AcademicCapIcon }
]

export default function GCSEIGCSEPage() {
  const [selectedLevel, setSelectedLevel] = useState('GCSE')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
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
              <div className="p-4 bg-gradient-to-r from-blue-500 to-emerald-600 rounded-2xl">
                <AcademicCapIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                GCSE & IGCSE
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master your GCSE and IGCSE qualifications with expert tutoring. 
              From core subjects to specialized topics, achieve grades 4-9 with our proven teaching methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses?category=GCSE"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Browse GCSE Courses
              </Link>
              <Link
                href="/courses?category=IGCSE"
                className="px-8 py-4 bg-white border-2 border-blue-200 text-blue-700 rounded-xl font-semibold hover:border-blue-300 transition-all duration-300"
              >
                Browse IGCSE Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              >
                <stat.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Levels Comparison */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Qualification</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you&apos;re pursuing GCSE or IGCSE, we provide comprehensive support for both qualifications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {examLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`${level.bgColor} ${level.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300`}
              >
                <h3 className={`text-3xl font-bold ${level.textColor} mb-4`}>{level.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{level.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className={`font-semibold ${level.textColor} mb-2`}>Exam Boards:</h4>
                    <p className="text-gray-600">{level.examBoards.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${level.textColor} mb-2`}>Grade Range:</h4>
                    <p className="text-gray-600">{level.gradeRange}</p>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${level.textColor} mb-2`}>Duration:</h4>
                    <p className="text-gray-600">{level.duration}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href={`/courses?category=${level.name}`}
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${level.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                  >
                    View {level.name} Courses
                    <motion.svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Subjects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the essential subjects with our expert tutors and comprehensive resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreSubjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${subject.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${subject.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <subject.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className={`text-xl font-bold ${subject.textColor} mb-3`}>
                  {subject.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {subject.description}
                </p>
                
                <div className="space-y-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircleIcon className={`w-4 h-4 ${subject.textColor} mr-2 flex-shrink-0`} />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    href={`/subjects/${subject.name.toLowerCase().replace(' ', '-')}`}
                    className={`inline-flex items-center text-sm font-medium ${subject.textColor} hover:underline`}
                  >
                    Learn More
                    <motion.svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose Our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                    GCSE & IGCSE Programme?
                  </span>
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our comprehensive tutoring programme is designed specifically for GCSE and IGCSE students 
                  aiming to achieve their best possible grades with expert guidance and proven methodologies.
                </p>
                <Link
                  href="/courses"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Start Your Journey
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-100"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
