import React from 'react'
import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">TutorHub</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Empowering learners worldwide through quality education. 
              Connect with expert tutors and achieve your learning goals.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 text-blue-400 mr-2" />
                <a 
                  href="tel:+447446255033" 
                  className="text-blue-400 hover:text-blue-300 transition duration-150 font-medium"
                >
                  +44 7446 255033
                </a>
              </div>
              <div className="flex items-center">
                <span className="text-green-400 mr-2">💬</span>
                <a 
                  href="https://wa.me/447446255033" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition duration-150 font-medium"
                >
                  WhatsApp: +44 7446 255033
                </a>
              </div>
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 text-blue-400 mr-2" />
                <a 
                  href="mailto:contact@tutorhub.com" 
                  className="text-blue-400 hover:text-blue-300 transition duration-150"
                >
                  contact@tutorhub.com
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="text-gray-400 hover:text-white transition duration-150">
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="text-gray-400 hover:text-white transition duration-150">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-white transition duration-150">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition duration-150">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white transition duration-150">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition duration-150">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition duration-150">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 TutorHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
