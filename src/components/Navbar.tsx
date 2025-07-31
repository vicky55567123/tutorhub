'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'

const navigationItems = [
  { name: 'GCSE Tutoring', href: '/courses?category=GCSE' },
  { name: 'Courses', href: '/courses' },
  { name: 'Find Tutors', href: '/tutors' },
  { name: 'Video Lessons', href: '/video-lessons' },
  { name: 'How It Works', href: '/how-it-works' },
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)

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
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
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
