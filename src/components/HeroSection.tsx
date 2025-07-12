'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PlayIcon, StarIcon, UserGroupIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'

const stats = [
  { label: 'Active Students', value: '10,000+', icon: UserGroupIcon },
  { label: 'Expert Tutors', value: '500+', icon: StarIcon },
  { label: 'Success Rate', value: '98%', icon: PlayIcon },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Computer Science Student',
    image: '👩‍💻',
    text: 'TutorHub helped me ace my programming courses. The tutors are incredible!'
  },
  {
    name: 'Mike Johnson',
    role: 'High School Student',
    image: '👨‍🎓',
    text: 'My math grades improved from C to A+ thanks to the amazing tutors here.'
  },
  {
    name: 'Emily Davis',
    role: 'Language Learner',
    image: '👩‍🏫',
    text: 'Learning Spanish has never been this engaging and effective.'
  }
]

export default function HeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isClient])

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Animation */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-accent-300 to-accent-400 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-secondary-300 to-secondary-400 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 w-32 h-32 bg-gradient-to-br from-primary-300 to-primary-400 rounded-full opacity-15"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-full text-sm font-semibold mb-8 border border-primary-200"
            >
              🎉 Over 10,000 successful learning sessions completed
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            >
              Learn faster with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
                {' '}your best tutor
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
            >
              Expert GCSE tutoring in Maths, Physics, Chemistry, Biology & Computer Science. 
              Achieve grades 4-9 with our qualified tutors and proven exam strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link 
                href="/courses" 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Courses
                  <PlayIcon className="w-5 h-5" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-accent-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              
              <Link 
                href="/tutors" 
                className="group px-8 py-4 bg-white text-gray-800 rounded-2xl font-semibold text-lg border-2 border-gray-200 transition-all duration-300 hover:border-primary-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  Find a Tutor
                  <UserGroupIcon className="w-5 h-5" />
                </span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <div className={`flex justify-center mb-3 ${
                    index === 0 ? 'text-primary-600' : 
                    index === 1 ? 'text-accent-600' : 
                    'text-secondary-600'
                  }`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Testimonial Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-white via-primary-50 to-secondary-50 rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-accent-400 to-warning-400 rounded-full opacity-20"></div>
              <div className="absolute bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full opacity-20"></div>
              
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center relative z-10"
              >
                <div className="text-6xl mb-4">{testimonials[currentTestimonial].image}</div>
                <blockquote className="text-lg text-gray-700 mb-6 italic">
                  &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                </blockquote>
                <div className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-sm text-gray-500">
                  {testimonials[currentTestimonial].role}
                </div>
              </motion.div>

              {/* Testimonial Navigation */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    aria-label={`View testimonial ${index + 1}`}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-primary-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            {isClient && (
              <>
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-warning-300 to-accent-400 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ⭐
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary-300 to-secondary-400 rounded-full flex items-center justify-center text-xl shadow-lg"
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  📚
                </motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
