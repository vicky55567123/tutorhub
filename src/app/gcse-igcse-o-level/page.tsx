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
  UserGroupIcon,
  TrophyIcon,
  ChartBarIcon
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
    borderColor: 'border-blue-200',
    popularity: '95%'
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
    borderColor: 'border-emerald-200',
    popularity: '88%'
  },
  {
    name: 'O-Level',
    description: 'Ordinary Level - Cambridge International qualification widely accepted globally',
    examBoards: ['Cambridge International', 'Oxford AQA'],
    gradeRange: 'A*-E (A* being the highest)',
    duration: '2 years',
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200',
    popularity: '82%'
  }
]

const coreSubjects = [
  {
    name: 'Mathematics',
    icon: CalculatorIcon,
    description: 'Algebra, Geometry, Statistics, and Problem-solving',
    topics: ['Number', 'Algebra', 'Geometry & Measures', 'Statistics & Probability'],
    color: 'from-blue-500 to-blue-700',
    availability: { gcse: true, igcse: true, olevel: true },
    popularity: '98%'
  },
  {
    name: 'Chemistry',
    icon: BeakerIcon,
    description: 'Atomic structure, Chemical reactions, and Organic chemistry',
    topics: ['Atomic Structure', 'Chemical Reactions', 'Organic Chemistry', 'Physical Chemistry'],
    color: 'from-green-500 to-green-700',
    availability: { gcse: true, igcse: true, olevel: true },
    popularity: '85%'
  },
  {
    name: 'Physics',
    icon: AcademicCapIcon,
    description: 'Mechanics, Electricity, Waves, and Modern physics',
    topics: ['Mechanics', 'Electricity & Magnetism', 'Waves & Optics', 'Thermal Physics'],
    color: 'from-purple-500 to-purple-700',
    availability: { gcse: true, igcse: true, olevel: true },
    popularity: '78%'
  },
  {
    name: 'Biology',
    icon: BookOpenIcon,
    description: 'Cell biology, Ecology, Genetics, and Human biology',
    topics: ['Cell Biology', 'Genetics', 'Ecology', 'Human Physiology'],
    color: 'from-emerald-500 to-emerald-700',
    availability: { gcse: true, igcse: true, olevel: true },
    popularity: '92%'
  },
  {
    name: 'Computer Science',
    icon: ComputerDesktopIcon,
    description: 'Programming, Algorithms, and Computer systems',
    topics: ['Programming', 'Algorithms', 'Data Structures', 'Computer Systems'],
    color: 'from-indigo-500 to-indigo-700',
    availability: { gcse: true, igcse: true, olevel: false },
    popularity: '76%'
  },
  {
    name: 'English Language',
    icon: GlobeAltIcon,
    description: 'Reading, Writing, Speaking, and Language analysis',
    topics: ['Reading Comprehension', 'Creative Writing', 'Language Analysis', 'Speaking & Listening'],
    color: 'from-red-500 to-red-700',
    availability: { gcse: true, igcse: true, olevel: true },
    popularity: '99%'
  }
]

const successStats = [
  { label: 'Students Taught', value: '15,000+', icon: UserGroupIcon, color: 'text-blue-600' },
  { label: 'Average Grade Improvement', value: '2.3 Grades', icon: TrophyIcon, color: 'text-green-600' },
  { label: 'Success Rate', value: '96.8%', icon: ChartBarIcon, color: 'text-purple-600' },
  { label: 'Expert Tutors', value: '450+', icon: StarIcon, color: 'text-orange-600' }
]

const comparisonFeatures = [
  {
    feature: 'Global Recognition',
    gcse: 'UK & Commonwealth',
    igcse: 'Worldwide',
    olevel: 'Worldwide',
    gcseBest: false,
    igcseBest: true,
    olevelBest: true
  },
  {
    feature: 'Assessment Style',
    gcse: 'Mixed (coursework + exams)',
    igcse: 'Mainly exam-based',
    olevel: 'Primarily exam-based',
    gcseBest: true,
    igcseBest: false,
    olevelBest: false
  },
  {
    feature: 'Flexibility',
    gcse: 'Structured timeline',
    igcse: 'High flexibility',
    olevel: 'Moderate flexibility',
    gcseBest: false,
    igcseBest: true,
    olevelBest: false
  },
  {
    feature: 'University Acceptance',
    gcse: 'UK universities',
    igcse: 'Global universities',
    olevel: 'Global universities',
    gcseBest: false,
    igcseBest: true,
    olevelBest: true
  }
]

export default function GCSEIGCSEOLevelPage() {
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [selectedSubject, setSelectedSubject] = useState(null)

  const filteredSubjects = selectedLevel === 'all' 
    ? coreSubjects 
    : coreSubjects.filter(subject => {
        if (selectedLevel === 'gcse') return subject.availability.gcse
        if (selectedLevel === 'igcse') return subject.availability.igcse
        if (selectedLevel === 'olevel') return subject.availability.olevel
        return true
      })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-secondary-600/5 to-accent-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent mb-6">
              GCSE • IGCSE • O-Level
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              Master your secondary education with expert tutoring across all three major international qualifications
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {successStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm"
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="/courses"
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Browse All Courses
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white border-2 border-primary-200 text-primary-700 rounded-2xl font-semibold hover:border-primary-300 transition-all duration-300"
              >
                Get Free Consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Qualification Overview */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Qualification Path</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each qualification offers unique advantages. Find the perfect fit for your academic goals and future aspirations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {examLevels.map((level, index) => (
              <motion.div
                key={level.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`${level.bgColor} ${level.borderColor} border-2 rounded-3xl p-8 hover:shadow-lg transition-all duration-300`}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${level.color} flex items-center justify-center mb-6`}>
                  <AcademicCapIcon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold ${level.textColor} mb-3`}>{level.name}</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{level.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-800">Exam Boards:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {level.examBoards.map((board) => (
                        <span key={board} className="text-xs bg-white px-2 py-1 rounded-full text-gray-700">
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-800">Grade Range:</span>
                    <span className="ml-2 text-gray-700">{level.gradeRange}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-gray-800">Duration:</span>
                    <span className="ml-2 text-gray-700">{level.duration}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-gray-800">Popularity:</span>
                    <span className="ml-2 text-gray-700">{level.popularity} of students choose this</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Comparison</h2>
            <p className="text-xl text-gray-600">
              Compare key features across all three qualifications
            </p>
          </motion.div>

          <div className="overflow-x-auto bg-gray-50 rounded-2xl p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-6 font-bold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-bold text-blue-600">GCSE</th>
                  <th className="text-center py-4 px-6 font-bold text-emerald-600">IGCSE</th>
                  <th className="text-center py-4 px-6 font-bold text-purple-600">O-Level</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, index) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="py-4 px-6 font-semibold text-gray-800">{row.feature}</td>
                    <td className={`text-center py-4 px-6 ${row.gcseBest ? 'bg-blue-50 font-semibold text-blue-800' : 'text-gray-700'}`}>
                      {row.gcse}
                      {row.gcseBest && <span className="ml-2">✨</span>}
                    </td>
                    <td className={`text-center py-4 px-6 ${row.igcseBest ? 'bg-emerald-50 font-semibold text-emerald-800' : 'text-gray-700'}`}>
                      {row.igcse}
                      {row.igcseBest && <span className="ml-2">✨</span>}
                    </td>
                    <td className={`text-center py-4 px-6 ${row.olevelBest ? 'bg-purple-50 font-semibold text-purple-800' : 'text-gray-700'}`}>
                      {row.olevel}
                      {row.olevelBest && <span className="ml-2">✨</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Subject Filter */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Subjects Available</h2>
            <p className="text-xl text-gray-600 mb-8">
              Filter by qualification to see available subjects and their key topics
            </p>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { id: 'all', name: 'All Subjects', color: 'from-gray-600 to-gray-800' },
                { id: 'gcse', name: 'GCSE Only', color: 'from-blue-500 to-blue-700' },
                { id: 'igcse', name: 'IGCSE Only', color: 'from-emerald-500 to-emerald-700' },
                { id: 'olevel', name: 'O-Level Only', color: 'from-purple-500 to-purple-700' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedLevel(filter.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedLevel === filter.id
                      ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Subjects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-6`}>
                  <subject.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{subject.name}</h3>
                <p className="text-gray-600 mb-6">{subject.description}</p>
                
                {/* Availability badges */}
                <div className="flex gap-2 mb-4">
                  {subject.availability.gcse && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      GCSE
                    </span>
                  )}
                  {subject.availability.igcse && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                      IGCSE
                    </span>
                  )}
                  {subject.availability.olevel && (
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                      O-Level
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                  <ul className="space-y-1">
                    {subject.topics.map((topic) => (
                      <li key={topic} className="text-sm text-gray-600 flex items-center">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {subject.popularity} popularity
                  </span>
                  <Link
                    href={`/courses?subject=${subject.name.toLowerCase()}`}
                    className="text-primary-600 hover:text-primary-700 font-semibold text-sm hover:underline"
                  >
                    View Courses →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Excel in Your Exams?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their target grades with our expert tutoring across GCSE, IGCSE, and O-Level qualifications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Learning Today
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-2xl font-semibold hover:bg-white/30 transition-all duration-300"
              >
                Book Free Trial
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
