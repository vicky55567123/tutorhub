'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { 
  AcademicCapIcon, 
  BookOpenIcon, 
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  StarIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  PuzzlePieceIcon,
  LightBulbIcon,
  TrophyIcon
} from '@heroicons/react/24/outline'

const examLevels = [
  {
    id: 'gcse',
    name: 'GCSE',
    description: 'General Certificate of Secondary Education',
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    grades: '1-9',
    color: 'from-blue-500 to-indigo-600',
    icon: AcademicCapIcon,
    popular: true
  },
  {
    id: 'igcse',
    name: 'IGCSE',
    description: 'International General Certificate of Secondary Education',
    examBoards: ['CIE', 'Edexcel'],
    grades: 'A*-G',
    color: 'from-purple-500 to-pink-600',
    icon: GlobeAltIcon,
    popular: true
  },
  {
    id: 'a-level',
    name: 'A Level',
    description: 'Advanced Level qualifications',
    examBoards: ['AQA', 'Edexcel', 'OCR', 'CIE'],
    grades: 'A*-E',
    color: 'from-green-500 to-emerald-600',
    icon: TrophyIcon,
    popular: true
  },
  {
    id: 'as-level',
    name: 'AS Level',
    description: 'Advanced Subsidiary Level',
    examBoards: ['AQA', 'Edexcel', 'OCR'],
    grades: 'A-E',
    color: 'from-yellow-500 to-orange-600',
    icon: BookOpenIcon,
    popular: false
  },
  {
    id: 'ib',
    name: 'IB',
    description: 'International Baccalaureate',
    examBoards: ['IBO'],
    grades: '1-7',
    color: 'from-cyan-500 to-blue-600',
    icon: GlobeAltIcon,
    popular: true
  },
  {
    id: 'o-level',
    name: 'O Level',
    description: 'Ordinary Level',
    examBoards: ['CIE'],
    grades: 'A*-G',
    color: 'from-red-500 to-pink-600',
    icon: DocumentTextIcon,
    popular: false
  },
  {
    id: 'ap',
    name: 'AP',
    description: 'Advanced Placement',
    examBoards: ['College Board'],
    grades: '1-5',
    color: 'from-indigo-500 to-purple-600',
    icon: ChartBarIcon,
    popular: false
  }
]

const subjects = {
  maths: {
    name: 'Mathematics',
    icon: '🧮',
    courses: [
      'Maths: Foundation',
      'Maths: Higher', 
      'Further Maths',
      'Additional Maths',
      'Statistics: Foundation',
      'Statistics: Higher',
      'Pure Mathematics',
      'Applied Mathematics'
    ]
  },
  science: {
    name: 'Sciences',
    icon: '🔬',
    courses: [
      'Biology',
      'Chemistry', 
      'Physics',
      'Combined Science',
      'Combined Science: Trilogy',
      'Combined Science A (Gateway)',
      'Science (Double Award)',
      'Environmental Science',
      'Applied Science'
    ]
  },
  english: {
    name: 'English',
    icon: '📚',
    courses: [
      'English Language',
      'English Literature',
      'English Language & Literature',
      'English Language: Paper 1',
      'English Language: Paper 2',
      'Creative Writing',
      'Language Analysis'
    ]
  },
  humanities: {
    name: 'Humanities',
    icon: '🏛️',
    courses: [
      'History',
      'Geography',
      'Religious Studies',
      'Psychology',
      'Sociology',
      'Philosophy',
      'Classical Civilization',
      'Archaeology'
    ]
  },
  business: {
    name: 'Business & Economics',
    icon: '💼',
    courses: [
      'Business Studies',
      'Economics',
      'Business Management',
      'Accounting',
      'Economics A',
      'Entrepreneurship',
      'Finance',
      'Marketing'
    ]
  },
  computer: {
    name: 'Computer Science',
    icon: '💻',
    courses: [
      'Computer Science',
      'ICT',
      'Information Technology',
      'Digital Technology',
      'Programming',
      'Software Development',
      'Data Science'
    ]
  },
  languages: {
    name: 'Modern Languages',
    icon: '🌍',
    courses: [
      'French',
      'Spanish',
      'German',
      'Italian',
      'Chinese',
      'Arabic',
      'Portuguese',
      'Russian'
    ]
  },
  arts: {
    name: 'Creative Arts',
    icon: '🎨',
    courses: [
      'Art & Design',
      'Music',
      'Drama',
      'Media Studies',
      'Film Studies',
      'Photography',
      'Dance',
      'Textiles'
    ]
  },
  practical: {
    name: 'Practical Subjects',
    icon: '🔧',
    courses: [
      'Design & Technology',
      'Food Preparation & Nutrition',
      'Physical Education',
      'Health & Social Care',
      'Hospitality & Catering',
      'Engineering',
      'Construction'
    ]
  }
}

const studyTools = [
  {
    name: 'Revision Notes',
    description: 'Expert-written notes covering exactly what you need to know',
    icon: DocumentTextIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Practice Questions',
    description: 'Exam-style questions organized by topic and difficulty',
    icon: PuzzlePieceIcon,
    color: 'bg-green-500'
  },
  {
    name: 'Past Papers',
    description: 'Complete collection of past exam papers with mark schemes',
    icon: BookOpenIcon,
    color: 'bg-purple-500'
  },
  {
    name: 'Video Lessons',
    description: 'Interactive video tutorials and live tutoring sessions',
    icon: ClockIcon,
    color: 'bg-red-500'
  },
  {
    name: 'Mock Exams',
    description: 'Full-length practice exams with instant feedback',
    icon: CheckCircleIcon,
    color: 'bg-yellow-500'
  },
  {
    name: 'Progress Tracking',
    description: 'Monitor your progress and identify areas for improvement',
    icon: ChartBarIcon,
    color: 'bg-indigo-500'
  }
]

export default function StartLearningSection() {
  const [selectedLevel, setSelectedLevel] = useState('gcse')
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Learning Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose your exam level and subject to access comprehensive revision resources, 
            practice questions, and expert guidance tailored to your specific curriculum.
          </p>
        </motion.div>

        {/* Study Tools Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Everything You Need to Excel
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studyTools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className={`${tool.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <tool.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{tool.name}</h4>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Exam Levels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Choose Your Exam Level
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {examLevels.map((level) => (
              <motion.button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  selectedLevel === level.id
                    ? `bg-gradient-to-br ${level.color} text-white shadow-lg`
                    : 'bg-white hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {level.popular && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Popular
                  </div>
                )}
                <level.icon className={`h-8 w-8 mx-auto mb-2 ${
                  selectedLevel === level.id ? 'text-white' : 'text-gray-600'
                }`} />
                <h4 className="font-semibold text-sm mb-1">{level.name}</h4>
                <p className={`text-xs ${
                  selectedLevel === level.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {level.grades}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Level Info */}
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {(() => {
              const level = examLevels.find(l => l.id === selectedLevel)
              if (!level) return null
              return (
                <div className={`bg-gradient-to-br ${level.color} rounded-xl p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <level.icon className="h-12 w-12" />
                    <div>
                      <h3 className="text-2xl font-bold">{level.name}</h3>
                      <p className="text-white/80">{level.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Grade Range</p>
                      <p className="font-semibold">{level.grades}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Exam Boards</p>
                      <p className="font-semibold">{level.examBoards.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}

        {/* Subjects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Select Your Subject
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(subjects).map(([key, subject], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedSubject === key ? 'border-blue-500' : 'border-transparent'
                }`}
                onClick={() => setSelectedSubject(selectedSubject === key ? null : key)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{subject.icon}</div>
                  <div>
                    <h4 className="text-lg font-semibold">{subject.name}</h4>
                    <p className="text-gray-500 text-sm">{subject.courses.length} courses available</p>
                  </div>
                </div>
                
                {selectedSubject === key && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="border-t pt-4 mt-4"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {subject.courses.slice(0, 6).map((course) => (
                        <div key={course} className="flex items-center gap-2">
                          <CheckCircleIcon className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{course}</span>
                        </div>
                      ))}
                      {subject.courses.length > 6 && (
                        <p className="text-sm text-gray-500 mt-2">
                          +{subject.courses.length - 6} more courses
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Most Popular Courses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'GCSE Mathematics AQA',
              'A Level Biology CIE', 
              'GCSE Physics Edexcel',
              'A Level Chemistry AQA',
              'GCSE English Literature',
              'A Level Psychology',
              'GCSE Computer Science',
              'A Level Economics'
            ].map((course, index) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{course}</h4>
                    <div className="flex items-center gap-1">
                      <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-500">4.9 (2k+ reviews)</span>
                    </div>
                  </div>
                  <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have improved their grades with our expert-created resources. 
              Start your free trial today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse All Courses
              </Link>
              <Link
                href="/video-lessons"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Try Video Lessons
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
