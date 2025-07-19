'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Modal from './Modal'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

interface UserTypeSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    avatar?: string
  }
}

export default function UserTypeSelectionModal({ isOpen, onClose, user }: UserTypeSelectionModalProps) {
  const { login } = useAuth()
  const [selectedType, setSelectedType] = useState<'student' | 'tutor'>('student')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)
    
    // Create complete user profile with selected type
    const completeUser = {
      ...user,
      type: selectedType
    }
    
    // Log the user in with their selected type
    login(completeUser)
    
    toast.success(`Welcome to TutorHub as a ${selectedType}! 🎉`, {
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
    
    setIsLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={() => {}} title="Complete Your Profile">
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100">
            {user.avatar ? (
              <Image 
                src={user.avatar} 
                alt={user.name}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Welcome, {user.name}!
          </h3>
          <p className="text-gray-600 mb-6">
            To complete your registration, please tell us how you&apos;ll be using TutorHub:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType('student')}
            className={`p-6 border-2 rounded-xl transition-all duration-200 ${
              selectedType === 'student'
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">🎓</div>
              <div className="font-semibold text-lg mb-2">I&apos;m a Student</div>
              <div className="text-sm text-gray-600">
                I want to learn from expert tutors and improve my skills
              </div>
            </div>
          </motion.button>

          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType('tutor')}
            className={`p-6 border-2 rounded-xl transition-all duration-200 ${
              selectedType === 'tutor'
                ? 'border-purple-500 bg-purple-50 text-purple-700'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-center">
              <div className="text-4xl mb-3">👨‍🏫</div>
              <div className="font-semibold text-lg mb-2">I&apos;m a Tutor</div>
              <div className="text-sm text-gray-600">
                I want to teach students and share my expertise
              </div>
            </div>
          </motion.button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Completing Setup...' : 'Complete Registration'}
          </button>
        </div>
      </div>
    </Modal>
  )
}
