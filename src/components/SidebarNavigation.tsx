'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface NavigationItem {
  href: string
  name: string
  icon: React.ComponentType<{ className: string }>
}

const navigationItems: NavigationItem[] = [
  {
    href: '/',
    name: 'Home',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
    )
  },
  {
    href: '/gcse-igcse-o-level',
    name: 'GCSE/IGCSE/O-Level',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    href: '/a-levels',
    name: 'A-Levels',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    href: '/courses',
    name: 'Courses',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
      </svg>
    )
  },
  {
    href: '/subjects',
    name: 'Subjects',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
      </svg>
    )
  },
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
      </svg>
    )
  },
  {
    href: 'https://wa.me/923134567890?text=Hello!%20I%20need%20help%20with%20my%20studies.%20Can%20you%20assist%20me?',
    name: 'WhatsApp Support',
    icon: ({ className }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
      </svg>
    )
  }
]

export default function SidebarNavigation() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileOpen])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <div>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        className="fixed top-6 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle navigation menu"
        title="Toggle navigation menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isMobile ? (isMobileOpen ? 280 : 0) : (isExpanded ? 280 : 80),
          opacity: isMobile ? (isMobileOpen ? 1 : 0) : 1
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-2xl z-50 sidebar-container
          ${isMobile ? 'md:relative' : ''}
          ${isMobile && !isMobileOpen ? 'pointer-events-none' : ''}
        `}
        onMouseEnter={() => !isMobile && setIsExpanded(true)}
        onMouseLeave={() => !isMobile && setIsExpanded(false)}
        style={{ overflow: 'hidden' }}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`flex items-center ${isExpanded || isMobileOpen ? 'justify-start px-6' : 'justify-center px-0'} py-6 border-b border-blue-700`}>
            <motion.div
              animate={{ scale: isExpanded || isMobileOpen ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-900 font-bold text-xl">T</span>
              </div>
            </motion.div>
            {(isExpanded || isMobileOpen) && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-3 text-xl font-bold"
              >
                TutorHub
              </motion.span>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 py-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                const isWhatsApp = item.href.startsWith('https://wa.me/')
                
                return (
                  <li key={item.name} className="px-3">
                    {isWhatsApp ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`
                          flex items-center py-3 px-3 rounded-lg transition-all duration-200
                          hover:bg-green-600 hover:shadow-lg hover:scale-105
                          ${isActive ? 'bg-green-600 shadow-lg' : 'hover:bg-blue-700'}
                        `}
                      >
                        <item.icon className="w-6 h-6 flex-shrink-0" />
                        {(isExpanded || isMobileOpen) && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-3 font-medium truncate"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => isMobile && setIsMobileOpen(false)}
                        className={`
                          flex items-center py-3 px-3 rounded-lg transition-all duration-200
                          hover:bg-blue-700 hover:shadow-lg hover:scale-105
                          ${isActive ? 'bg-blue-600 shadow-lg' : ''}
                        `}
                      >
                        <item.icon className="w-6 h-6 flex-shrink-0" />
                        {(isExpanded || isMobileOpen) && (
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="ml-3 font-medium truncate"
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="border-t border-blue-700 p-4">
            {(isExpanded || isMobileOpen) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-blue-200 text-sm"
              >
                <p>© 2024 TutorHub</p>
                <p>Excellence in Education</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>
    </div>
  )
}
