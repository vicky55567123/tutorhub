'use client'

import { motion } from 'framer-motion'
import { PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export default function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, duration: 0.3 }}
    >
      {/* Expanded Contact Card */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 w-80 mb-2"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Need Help?</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close contact card"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">
            Get instant support from our friendly team. We&apos;re here to help with courses, tutoring, and any questions you have!
          </p>
          
          <div className="space-y-3">
            <a
              href="tel:+447446255033"
              className="flex items-center gap-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
              onClick={() => setIsExpanded(false)}
            >
              <PhoneIcon className="h-5 w-5" />
              Call: +44 7446 255033
            </a>
            
            <a
              href="sms:+447446255033"
              className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
              onClick={() => setIsExpanded(false)}
            >
              💬 Text Us: +44 7446 255033
            </a>
            
            <a
              href="mailto:contact@tutorhub.com"
              className="flex items-center gap-3 w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
              onClick={() => setIsExpanded(false)}
            >
              ✉️ Email Us
            </a>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500 text-center">
              Available Monday - Friday, 9 AM - 6 PM GMT
            </p>
          </div>
        </motion.div>
      )}

      {/* Main Contact Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isExpanded 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isExpanded ? (
          <XMarkIcon className="h-6 w-6 text-white" />
        ) : (
          <PhoneIcon className="h-6 w-6 text-white" />
        )}
        
        {/* Pulsing ring effect */}
        {!isExpanded && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-600"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        )}
      </motion.button>
      
      {/* Quick call button when not expanded */}
      {!isExpanded && (
        <motion.a
          href="tel:+447446255033"
          className="absolute -top-2 -left-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          Quick Call
        </motion.a>
      )}
    </motion.div>
  )
}
