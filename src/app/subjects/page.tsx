'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  AcademicCapIcon,
  BeakerIcon, 
  CalculatorIcon,
  BookOpenIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const subjectCategories = [
  {
    category: 'Maths',
    icon: CalculatorIcon,
    color: 'from-blue-500 to-blue-600',
    subjects: [
      { name: 'Maths', description: 'Core mathematics covering algebra, geometry, statistics, and calculus', href: '/subjects/maths' },
      { name: 'Additional Maths', description: 'Advanced mathematical concepts beyond core curriculum', href: '/subjects/additional-maths' },
      { name: 'Further Maths', description: 'Higher-level mathematics for university preparation', href: '/subjects/further-maths' },
      { name: 'Statistics', description: 'Data analysis, probability, and statistical methods', href: '/subjects/statistics' },
    ]
  },
  {
    category: 'Science',
    icon: BeakerIcon,
    color: 'from-green-500 to-green-600',
    subjects: [
      { name: 'Biology', description: 'Living organisms, genetics, ecology, and human biology', href: '/subjects/biology' },
      { name: 'Chemistry', description: 'Chemical reactions, atomic structure, and organic chemistry', href: '/subjects/chemistry' },
      { name: 'Physics', description: 'Forces, energy, waves, electricity, and modern physics', href: '/subjects/physics' },
      { name: 'Combined Science', description: 'Integrated science covering biology, chemistry, and physics', href: '/subjects/combined-science' },
    ]
  },
  {
    category: 'English',
    icon: BookOpenIcon,
    color: 'from-purple-500 to-purple-600',
    subjects: [
      { name: 'English Literature', description: 'Analysis of poetry, prose, and drama from various periods', href: '/subjects/english-literature' },
      { name: 'English Language', description: 'Language skills, creative writing, and communication', href: '/subjects/english-language' },
      { name: 'English Language & Literature', description: 'Combined study of language skills and literary analysis', href: '/subjects/english-language-and-literature' },
    ]
  },
  {
    category: 'Humanities',
    icon: GlobeAltIcon,
    color: 'from-orange-500 to-orange-600',
    subjects: [
      { name: 'Geography', description: 'Physical and human geography, environmental studies', href: '/subjects/geography' },
      { name: 'History', description: 'Historical events, periods, and analytical skills', href: '/subjects/history' },
      { name: 'Psychology', description: 'Human behavior, cognitive processes, and mental health', href: '/subjects/psychology' },
      { name: 'Religious Studies', description: 'World religions, ethics, and philosophical concepts', href: '/subjects/religious-studies' },
      { name: 'Sociology', description: 'Social structures, institutions, and human society', href: '/subjects/sociology' },
    ]
  },
  {
    category: 'Business & Economics',
    icon: BuildingOfficeIcon,
    color: 'from-red-500 to-red-600',
    subjects: [
      { name: 'Business', description: 'Business operations, marketing, finance, and entrepreneurship', href: '/subjects/business' },
      { name: 'Economics', description: 'Economic theory, markets, and government policy', href: '/subjects/economics' },
      { name: 'Accounting', description: 'Financial accounting, management accounting, and auditing', href: '/subjects/accounting' },
      { name: 'Business Management', description: 'Leadership, strategy, and organizational behavior', href: '/subjects/business-management' },
    ]
  },
  {
    category: 'Computer Science',
    icon: ComputerDesktopIcon,
    color: 'from-indigo-500 to-indigo-600',
    subjects: [
      { name: 'Computer Science', description: 'Programming, algorithms, data structures, and software engineering', href: '/subjects/computer-science' },
      { name: 'ICT', description: 'Information technology, digital literacy, and computer applications', href: '/subjects/ict' },
    ]
  }
]

const examLevels = [
  { name: 'GCSE', description: 'General Certificate of Secondary Education' },
  { name: 'IGCSE', description: 'International General Certificate of Secondary Education' },
  { name: 'A Level', description: 'Advanced Level qualifications' },
  { name: 'AS Level', description: 'Advanced Subsidiary Level qualifications' },
  { name: 'IB', description: 'International Baccalaureate Diploma Programme' },
  { name: 'O Level', description: 'Ordinary Level qualifications' },
  { name: 'AP', description: 'Advanced Placement courses' },
]

export default function SubjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                All Subjects
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Our extensive collection of resources is tailor-made for students aiming to excel in their exams. 
              Find revision notes, practice questions, and expert guidance across all major subjects.
            </p>
            
            {/* Exam Levels */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {examLevels.map((level, index) => (
                <motion.div
                  key={level.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  <div className="bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl px-4 py-2 transition-all duration-300 shadow-sm hover:shadow-md">
                    <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">
                      {level.name}
                    </span>
                  </div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {level.description}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12">
            {subjectCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIndex * 0.2, duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
              >
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-6`}>
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{category.category}</h2>
                      <p className="text-white/80 text-sm">
                        {category.subjects.length} subjects available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.subjects.map((subject, subjectIndex) => (
                      <motion.div
                        key={subject.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (categoryIndex * 0.2) + (subjectIndex * 0.1), duration: 0.5 }}
                      >
                        <Link href={subject.href}>
                          <div className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50">
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
                              {subject.name}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {subject.description}
                            </p>
                            <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                              Explore {subject.name}
                              <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12">
              <AcademicCapIcon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of students who have improved their grades with our comprehensive study resources. 
                Start your learning journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse All Courses
                  </motion.button>
                </Link>
                <Link href="/video-lessons">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-blue-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    Watch Video Lessons
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
