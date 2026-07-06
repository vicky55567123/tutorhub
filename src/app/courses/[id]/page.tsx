'use client'

import { useState, useEffect, use } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  PlayCircleIcon,
  BookmarkIcon,
  HeartIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  PresentationChartBarIcon
} from '@heroicons/react/24/outline'
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid
} from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

// Course data lives in one shared place (src/lib/coursesData.ts) so the
// listing page and this detail page can never drift out of sync again.
import { courses as sharedCourses, courseImageUrl } from '@/lib/coursesData'

const courses = sharedCourses.map((c) => ({
  ...c,
  image: courseImageUrl(c.imageId, { w: 800, h: 600 }),
}))

interface CoursePageProps {
  params: Promise<{
    id: string
  }>
}

export default function CoursePage({ params }: CoursePageProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  // Unwrap the params Promise using React.use()
  const { id } = use(params)
  const course = courses.find(c => c.id === parseInt(id))

  if (!course) {
    notFound()
  }

  // Function to convert module names to subtopic URLs
  const moduleToSubtopicUrl = (module: string): string => {
    return module.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
  }

  const handleEnroll = () => {
    toast.success(`Enrolled in ${course.title}! Check your email for next steps.`)
  }

  const handleFavorite = () => {
    setIsFavorited(!isFavorited)
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? 'Bookmark removed' : 'Course bookmarked')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <Link href="/courses" className="text-gray-500 hover:text-blue-600 transition-colors">
              Courses
            </Link>
            <ChevronRightIcon className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* Course Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    {course.category}
                  </span>
                  {course.examBoard && (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                      {course.examBoard}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                  {course.description}
                </p>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-gray-500">({course.students} students)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <ClockIcon className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <AcademicCapIcon className="h-5 w-5" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Image & Actions */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="sticky top-8"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="relative">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={handleFavorite}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        {isFavorited ? (
                          <HeartIconSolid className="h-5 w-5 text-red-500" />
                        ) : (
                          <HeartIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                      <button
                        onClick={handleBookmark}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                      >
                        {isBookmarked ? (
                          <BookmarkIconSolid className="h-5 w-5 text-blue-500" />
                        ) : (
                          <BookmarkIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-2">
                        {course.price}
                      </div>
                      <div className="text-gray-600">Per session</div>
                    </div>

                    <button
                      onClick={handleEnroll}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-3"
                    >
                      Enroll Now
                    </button>

                    <button
                      onClick={() => window.open('/video-lessons', '_blank')}
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 mb-4 flex items-center justify-center gap-2"
                    >
                      <PlayCircleIcon className="h-5 w-5" />
                      Schedule HD Video Lesson
                    </button>

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>24/7 support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500" />
                        <span>Money-back guarantee</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: DocumentTextIcon },
                { id: 'curriculum', label: 'Curriculum', icon: BookmarkIcon },
                { id: 'reviews', label: 'Reviews', icon: StarIcon }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h2>
                    <p className="text-gray-600 leading-relaxed">{course.fullDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What You&apos;ll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(course.skills || []).map((skill, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Learning Outcomes</h3>
                    <div className="space-y-2">
                      {(course.outcomes || []).map((outcome, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircleIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-600">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'curriculum' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {(course.modules || []).map((module, index) => {
                      const subtopicUrl = moduleToSubtopicUrl(module)
                      return (
                        <Link 
                          key={index} 
                          href={`/courses/${id}/subtopics/${subtopicUrl}`}
                          className="block"
                        >
                          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-blue-300 transition-all duration-300 cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm group-hover:bg-blue-200 transition-colors">
                                {index + 1}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{module}</h3>
                                <p className="text-sm text-gray-500 mt-1">Click to explore this topic in detail</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <PlayCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                                <ChevronRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                  
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                      <BookmarkIcon className="h-6 w-6 text-blue-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Interactive Learning</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Each module includes detailed learning objectives, key topics, practice areas, and exam tips. 
                      Click on any module above to access comprehensive learning materials and resources.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">Detailed Content</span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">Practice Areas</span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">Exam Tips</span>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Learning Objectives</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`h-6 w-6 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">{course.rating}/5</p>
                    <p className="text-gray-600 mb-4">Based on {course.students} student reviews</p>
                    <p className="text-gray-500">Detailed reviews coming soon...</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Requirements</h3>
                <div className="space-y-2">
                  {(course.requirements || []).map((requirement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Courses */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to All Courses
        </Link>
      </div>
    </div>
  )
}
