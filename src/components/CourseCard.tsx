'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { 
  HeartIcon, 
  StarIcon, 
  ClockIcon, 
  UserGroupIcon,
  PlayIcon,
  PlusIcon,
  CheckIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

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
    instructor?: string
    examBoard?: string
  }
  index: number
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const { user } = useAuth()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (user) {
      const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${user.email}`) || '[]')
      setIsEnrolled(enrolledCourses.includes(course.id))
      
      const favorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]')
      setIsFavorited(favorites.some((fav: any) => fav.id === course.id && fav.type === 'course'))
    }
  }, [user, course.id])

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Please sign in to add favorites')
      return
    }

    const favorites = JSON.parse(localStorage.getItem(`favorites_${user.email}`) || '[]')
    
    if (isFavorited) {
      const updatedFavorites = favorites.filter((fav: any) => !(fav.id === course.id && fav.type === 'course'))
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(updatedFavorites))
      setIsFavorited(false)
      toast.success('Removed from favorites')
    } else {
      const newFavorite = {
        id: course.id,
        type: 'course',
        title: course.title,
        rating: course.rating,
        reviewCount: course.students,
        price: course.price,
        image: course.image,
        addedDate: new Date().toLocaleDateString(),
        description: course.description
      }
      favorites.push(newFavorite)
      localStorage.setItem(`favorites_${user.email}`, JSON.stringify(favorites))
      setIsFavorited(true)
      toast.success('Added to favorites!')
    }
  }

  const handleEnroll = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!user) {
      toast.error('Please sign in to enroll in courses')
      return
    }

    if (isEnrolled) {
      toast('You are already enrolled in this course!')
      return
    }

    const enrolledCourses = JSON.parse(localStorage.getItem(`enrolledCourses_${user.email}`) || '[]')
    enrolledCourses.push(course.id)
    localStorage.setItem(`enrolledCourses_${user.email}`, JSON.stringify(enrolledCourses))
    
    setIsEnrolled(true)
    toast.success(`Successfully enrolled in ${course.title}!`)
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
          {/* Course Image */}
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

            {/* Favorite Button */}
            <div className="absolute top-4 right-4">
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
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {course.title}
            </h3>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {course.description}
            </p>

            {/* Course Details */}
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

            {/* Exam Board */}
            {course.examBoard && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {course.examBoard}
                </span>
              </div>
            )}

            {/* Enrollment Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleEnroll}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isEnrolled
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
              }`}
            >
              {isEnrolled ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  <span>Enrolled</span>
                </>
              ) : (
                <>
                  <PlusIcon className="w-4 h-4" />
                  <span>Enroll Now</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
