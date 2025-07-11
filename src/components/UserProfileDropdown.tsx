'use client'

import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BookOpenIcon,
  HeartIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface UserProfileDropdownProps {
  user: {
    name: string
    email: string
    avatar?: string
    type: 'student' | 'tutor'
  }
  onLogout: () => void
}

export default function UserProfileDropdown({ user, onLogout }: UserProfileDropdownProps) {
  const handleMenuClick = (action: string) => {
    switch (action) {
      case 'profile':
        toast('Profile page coming soon!', { icon: '👤' })
        break
      case 'dashboard':
        toast(`${user.type === 'tutor' ? 'Tutor' : 'Student'} dashboard coming soon!`, { icon: '📊' })
        break
      case 'courses':
        toast('My courses coming soon!', { icon: '📚' })
        break
      case 'favorites':
        toast('Favorites coming soon!', { icon: '❤️' })
        break
      case 'billing':
        toast('Billing & payments coming soon!', { icon: '💳' })
        break
      case 'settings':
        toast('Settings coming soon!', { icon: '⚙️' })
        break
      case 'logout':
        onLogout()
        toast.success('Logged out successfully!', {
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          }
        })
        break
      default:
        break
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            {user.avatar ? (
              <div className="h-8 w-8 relative rounded-full overflow-hidden">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <UserCircleIcon className="h-8 w-8" />
            )}
            <span className="hidden md:block font-medium">{user.name}</span>
            <ChevronDownIcon className="h-4 w-4 text-gray-400" />
          </motion.div>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                {user.avatar ? (
                  <div className="h-10 w-10 relative rounded-full overflow-hidden">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <UserCircleIcon className="h-10 w-10 text-gray-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800 mt-1">
                    {user.type === 'tutor' ? '👨‍🏫 Tutor' : '🎓 Student'}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('profile')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <UserCircleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    View Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('dashboard')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <BookOpenIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {user.type === 'tutor' ? 'Teaching Dashboard' : 'Learning Dashboard'}
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('courses')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <BookOpenIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    My Courses
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('favorites')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <HeartIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Favorites
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('billing')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <CreditCardIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Billing & Payments
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('settings')}
                    className={`${
                      active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors`}
                  >
                    <Cog6ToothIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    Settings
                  </button>
                )}
              </Menu.Item>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-100 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleMenuClick('logout')}
                    className={`${
                      active ? 'bg-red-50 text-red-700' : 'text-gray-700'
                    } group flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-red-50 hover:text-red-700`}
                  >
                    <ArrowRightOnRectangleIcon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
