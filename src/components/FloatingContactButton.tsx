'use client'

import { motion } from 'framer-motion'
import { PhoneIcon, XMarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.905 3.488z"/>
  </svg>
)

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
              href="https://wa.me/447446255033?text=Hi! I'm interested in TutorHub's tutoring services. Could you please provide more information?"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
              onClick={() => setIsExpanded(false)}
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp Chat
            </a>
            
            <a
              href="mailto:contact@tutorhub.com"
              className="flex items-center gap-3 w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-xl transition-colors font-medium"
              onClick={() => setIsExpanded(false)}
            >
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
              Email Us
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
