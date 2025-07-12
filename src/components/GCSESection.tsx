'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  AcademicCapIcon, 
  BeakerIcon, 
  CalculatorIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid'

const gcseSubjects = [
  {
    name: 'GCSE Mathematics',
    icon: CalculatorIcon,
    description: 'Master algebra, geometry, statistics, and problem-solving techniques',
    features: ['Number & Algebra', 'Geometry & Measures', 'Statistics & Probability', 'Problem Solving'],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    borderColor: 'border-blue-200'
  },
  {
    name: 'GCSE Physics',
    icon: ChartBarIcon,
    description: 'Explore forces, energy, waves, electricity, and the universe',
    features: ['Mechanics & Forces', 'Energy & Power', 'Waves & Sound', 'Electricity & Magnetism'],
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    borderColor: 'border-purple-200'
  },
  {
    name: 'GCSE Chemistry',
    icon: BeakerIcon,
    description: 'Understand atomic structure, chemical reactions, and organic chemistry',
    features: ['Atomic Structure', 'Chemical Reactions', 'Organic Chemistry', 'Chemical Analysis'],
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    borderColor: 'border-green-200'
  },
  {
    name: 'GCSE Biology',
    icon: AcademicCapIcon,
    description: 'Study living organisms, genetics, evolution, and ecosystems',
    features: ['Cell Biology', 'Human Biology', 'Genetics & Evolution', 'Ecology & Environment'],
    color: 'from-orange-500 to-orange-700',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-800',
    borderColor: 'border-orange-200'
  },
  {
    name: 'GCSE Computer Science',
    icon: ComputerDesktopIcon,
    description: 'Learn programming, algorithms, data structures, and computational thinking',
    features: ['Programming & Algorithms', 'Data Structures', 'Computer Systems', 'Software Development'],
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    borderColor: 'border-indigo-200'
  }
]

const gcseFeatures = [
  'Experienced GCSE-qualified tutors',
  'Exam-focused learning strategies',
  'Practice papers and mock exams',
  'Grades 4-9 achievement targets',
  'AQA, Edexcel, OCR exam boards',
  'Flexible online or in-person sessions'
]

export default function GCSESection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-8 border border-blue-200"
          >
            🎓 GCSE Excellence Programme
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Master Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
              GCSE Subjects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert tutoring for all major GCSE subjects. Our qualified tutors help you achieve grades 4-9 
            with personalized learning plans and exam-focused strategies.
          </p>
        </motion.div>

        {/* GCSE Subjects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {gcseSubjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`${subject.bgColor} ${subject.borderColor} border-2 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${subject.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <subject.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className={`text-2xl font-bold ${subject.textColor} mb-4`}>
                {subject.name}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {subject.description}
              </p>
              
              <div className="space-y-3">
                {subject.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckCircleIcon className={`w-5 h-5 ${subject.textColor} mr-3 flex-shrink-0`} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Link
                  href="/courses"
                  className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${subject.color} text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
                >
                  Find Tutors
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

        {/* GCSE Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  GCSE Tutoring?
                </span>
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our GCSE tutoring programme is designed specifically for students aiming to achieve their best possible grades. 
                With experienced tutors and proven methodologies, we ensure success.
              </p>
              <Link
                href="/tutors"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Book a Free Consultation
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
              {gcseFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100"
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
  )
}
