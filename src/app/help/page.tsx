'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  VideoCameraIcon,
  CreditCardIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  BookOpenIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import { 
  AcademicCapIcon as AcademicCapIconSolid,
  VideoCameraIcon as VideoCameraIconSolid,
  StarIcon
} from '@heroicons/react/24/solid'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

interface HelpCategory {
  id: string
  title: string
  description: string
  icon: any
  articles: { title: string; content: string }[]
}

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const categories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using TutorHub',
      icon: AcademicCapIconSolid,
      articles: [
        {
          title: 'Creating Your Account',
          content: 'Sign up with Google or create a new account. Complete your profile with your educational background and learning goals.'
        },
        {
          title: 'Choosing Your Courses',
          content: 'Browse our comprehensive course catalog covering Mathematics, Sciences, Computer Science, and more. Each course is designed with detailed subtopics.'
        },
        {
          title: 'Navigating the Dashboard',
          content: 'Your dashboard shows your enrolled courses, upcoming video lessons, and progress tracking.'
        }
      ]
    },
    {
      id: 'courses',
      title: 'Courses & Learning',
      description: 'Everything about our courses and learning materials',
      icon: BookOpenIcon,
      articles: [
        {
          title: 'Course Structure',
          content: 'Each course is divided into subtopics with comprehensive content, examples, and practice questions following SaveMyExams methodology.'
        },
        {
          title: 'GCSE Preparation',
          content: 'Our GCSE courses cover all major subjects with exam-style questions, worked solutions, and revision notes.'
        },
        {
          title: 'Progress Tracking',
          content: 'Track your learning progress through each subtopic and monitor your understanding with built-in assessments.'
        }
      ]
    },
    {
      id: 'video-lessons',
      title: 'HD Video Lessons',
      description: 'How to schedule and join video tutoring sessions',
      icon: VideoCameraIconSolid,
      articles: [
        {
          title: 'Scheduling a Video Lesson',
          content: 'Click "Schedule Lesson" to book a 1-on-1 session with expert tutors. Choose your preferred time, subject, and duration.'
        },
        {
          title: 'Joining Your Session',
          content: 'Join sessions directly through Google Meet links. Ensure you have a stable internet connection and working camera/microphone.'
        },
        {
          title: 'Video Lesson Features',
          content: 'Our HD video lessons include screen sharing, whiteboard functionality, session recording, and real-time collaboration tools.'
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Payments',
      description: 'Payment methods, subscriptions, and billing questions',
      icon: CreditCardIcon,
      articles: [
        {
          title: 'Subscription Plans',
          content: 'Choose from our flexible subscription plans. All plans include unlimited access to course content and video lesson scheduling.'
        },
        {
          title: 'Payment Methods',
          content: 'We accept all major credit cards and use secure payment processing. Your payment information is encrypted and protected.'
        },
        {
          title: 'Refund Policy',
          content: 'We offer a 14-day money-back guarantee. Contact support if you\'re not satisfied with your learning experience.'
        }
      ]
    }
  ]

  const faqs: FAQItem[] = [
    {
      id: '1',
      question: 'How do I sign up for TutorHub?',
      answer: 'You can sign up using your Google account for quick access, or create a new account with your email. After signing up, complete your profile to get personalized course recommendations.',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'What subjects do you offer?',
      answer: 'We offer comprehensive courses in Mathematics (Algebra, Calculus, Statistics), Sciences (Physics, Chemistry, Biology), Computer Science (Programming, Data Structures), and more. All courses follow proven educational methodologies.',
      category: 'courses'
    },
    {
      id: '3',
      question: 'How do video lessons work?',
      answer: 'Video lessons are 1-on-1 sessions with expert tutors via Google Meet. You can schedule sessions, choose your preferred tutor, and access features like screen sharing and whiteboard collaboration.',
      category: 'video-lessons'
    },
    {
      id: '4',
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your current billing period.',
      category: 'billing'
    },
    {
      id: '5',
      question: 'Are the courses suitable for GCSE preparation?',
      answer: 'Absolutely! Our courses are specifically designed for GCSE preparation with exam-style questions, worked solutions, and comprehensive coverage of all topics.',
      category: 'courses'
    },
    {
      id: '6',
      question: 'What equipment do I need for video lessons?',
      answer: 'You need a device with internet access, a working camera and microphone. We recommend using a computer or tablet for the best experience with our interactive tools.',
      category: 'video-lessons'
    },
    {
      id: '7',
      question: 'How do I schedule a video lesson?',
      answer: 'Go to the Video Lessons page, click "Schedule Lesson", fill in your preferences (subject, date, time, duration), and submit. You\'ll receive a Google Meet link for your session.',
      category: 'video-lessons'
    },
    {
      id: '8',
      question: 'What if I miss a scheduled lesson?',
      answer: 'If you miss a lesson, you can reschedule it through your dashboard. We recommend canceling at least 2 hours in advance to avoid any fees.',
      category: 'video-lessons'
    }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    return matchesSearch && matchesCategory
  })

  const filteredCategories = categories.filter(category =>
    activeCategory === 'all' || category.id === activeCategory
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionMarkCircleIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Help Center
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of your TutorHub experience
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <MagnifyingGlassIcon className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help topics, questions, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Help Categories */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Topics</h2>
            <div className="space-y-6">
              {filteredCategories.map((category) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <category.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{category.description}</p>
                      <div className="space-y-3">
                        {category.articles.map((article, index) => (
                          <div key={index} className="border-l-4 border-blue-200 pl-4">
                            <h4 className="font-medium text-gray-900 mb-1">
                              {article.title}
                            </h4>
                            <p className="text-gray-600 text-sm">{article.content}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Support */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ChatBubbleLeftRightIcon className="h-5 w-5 mr-2 text-blue-600" />
                Need More Help?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">support@tutorhub.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Response Time</p>
                    <p className="text-sm text-gray-600">Within 24 hours</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Support
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Platform Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Students</span>
                  <span className="font-semibold">10,000+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Expert Tutors</span>
                  <span className="font-semibold">500+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Course Subjects</span>
                  <span className="font-semibold">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-semibold flex items-center">
                    98%
                    <StarIcon className="h-4 w-4 text-yellow-400 ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {filteredFAQs.map((faq, index) => (
              <div key={faq.id} className={`${index !== 0 ? 'border-t border-gray-200' : ''}`}>
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFAQ === faq.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {expandedFAQ === faq.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-200">
          <div className="text-center">
            <AcademicCapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our comprehensive documentation and video tutorials can help you get the most out of TutorHub. 
              Or reach out to our friendly support team for personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Documentation
              </button>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors">
                Watch Tutorials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
