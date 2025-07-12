'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { 
  HeartIcon, 
  StarIcon, 
  ClockIcon, 
  UserGroupIcon,
  PlayIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid'

interface CourseCardProps {
  course: {
    id: number
    title: string
    description: string
    price: string
    rating: number
    students: number
    image: string
    category: string
    subject?: string
    duration: string
    level: string
    instructor: string
    examBoard?: string
    thumbnailVideo?: string
  }
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(!isFavorited)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handlePreview = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPreview(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/courses/${course.id}`}>
        <motion.div
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02]"
          whileHover={{ y: -5 }}
        >
          {/* Course Image/Thumbnail */}
          <div className="relative h-48 bg-gradient-to-br from-primary-100 to-purple-100 overflow-hidden">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover"
            />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur-sm text-primary-800 text-xs font-medium px-3 py-1 rounded-full">
                {course.category}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleFavorite}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                {isFavorited ? (
                  <HeartIconSolid className="w-4 h-4 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4 text-gray-600" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleBookmark}
                className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
              >
                {isBookmarked ? (
                  <BookmarkIconSolid className="w-4 h-4 text-primary-600" />
                ) : (
                  <BookmarkIcon className="w-4 h-4 text-gray-600" />
                )}
              </motion.button>
            </div>

            {/* Preview Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                scale: isHovered ? 1 : 0.8 
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePreview}
                className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              >
                <PlayIcon className="w-6 h-6 text-primary-600 ml-1" />
              </motion.button>
            </motion.div>

            {/* Level Indicator */}
            <div className="absolute bottom-4 left-4">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                course.level === 'GCSE' ? 'bg-indigo-100 text-indigo-800' :
                'bg-red-100 text-red-800'
              }`}>
                {course.level}
              </span>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">{course.rating}</span>
                <span className="text-sm text-gray-500">({course.students})</span>
              </div>
              <span className="text-lg font-bold text-primary-600">{course.price}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {course.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>

            {/* Course Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center space-x-1">
                <ClockIcon className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <UserGroupIcon className="w-4 h-4" />
                <span>{course.students} students</span>
              </div>
            </div>

            {/* GCSE Exam Board Info */}
            {course.examBoard && (
              <div className="mb-4">
                <span className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                  Exam Boards: {course.examBoard}
                </span>
              </div>
            )}

            {/* Instructor */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm">
                  👨‍🏫
                </div>
                <span className="text-sm text-gray-700">{course.instructor}</span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
              >
                Enroll Now
              </motion.button>
            </div>
          </div>

          {/* Hover Effect Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-primary-600/5 to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </Link>

      {/* Quick Preview Modal */}
      {showPreview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4">{course.title}</h3>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <Link
                href={`/courses/${course.id}`}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
              >
                View Course
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}
