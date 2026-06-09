'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { PlayIcon, StarIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/solid'
import { CheckBadgeIcon, AcademicCapIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from 'react'
import VideoIntroModal from './VideoIntroModal'

const stats = [
  { label: 'Years Experience', value: '8+', icon: AcademicCapIcon },
  { label: 'Students Tutored', value: '200+', icon: UserGroupIcon },
  { label: 'Grade Improvement', value: '96%', icon: StarIcon },
]

const testimonials = [
  {
    name: 'Mrs. Ahmed',
    role: 'Parent — GCSE Maths & Physics',
    initials: 'MA',
    color: 'bg-blue-100 text-blue-700',
    text: 'My son went from a grade 4 to a grade 8 in GCSE Maths. The lessons are clear, patient, and genuinely effective. Highly recommend.'
  },
  {
    name: 'Mrs. Patel',
    role: 'Parent — IGCSE Chemistry',
    initials: 'SP',
    color: 'bg-green-100 text-green-700',
    text: 'My daughter struggled with Chemistry for two years. After just 3 months of tutoring, she passed her mock with an A. We couldn\'t be happier.'
  },
  {
    name: 'Mr. Khan',
    role: 'Parent — O-Level Maths & Physics',
    initials: 'RK',
    color: 'bg-purple-100 text-purple-700',
    text: 'Excellent tutor — very knowledgeable, professional, and great at explaining difficult concepts in a way my son actually understands.'
  },
]

export default function HeroSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

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
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-800 rounded-full text-sm font-semibold mb-8 border border-primary-200 gap-2"
            >
              <CheckBadgeIcon className="w-5 h-5 text-primary-600" />
              Qualified Teacher · DBS Checked · 8+ Years Experience
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight"
            >
              GCSE, IGCSE &amp; O-Level
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
                {' '}Science and Maths Tutor
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-2xl font-semibold text-primary-700 mb-6 tracking-wide"
            >
              Maths &nbsp;|&nbsp; Physics &nbsp;|&nbsp; Chemistry
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg"
            >
              Helping students improve grades, confidence, and exam performance through personalized online tutoring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link 
                href="/contact" 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold text-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Free Trial Lesson
                  <PlayIcon className="w-5 h-5" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-accent-600"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="group px-8 py-4 bg-white text-gray-800 rounded-2xl font-semibold text-lg border-2 border-gray-200 transition-all duration-300 hover:border-primary-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
                  <VideoCameraIcon className="w-5 h-5 text-primary-600" />
                  Watch Introduction
                </span>
              </button>
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-center"
            >
              <a 
                href="tel:+447446255033" 
                className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100 text-blue-800 rounded-xl font-medium text-lg hover:bg-blue-200 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-blue-200"
              >
                📞 Call Us: +44 7446 255033
              </a>
              <a 
                href="https://wa.me/447446255033?text=Hi! I'm interested in TutorHub's tutoring services. Could you please provide more information about courses and pricing?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-100 text-green-800 rounded-xl font-medium text-lg hover:bg-green-200 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg border border-green-200"
              >
                💬 WhatsApp Chat
              </a>
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

          {/* Right Content - Tutor Trust Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Tutor Profile Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Header stripe */}
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 px-6 py-4">
                <p className="text-white/80 text-sm font-medium uppercase tracking-wide">Your Tutor</p>
                <p className="text-white font-bold text-xl">GCSE, IGCSE &amp; O-Level Specialist</p>
              </div>

              <div className="p-6">
                {/* Tutor identity */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold shadow-md flex-shrink-0">
                    T
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Specialist Maths &amp; Science Tutor</h3>
                    <p className="text-gray-500 text-sm">Online · Worldwide · All Curricula</p>
                    <div className="flex gap-1 mt-1">
                      {[1,2,3,4,5].map(i => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">5.0 rated</span>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { icon: '🎓', text: 'Qualified Teacher (QTS)' },
                    { icon: '✅', text: 'DBS Checked' },
                    { icon: '📚', text: 'Maths · Physics · Chemistry' },
                    { icon: '🌍', text: 'GCSE · IGCSE · O-Level · A-Level' },
                  ].map(({ icon, text }) => (
                    <div key={text} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                      <span className="text-base">{icon}</span>
                      <span className="text-xs font-medium text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>

                {/* Rotating parent testimonials */}
                <div className="bg-primary-50 rounded-2xl p-4 border border-primary-100">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className="text-sm text-gray-700 italic mb-3">
                      &ldquo;{testimonials[currentTestimonial].text}&rdquo;
                    </p>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${testimonials[currentTestimonial].color}`}>
                        {testimonials[currentTestimonial].initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                        <p className="text-xs text-gray-500">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                  </motion.div>
                  <div className="flex gap-1.5 mt-3">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        aria-label={`View testimonial ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          index === currentTestimonial
                            ? 'bg-primary-600 w-6'
                            : 'bg-gray-300 w-3 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Contact strip */}
                <div className="mt-4 flex gap-2">
                  <a
                    href="https://wa.me/447446255033?text=Hi! I'd like to book a free trial lesson."
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    💬 WhatsApp
                  </a>
                  <a
                    href="tel:+447446255033"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Video Introduction Modal */}
      <VideoIntroModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />
    </div>
  )
}
