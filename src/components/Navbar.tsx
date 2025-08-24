'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const navigationItems = [
  { name: 'GCSE/IGCSE/O-Level', href: '/gcse-igcse-o-level' },
  { name: 'A-Levels', href: '/a-levels' },
  { name: 'Mechanical Engineering', href: '/mechanical-engineering' },
  { name: 'Courses', href: '/courses' },
  // { name: 'Find Tutors', href: '/tutors' }, // Disabled temporarily
  { name: 'Video Lessons', href: '/video-lessons' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Help Center', href: '/help' },
]

const studyToolsResources = [
  {
    category: 'Learning Resources',
    icon: '📚',
    items: [
      { name: 'Learning Objectives', href: '/study-tools/objectives', description: 'Clear goals for each topic' },
      { name: 'Key Topics Overview', href: '/study-tools/topics', description: 'Essential concepts breakdown' },
      { name: 'Practice Areas', href: '/study-tools/practice', description: 'Focused skill development' },
      { name: 'Exam Tips', href: '/study-tools/exam-tips', description: 'Expert examination strategies' },
    ]
  },
  {
    category: 'Interactive Tools',
    icon: '🔧',
    items: [
      { name: 'Formula Bank', href: '/study-tools/formulas', description: 'All essential formulas' },
      { name: 'Common Mistakes', href: '/study-tools/mistakes', description: 'Learn from typical errors' },
      { name: 'Real-World Applications', href: '/study-tools/applications', description: 'Practical examples' },
      { name: 'Progress Tracker', href: '/study-tools/progress', description: 'Monitor your learning' },
    ]
  },
  {
    category: 'Practice & Assessment',
    icon: '✍️',
    items: [
      { name: 'Practice Questions', href: '/study-tools/questions', description: 'Graded difficulty levels' },
      { name: 'Mock Exams', href: '/study-tools/mocks', description: 'Full practice papers' },
      { name: 'Instant Feedback', href: '/study-tools/feedback', description: 'Detailed explanations' },
      { name: 'Performance Analytics', href: '/study-tools/analytics', description: 'Track your strengths' },
    ]
  }
]

const startLearningSubjects = [
  {
    category: 'Maths',
    subjects: [
      { name: 'Maths', href: '/subjects/maths' },
      { name: 'Additional Maths', href: '/subjects/additional-maths' },
      { name: 'Further Maths', href: '/subjects/further-maths' },
      { name: 'Statistics', href: '/subjects/statistics' },
    ]
  },
  {
    category: 'Science',
    subjects: [
      { name: 'Biology', href: '/subjects/biology' },
      { name: 'Chemistry', href: '/subjects/chemistry' },
      { name: 'Physics', href: '/subjects/physics' },
      { name: 'Combined Science', href: '/subjects/combined-science' },
    ]
  },
  {
    category: 'English',
    subjects: [
      { name: 'English Literature', href: '/subjects/english-literature' },
      { name: 'English Language', href: '/subjects/english-language' },
      { name: 'English Language & Literature', href: '/subjects/english-language-and-literature' },
    ]
  },
  {
    category: 'Humanities',
    subjects: [
      { name: 'Geography', href: '/subjects/geography' },
      { name: 'History', href: '/subjects/history' },
      { name: 'Psychology', href: '/subjects/psychology' },
      { name: 'Religious Studies', href: '/subjects/religious-studies' },
      { name: 'Sociology', href: '/subjects/sociology' },
    ]
  },
  {
    category: 'Business & Economics',
    subjects: [
      { name: 'Business', href: '/subjects/business' },
      { name: 'Economics', href: '/subjects/economics' },
      { name: 'Accounting', href: '/subjects/accounting' },
      { name: 'Business Management', href: '/subjects/business-management' },
    ]
  },
  {
    category: 'Computer Science',
    subjects: [
      { name: 'Computer Science', href: '/subjects/computer-science' },
      { name: 'ICT', href: '/subjects/ict' },
    ]
  }
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const [isStartLearningOpen, setIsStartLearningOpen] = useState(false)
  const [isStudyToolsOpen, setIsStudyToolsOpen] = useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleComingSoon = (feature: string) => {
    toast(`${feature} coming soon!`, {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    })
  }

  const handleOpenLogin = () => {
    setIsLoginModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleOpenSignup = () => {
    setIsSignupModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false)
    setIsSignupModalOpen(true)
  }

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false)
    setIsLoginModalOpen(true)
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-white shadow-sm border-b'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  TutorHub
                </span>
              </motion.div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {/* Start Learning Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsStartLearningOpen(!isStartLearningOpen)}
                  className="group relative text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center"
                >
                  Start Learning
                  <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isStartLearningOpen ? 'rotate-180' : ''}`} />
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
                
                <AnimatePresence>
                  {isStartLearningOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                      onMouseLeave={() => setIsStartLearningOpen(false)}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-2 gap-6">
                          {startLearningSubjects.map((category, index) => (
                            <div key={category.category}>
                              <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">
                                {category.category}
                              </h3>
                              <ul className="space-y-2">
                                {category.subjects.map((subject) => (
                                  <li key={subject.name}>
                                    <Link
                                      href={subject.href}
                                      className="text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-2 py-1 rounded-md block transition-all duration-200"
                                      onClick={() => setIsStartLearningOpen(false)}
                                    >
                                      {subject.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <Link
                            href="/subjects"
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center justify-center py-2 px-4 rounded-lg bg-primary-50 hover:bg-primary-100 transition-all duration-200"
                            onClick={() => setIsStartLearningOpen(false)}
                          >
                            View All Subjects →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Study Tools Dropdown */}
              <div className="relative">
                <motion.button
                  onClick={() => setIsStudyToolsOpen(!isStudyToolsOpen)}
                  className="group relative text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-200 flex items-center"
                >
                  Study Tools
                  <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isStudyToolsOpen ? 'rotate-180' : ''}`} />
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-secondary-600 to-accent-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.button>
                
                <AnimatePresence>
                  {isStudyToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-[480px] bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
                      onMouseLeave={() => setIsStudyToolsOpen(false)}
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 gap-6">
                          {studyToolsResources.map((category, index) => (
                            <div key={category.category}>
                              <div className="flex items-center mb-3">
                                <span className="text-lg mr-2">{category.icon}</span>
                                <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wider">
                                  {category.category}
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                {category.items.map((item) => (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group p-3 rounded-lg hover:bg-primary-50 transition-all duration-200 border border-transparent hover:border-primary-200"
                                    onClick={() => setIsStudyToolsOpen(false)}
                                  >
                                    <div className="text-sm font-medium text-gray-900 group-hover:text-primary-600 mb-1">
                                      {item.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {item.description}
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                          <Link
                            href="/study-tools"
                            className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center justify-center py-2 px-4 rounded-lg bg-primary-50 hover:bg-primary-100 transition-all duration-200"
                            onClick={() => setIsStudyToolsOpen(false)}
                          >
                            View All Study Tools →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group relative text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-all duration-200"
                >
                  {item.name}
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 origin-left ${
                      index === 0 ? 'bg-gradient-to-r from-primary-600 to-secondary-600' :
                      index === 1 ? 'bg-gradient-to-r from-secondary-600 to-accent-600' :
                      'bg-gradient-to-r from-accent-600 to-primary-600'
                    }`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Contact Options */}
            <div className="flex items-center space-x-2">
              <a 
                href="tel:+447446255033" 
                className="flex items-center text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-blue-50 border border-blue-200 hover:border-blue-300"
              >
                📞 Call
              </a>
              <a 
                href="https://wa.me/447446255033" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-green-50 border border-green-200 hover:border-green-300"
              >
                💬 WhatsApp
              </a>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenLogin}
              className="text-gray-700 hover:text-primary-600 px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-primary-50"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenSignup}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Sign Up
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Start Learning Mobile Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <button
                  onClick={() => setIsStartLearningOpen(!isStartLearningOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 py-2 text-base font-medium transition-colors"
                >
                  Start Learning
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isStartLearningOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isStartLearningOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 space-y-3 border-l-2 border-primary-200 ml-2"
                    >
                      {startLearningSubjects.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                            {category.category}
                          </h4>
                          {category.subjects.map((subject) => (
                            <Link
                              key={subject.name}
                              href={subject.href}
                              className="block text-sm text-gray-600 hover:text-primary-600 py-1 transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setIsStartLearningOpen(false)
                              }}
                            >
                              {subject.name}
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link
                        href="/subjects"
                        className="block text-sm font-medium text-primary-600 hover:text-primary-700 py-2 px-3 rounded-lg bg-primary-50 text-center transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsStartLearningOpen(false)
                        }}
                      >
                        View All Subjects →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Study Tools Mobile Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <button
                  onClick={() => setIsStudyToolsOpen(!isStudyToolsOpen)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-primary-600 py-2 text-base font-medium transition-colors"
                >
                  Study Tools
                  <ChevronDownIcon className={`h-5 w-5 transition-transform duration-200 ${isStudyToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isStudyToolsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 space-y-3 border-l-2 border-secondary-200 ml-2"
                    >
                      {studyToolsResources.map((category) => (
                        <div key={category.category} className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-sm mr-2">{category.icon}</span>
                            <h4 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
                              {category.category}
                            </h4>
                          </div>
                          {category.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block text-sm text-gray-600 hover:text-primary-600 py-1 transition-colors"
                              onClick={() => {
                                setIsMobileMenuOpen(false)
                                setIsStudyToolsOpen(false)
                              }}
                            >
                              {item.name}
                              <span className="text-xs text-gray-400 block">{item.description}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                      <Link
                        href="/study-tools"
                        className="block text-sm font-medium text-primary-600 hover:text-primary-700 py-2 px-3 rounded-lg bg-primary-50 text-center transition-colors"
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setIsStudyToolsOpen(false)
                        }}
                      >
                        View All Study Tools →
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index + 2) * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-primary-600 py-2 text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {/* Contact Options */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <a 
                    href="tel:+447446255033" 
                    className="flex items-center justify-center bg-blue-100 text-blue-700 hover:bg-blue-200 py-3 px-4 rounded-lg text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    📞 Call Us: +44 7446 255033
                  </a>
                  <a 
                    href="https://wa.me/447446255033" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-green-100 text-green-700 hover:bg-green-200 py-3 px-4 rounded-lg text-base font-medium transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    💬 WhatsApp: +44 7446 255033
                  </a>
                </motion.div>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={handleOpenLogin}
                  className="block w-full text-left text-gray-700 hover:text-primary-600 py-2 text-base font-medium transition-colors"
                >
                  Login
                </motion.button>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleOpenSignup}
                  className="block w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-base font-medium transition-colors text-center"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Authentication Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
      />
      
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </motion.nav>
  )
}
