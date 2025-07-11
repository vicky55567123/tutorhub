'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function TopMenu() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 text-sm">
          {/* Left side - Promotional message */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              🎉 <strong>New Year Special:</strong> Get 50% off your first lesson!
            </span>
          </div>

          {/* Right side - Language selector and support */}
          <div className="flex items-center space-x-6 text-gray-600">
            <Link 
              href="/help" 
              className="hover:text-primary-600 transition-colors duration-200"
            >
              Help Center
            </Link>
            <div className="flex items-center space-x-1">
              <span>🌍</span>
              <select 
                title="Select language"
                className="bg-transparent border-none text-gray-600 hover:text-primary-600 focus:outline-none cursor-pointer"
              >
                <option>English</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
            </div>
            <div className="flex items-center space-x-1">
              <span>💰</span>
              <select 
                title="Select currency"
                className="bg-transparent border-none text-gray-600 hover:text-primary-600 focus:outline-none cursor-pointer"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
