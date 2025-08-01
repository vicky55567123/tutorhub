'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
import { ChatBubbleLeftIcon, VideoCameraIcon } from '@heroicons/react/24/outline'

const featuredTutors = [
  {
    id: 1,
    name: 'Ahmed Waqar',
    subject: 'GCSE Maths, Physics & Chemistry',
    avatar: '🎓',
    rating: 4.9,
    reviews: 284,
    hourlyRate: 45,
    languages: ['English (Fluent)', 'Urdu (Native)', 'Arabic (Basic)'],
    specialties: ['GCSE Mathematics', 'GCSE Physics', 'GCSE Chemistry', 'Multi-Subject Teaching'],
    videoIntro: true,
    backgroundColor: 'from-yellow-400 to-orange-500',
    flag: '��'
  },
  {
    id: 2,
    name: 'Farhana Kiran',
    subject: 'Mathematics',
    avatar: '�‍🏫',
    rating: 4.9,
    reviews: 156,
    hourlyRate: 35,
    languages: ['English (Native)', 'Urdu (Fluent)'],
    specialties: ['GCSE Mathematics', 'Algebra', 'Statistics'],
    videoIntro: true,
    backgroundColor: 'from-blue-400 to-indigo-500',
    flag: '��'
  },
  {
    id: 3,
    name: 'Zain ul Abedin',
    subject: 'GCSE Physics',
    avatar: '�‍🔬',
    rating: 4.8,
    reviews: 143,
    hourlyRate: 40,
    languages: ['English (Fluent)', 'Urdu (Native)'],
    specialties: ['GCSE Physics', 'Mechanics', 'Electricity'],
    videoIntro: true,
    backgroundColor: 'from-purple-400 to-pink-500',
    flag: '��'
  },
  {
    id: 4,
    name: 'Ali Zia',
    subject: 'GCSE Chemistry',
    avatar: '�‍⚗️',
    rating: 4.9,
    reviews: 128,
    hourlyRate: 38,
    languages: ['English (Fluent)', 'Urdu (Native)'],
    specialties: ['GCSE Chemistry', 'Organic Chemistry', 'Chemical Analysis'],
    videoIntro: true,
    backgroundColor: 'from-green-400 to-emerald-500',
    flag: '🇬🇧'
  },
  {
    id: 5,
    name: 'Fahad Noor',
    subject: 'GCSE Computer Science',
    avatar: '👨‍💻',
    rating: 4.8,
    reviews: 112,
    hourlyRate: 42,
    languages: ['English (Fluent)', 'Urdu (Native)'],
    specialties: ['GCSE Computer Science', 'Python Programming', 'Computational Thinking'],
    videoIntro: true,
    backgroundColor: 'from-cyan-400 to-blue-500',
    flag: '🇬🇧'
  },
  {
    id: 6,
    name: 'Bilal K Abbasi',
    subject: 'GCSE Biology',
    avatar: '👨‍⚕️',
    rating: 4.7,
    reviews: 167,
    hourlyRate: 36,
    languages: ['English (Fluent)', 'Urdu (Native)'],
    specialties: ['GCSE Biology', 'Genetics', 'Human Biology'],
    videoIntro: true,
    backgroundColor: 'from-teal-400 to-green-500',
    flag: '🇬🇧'
  },
  {
    id: 7,
    name: 'Abdul Hanan',
    subject: 'English Literature',
    avatar: '👨‍📚',
    rating: 4.9,
    reviews: 189,
    hourlyRate: 40,
    languages: ['English (Native)', 'Urdu (Fluent)'],
    specialties: ['GCSE English', 'Literature Analysis', 'Creative Writing'],
    videoIntro: true,
    backgroundColor: 'from-rose-400 to-red-500',
    flag: '🇬🇧'
  }
]

export default function TutorShowcase() {
  const [currentTutor, setCurrentTutor] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return
    
    const interval = setInterval(() => {
      setCurrentTutor((prev) => (prev + 1) % featuredTutors.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isClient])

  const tutor = featuredTutors[currentTutor]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet your perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600">
              {' '}tutor match
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with expert tutors from around the world who will motivate, challenge, and inspire you to reach your goals.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Tutor Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {featuredTutors.map((tutorItem, index) => (
              <motion.div
                key={tutorItem.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                  index === currentTutor 
                    ? 'scale-110 shadow-2xl z-10' 
                    : 'hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setCurrentTutor(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${tutorItem.backgroundColor} rounded-3xl opacity-90`}></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden border-4 border-white/30 bg-white flex items-center justify-center">
                    <span className="text-4xl">{tutorItem.avatar}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{tutorItem.name}</h3>
                  <p className="text-white/90 text-sm mb-2">{tutorItem.subject}</p>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <StarIcon className="w-4 h-4 text-yellow-300" />
                    <span className="text-white font-semibold text-sm">{tutorItem.rating}</span>
                    <span className="text-white/80 text-xs">({tutorItem.reviews})</span>
                  </div>
                  <div className="text-white/90 text-sm">${tutorItem.hourlyRate}/hr</div>
                </div>
                {index === currentTutor && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <span className="text-lg">⭐</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Featured Tutor Details */}
          <motion.div
            key={currentTutor}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100 flex items-center justify-center">
                <span className="text-5xl">{tutor.avatar}</span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {tutor.name} <span className="text-2xl">{tutor.flag}</span>
                </h3>
                <p className="text-xl text-gray-600">{tutor.subject} Tutor</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-900">{tutor.rating}</span>
                  <span className="text-gray-600">({tutor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.languages.map((lang, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {tutor.specialties.map((specialty, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-2xl font-bold text-gray-900">
                  ${tutor.hourlyRate}/hour
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-300 transition-all duration-200"
                  >
                    <VideoCameraIcon className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">Preview</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span>Book Lesson</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-3">
          {featuredTutors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTutor(index)}
              title={`View ${featuredTutors[index].name}'s profile`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTutor 
                  ? 'bg-primary-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
