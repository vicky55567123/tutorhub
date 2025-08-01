'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  AcademicCapIcon,
  LightBulbIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  BeakerIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  GlobeAltIcon,
  ChartPieIcon,
  DocumentTextIcon,
  ClockIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const studyToolCategories = [
  {
    title: 'Learning Resources',
    icon: BookOpenIcon,
    color: 'from-blue-500 to-blue-600',
    tools: [
      {
        name: 'Learning Objectives',
        description: 'Clear, specific goals for every topic and subtopic',
        href: '/study-tools/objectives',
        icon: AcademicCapIcon,
        features: ['Topic-specific goals', 'Progress tracking', 'Skill development', 'Achievement badges']
      },
      {
        name: 'Key Topics Overview',
        description: 'Essential concepts breakdown for every subject',
        href: '/study-tools/topics',
        icon: DocumentTextIcon,
        features: ['Concept summaries', 'Visual diagrams', 'Prerequisites', 'Learning pathways']
      },
      {
        name: 'Practice Areas',
        description: 'Focused skill development zones',
        href: '/study-tools/practice',
        icon: ClipboardDocumentCheckIcon,
        features: ['Skill-based practice', 'Difficulty levels', 'Instant feedback', 'Progress reports']
      },
      {
        name: 'Exam Tips',
        description: 'Expert examination strategies and techniques',
        href: '/study-tools/exam-tips',
        icon: LightBulbIcon,
        features: ['Time management', 'Question analysis', 'Mark schemes', 'Common patterns']
      }
    ]
  },
  {
    title: 'Interactive Tools',
    icon: BeakerIcon,
    color: 'from-green-500 to-green-600',
    tools: [
      {
        name: 'Formula Bank',
        description: 'Comprehensive collection of all essential formulas',
        href: '/study-tools/formulas',
        icon: ChartBarIcon,
        features: ['Subject organized', 'Quick search', 'Examples included', 'Memory aids']
      },
      {
        name: 'Common Mistakes',
        description: 'Learn from typical errors and misconceptions',
        href: '/study-tools/mistakes',
        icon: ExclamationTriangleIcon,
        features: ['Error analysis', 'Correction guides', 'Prevention tips', 'Understanding gaps']
      },
      {
        name: 'Real-World Applications',
        description: 'See how concepts apply in real situations',
        href: '/study-tools/applications',
        icon: GlobeAltIcon,
        features: ['Career connections', 'Industry examples', 'Current events', 'Practical uses']
      },
      {
        name: 'Progress Tracker',
        description: 'Monitor your learning journey and achievements',
        href: '/study-tools/progress',
        icon: ChartPieIcon,
        features: ['Visual progress', 'Strength analysis', 'Goal setting', 'Performance trends']
      }
    ]
  },
  {
    title: 'Practice & Assessment',
    icon: ClockIcon,
    color: 'from-purple-500 to-purple-600',
    tools: [
      {
        name: 'Practice Questions',
        description: 'Graded difficulty levels with instant feedback',
        href: '/study-tools/questions',
        icon: DocumentTextIcon,
        features: ['Easy to Hard levels', 'Detailed explanations', 'Topic sorting', 'Timed practice']
      },
      {
        name: 'Mock Exams',
        description: 'Full practice papers in exam conditions',
        href: '/study-tools/mocks',
        icon: ClipboardDocumentCheckIcon,
        features: ['Exam timing', 'Grade boundaries', 'Performance analysis', 'Marking schemes']
      },
      {
        name: 'Instant Feedback',
        description: 'Immediate detailed explanations for all answers',
        href: '/study-tools/feedback',
        icon: LightBulbIcon,
        features: ['Step-by-step solutions', 'Common mistakes', 'Alternative methods', 'Mark allocation']
      },
      {
        name: 'Performance Analytics',
        description: 'Track strengths, weaknesses, and improvement areas',
        href: '/study-tools/analytics',
        icon: ChartBarIcon,
        features: ['Strength mapping', 'Weakness identification', 'Study recommendations', 'Progress graphs']
      }
    ]
  }
]

const featuredTools = [
  {
    name: 'Smart Practice Generator',
    description: 'AI-powered questions based on your learning gaps',
    href: '/study-tools/smart-practice',
    icon: '🤖',
    badge: 'NEW'
  },
  {
    name: 'Study Planner',
    description: 'Personalized revision timetables for your exams',
    href: '/study-tools/planner',
    icon: '📅',
    badge: 'POPULAR'
  },
  {
    name: 'Concept Maps',
    description: 'Visual learning with interactive topic connections',
    href: '/study-tools/concept-maps',
    icon: '🗺️',
    badge: 'FEATURED'
  },
  {
    name: 'Flashcards',
    description: 'Spaced repetition system for better memory retention',
    href: '/study-tools/flashcards',
    icon: '📚',
    badge: 'EFFECTIVE'
  }
]

const subjectStats = [
  { subject: 'Mathematics', tools: 45, users: '25,000+' },
  { subject: 'Science', tools: 38, users: '22,000+' },
  { subject: 'English', tools: 28, users: '18,000+' },
  { subject: 'Humanities', tools: 32, users: '15,000+' },
]

export default function StudyToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Study Tools
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive learning resources designed to maximize your study efficiency. 
              From interactive practice questions to detailed progress tracking, everything you need to excel.
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              {subjectStats.map((stat, index) => (
                <motion.div
                  key={stat.subject}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-200"
                >
                  <div className="text-lg font-bold text-gray-900">{stat.subject}</div>
                  <div className="text-sm text-gray-600">{stat.tools} tools • {stat.users} users</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              Featured Study Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTools.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
                >
                  <Link href={tool.href}>
                    <div className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
                      {tool.badge && (
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {tool.badge}
                        </div>
                      )}
                      <div className="text-4xl mb-4">{tool.icon}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
              Study Tool Categories
            </h2>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {studyToolCategories.map((category, index) => (
                <button
                  key={category.title}
                  onClick={() => setSelectedCategory(index)}
                  className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedCategory === index
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  {React.createElement(category.icon, { 
                    className: "h-5 w-5 mr-2" 
                  })}
                  {category.title}
                </button>
              ))}
            </div>

            {/* Selected Category Content */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Category Header */}
              <div className={`bg-gradient-to-r ${studyToolCategories[selectedCategory].color} p-6`}>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    {React.createElement(studyToolCategories[selectedCategory].icon, { 
                      className: "h-8 w-8 text-white" 
                    })}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{studyToolCategories[selectedCategory].title}</h3>
                    <p className="text-white/80 text-sm">
                      {studyToolCategories[selectedCategory].tools.length} tools available
                    </p>
                  </div>
                </div>
              </div>

              {/* Tools Grid */}
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {studyToolCategories[selectedCategory].tools.map((tool, toolIndex) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: toolIndex * 0.1, duration: 0.5 }}
                    >
                      <Link href={tool.href}>
                        <div className="group p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50">
                          <div className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                              {React.createElement(tool.icon, { 
                                className: "h-6 w-6 text-blue-600" 
                              })}
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 mb-2 transition-colors">
                                {tool.name}
                              </h4>
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {tool.description}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {tool.features.map((feature) => (
                                  <div key={feature} className="flex items-center text-xs text-gray-500">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></div>
                                    {feature}
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                                Explore Tool
                                <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center"
          >
            <AcademicCapIcon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Supercharge Your Learning?
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students using our study tools to improve their grades and build confidence. 
              Start with our most popular tools and see the difference!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/study-tools/smart-practice">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Try Smart Practice
                </motion.button>
              </Link>
              <Link href="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 hover:border-blue-300 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Browse Courses
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
