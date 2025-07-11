'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  VideoCameraIcon, 
  AcademicCapIcon, 
  ChartBarIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    id: 'video',
    title: 'HD Video Sessions',
    description: 'Crystal clear video calls with screen sharing, whiteboard, and recording capabilities.',
    icon: VideoCameraIcon,
    color: 'blue',
    details: [
      'HD 1080p video quality',
      'Interactive whiteboard',
      'Screen sharing',
      'Session recording',
      'Real-time chat'
    ]
  },
  {
    id: 'tutors',
    title: 'Expert Tutors',
    description: 'Verified professionals with proven track records and subject matter expertise.',
    icon: AcademicCapIcon,
    color: 'green',
    details: [
      'Background verified',
      'University graduates',
      'Industry professionals',
      '4.8+ average rating',
      'Continuous training'
    ]
  },
  {
    id: 'progress',
    title: 'Progress Tracking',
    description: 'Detailed analytics and reports to monitor learning progress and achievements.',
    icon: ChartBarIcon,
    color: 'purple',
    details: [
      'Learning analytics',
      'Progress reports',
      'Goal tracking',
      'Performance insights',
      'Parent dashboard'
    ]
  },
  {
    id: 'scheduling',
    title: 'Flexible Scheduling',
    description: 'Book sessions at your convenience with 24/7 availability and easy rescheduling.',
    icon: ClockIcon,
    color: 'orange',
    details: [
      '24/7 availability',
      'Easy rescheduling',
      'Timezone support',
      'Recurring sessions',
      'Mobile calendar sync'
    ]
  },
  {
    id: 'communication',
    title: 'Seamless Communication',
    description: 'Multi-channel communication with tutors before, during, and after sessions.',
    icon: ChatBubbleLeftRightIcon,
    color: 'pink',
    details: [
      'In-app messaging',
      'File sharing',
      'Assignment submission',
      'Quick questions',
      'Email notifications'
    ]
  },
  {
    id: 'security',
    title: 'Safe & Secure',
    description: 'Bank-level security with encrypted sessions and verified tutor profiles.',
    icon: ShieldCheckIcon,
    color: 'red',
    details: [
      'End-to-end encryption',
      'Secure payments',
      'Identity verification',
      'COPPA compliant',
      '24/7 monitoring'
    ]
  }
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    accent: 'bg-blue-600'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    accent: 'bg-green-600'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    icon: 'text-purple-600',
    accent: 'bg-purple-600'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: 'text-orange-600',
    accent: 'bg-orange-600'
  },
  pink: {
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    icon: 'text-pink-600',
    accent: 'bg-pink-600'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    accent: 'bg-red-600'
  }
}

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState('video')
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const activeFeatureData = features.find(f => f.id === activeFeature)

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
              {' '}excel in learning
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features you need for successful online tutoring and learning experiences.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature Grid */}
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const colors = colorClasses[feature.color as keyof typeof colorClasses]
              const isActive = activeFeature === feature.id
              const isHovered = hoveredFeature === feature.id

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                    isActive 
                      ? `${colors.bg} ${colors.border} shadow-lg scale-105` 
                      : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setActiveFeature(feature.id)}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ scale: isActive ? 1.05 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute top-4 right-4 w-3 h-3 ${colors.accent} rounded-full`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}

                  <div className={`w-12 h-12 ${isActive ? colors.bg : 'bg-gray-100'} rounded-xl flex items-center justify-center mb-4 transition-colors duration-300`}>
                    <feature.icon 
                      className={`w-6 h-6 ${isActive ? colors.icon : 'text-gray-600'} transition-colors duration-300`} 
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover Effect */}
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Feature Details Panel */}
          <div className="lg:col-span-1">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="sticky top-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
            >
              {activeFeatureData && (
                <>
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${colorClasses[activeFeatureData.color as keyof typeof colorClasses].bg} rounded-2xl flex items-center justify-center mr-4`}>
                      <activeFeatureData.icon 
                        className={`w-8 h-8 ${colorClasses[activeFeatureData.color as keyof typeof colorClasses].icon}`} 
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {activeFeatureData.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {activeFeatureData.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Features:
                    </h4>
                    <div className="space-y-3">
                      {activeFeatureData.details.map((detail, index) => (
                        <motion.div
                          key={detail}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center text-gray-700"
                        >
                          <div className={`w-2 h-2 ${colorClasses[activeFeatureData.color as keyof typeof colorClasses].accent} rounded-full mr-3 flex-shrink-0`} />
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full mt-8 py-3 px-6 ${colorClasses[activeFeatureData.color as keyof typeof colorClasses].accent} text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg`}
                  >
                    Learn More
                  </motion.button>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
