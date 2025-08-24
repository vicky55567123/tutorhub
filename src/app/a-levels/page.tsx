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
  ChartBarIcon,
  CubeIcon
} from '@heroicons/react/24/outline'

const aLevelSubjects = [
  {
    name: 'A-Level Mathematics',
    icon: CalculatorIcon,
    description: 'Advanced Pure Mathematics, Statistics, and Mechanics',
    modules: ['Pure Mathematics', 'Statistics', 'Mechanics', 'Decision Mathematics'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'MEI'],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    name: 'A-Level Physics',
    icon: ChartBarIcon,
    description: 'Advanced Physics covering Mechanics, Thermodynamics, and Quantum Physics',
    modules: ['Mechanics', 'Materials', 'Waves', 'Electricity', 'Further Mechanics', 'Thermal Physics'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  {
    name: 'A-Level Chemistry',
    icon: BeakerIcon,
    description: 'Advanced Chemistry including Organic, Inorganic, and Physical Chemistry',
    modules: ['Physical Chemistry', 'Inorganic Chemistry', 'Organic Chemistry', 'Practical Skills'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  {
    name: 'A-Level Biology',
    icon: AcademicCapIcon,
    description: 'Advanced Biology covering Molecular Biology, Ecology, and Evolution',
    modules: ['Biological Molecules', 'Cells', 'Organisms Exchange', 'Genetic Information', 'Energy Transfers', 'Organisms Respond'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  },
  {
    name: 'A-Level Computer Science',
    icon: ComputerDesktopIcon,
    description: 'Advanced Programming, Algorithms, and Computer Systems',
    modules: ['Programming', 'Data Structures', 'Algorithms', 'Computer Systems', 'Software Engineering', 'Databases'],
    examBoards: ['AQA', 'Edexcel', 'OCR'],
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200'
  },
  {
    name: 'A-Level Further Mathematics',
    icon: CubeIcon,
    description: 'Advanced Mathematical Topics and Complex Problem Solving',
    modules: ['Further Pure', 'Further Mechanics', 'Further Statistics', 'Decision Mathematics'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'MEI'],
    color: 'from-cyan-500 to-cyan-700',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-800',
    borderColor: 'border-cyan-200'
  }
]

const features = [
  'University-qualified A-Level specialists',
  'Exam board specific preparation',
  'University admission guidance',
  'Past paper practice and marking',
  'Individual study plans',
  'Online and in-person options'
]

const stats = [
  { label: 'A-Level Students', value: '8,500+', icon: UserGroupIcon },
  { label: 'Average Grade Improvement', value: '1.8 Grades', icon: StarIcon },
  { label: 'A*-B Achievement Rate', value: '89%', icon: CheckCircleIcon },
  { label: 'University Acceptance', value: '94%', icon: AcademicCapIcon }
]

const universityPartners = [
  'Oxford University',
  'Cambridge University',
  'Imperial College London',
  'University College London',
  'London School of Economics',
  'King\'s College London'
]

export default function ALevelsPage() {
  const [selectedSubject, setSelectedSubject] = useState('Mathematics')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
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
              <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl">
                <AcademicCapIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                A-Levels
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Excel in your A-Level studies with expert tutoring and comprehensive support. 
              Achieve A*-B grades and secure your place at top universities with our proven methods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses?category=A-Level"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Browse A-Level Courses
              </Link>
              <Link
                href="/tutors?level=A-Level"
                className="px-8 py-4 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:border-purple-300 transition-all duration-300"
              >
                Find A-Level Tutors
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
                <stat.icon className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* A-Level Subjects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">A-Level Subjects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master advanced topics with our specialist A-Level tutors and comprehensive resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aLevelSubjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${subject.bgColor} ${subject.borderColor} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
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
                
                <div className="mb-4">
                  <h4 className={`font-semibold ${subject.textColor} mb-2`}>Key Modules:</h4>
                  <div className="grid grid-cols-2 gap-1">
                    {subject.modules.slice(0, 4).map((module, moduleIndex) => (
                      <div key={moduleIndex} className="flex items-center">
                        <CheckCircleIcon className={`w-3 h-3 ${subject.textColor} mr-1 flex-shrink-0`} />
                        <span className="text-gray-700 text-xs">{module}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className={`font-semibold ${subject.textColor} mb-2`}>Exam Boards:</h4>
                  <p className="text-gray-600 text-sm">{subject.examBoards.join(', ')}</p>
                </div>
                
                <div className="mt-6">
                  <Link
                    href={`/subjects/${subject.name.toLowerCase().replace('a-level ', '').replace(' ', '-')}`}
                    className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${subject.color} text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm`}
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

      {/* University Partners */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">University Success Stories</h3>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Our A-Level students have gained admission to top universities worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {universityPartners.map((university, index) => (
                <motion.div
                  key={university}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <p className="font-semibold text-white">{university}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
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
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    A-Level Programme?
                  </span>
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our comprehensive A-Level tutoring programme is designed to help students achieve 
                  their highest potential and secure places at their dream universities.
                </p>
                <Link
                  href="/courses?category=A-Level"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Start Your A-Level Journey
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
                    className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-purple-600 mr-4 flex-shrink-0" />
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
