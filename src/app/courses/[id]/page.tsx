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

// Course data - in a real app, this would come from an API or database
const courses = [
  // GCSE Courses
  {
    id: 1,
    title: 'GCSE Mathematics (Grades 4-9)',
    description: 'Complete GCSE Maths preparation covering Number, Algebra, Geometry, Statistics and Probability.',
    fullDescription: 'Our comprehensive GCSE Mathematics course is designed to help students achieve grades 4-9 across all major exam boards. We cover all essential topics including Number theory, Algebraic manipulation, Geometric principles, Statistical analysis, and Probability calculations. Our expert tutors use proven teaching methods and past paper practice to ensure exam success.',
    price: '£35/hour',
    rating: 4.9,
    students: 250,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    category: 'GCSE',
    subject: 'Mathematics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Sarah Johnson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Number and Basic Algebra',
      'Advanced Algebra and Functions',
      'Geometry and Measures',
      'Statistics and Data Analysis',
      'Probability and Combined Events',
      'Problem Solving and Exam Techniques'
    ],
    skills: [
      'Algebraic manipulation and equation solving',
      'Geometric calculations and proofs',
      'Statistical analysis and interpretation',
      'Probability calculations',
      'Problem-solving strategies',
      'Exam technique and time management'
    ],
    requirements: [
      'Basic arithmetic skills',
      'Calculator (scientific recommended)',
      'Notebook and writing materials',
      'Access to past papers (provided)'
    ],
    instructorBio: 'Dr. Sarah Johnson has over 15 years of experience teaching GCSE Mathematics. She holds a PhD in Mathematics Education and has helped over 1,000 students achieve their target grades.',
    outcomes: [
      'Achieve GCSE grade 4-9 in Mathematics',
      'Master all key mathematical concepts',
      'Develop problem-solving confidence',
      'Excel in exam conditions'
    ]
  },
  {
    id: 2,
    title: 'GCSE Physics (Grades 4-9)',
    description: 'Master GCSE Physics topics including Forces, Energy, Waves, Electricity and Particle Physics.',
    fullDescription: 'Dive deep into the fascinating world of physics with our comprehensive GCSE course. From understanding fundamental forces and energy transformations to exploring wave properties and electrical circuits, this course covers all exam board requirements. Our practical approach includes virtual experiments and real-world applications to make physics engaging and memorable.',
    price: '£40/hour',
    rating: 4.8,
    students: 180,
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&h=600&fit=crop',
    category: 'GCSE',
    subject: 'Physics',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Prof. David Wilson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Forces and Motion',
      'Energy and Power',
      'Waves and Electromagnetic Spectrum',
      'Electricity and Magnetism',
      'Particle Physics and Atomic Structure',
      'Space Physics and Earth Science'
    ],
    skills: [
      'Physics calculations and formulas',
      'Experimental design and analysis',
      'Graph interpretation',
      'Scientific reasoning',
      'Practical investigation skills',
      'Physics in everyday contexts'
    ],
    requirements: [
      'GCSE Mathematics (Grade 4 or above recommended)',
      'Scientific calculator',
      'Lab notebook',
      'Interest in how things work'
    ],
    instructorBio: 'Prof. David Wilson is a former university lecturer with 20+ years in physics education. He specializes in making complex physics concepts accessible and engaging for GCSE students.',
    outcomes: [
      'Achieve GCSE grade 4-9 in Physics',
      'Understand fundamental physics principles',
      'Apply physics to real-world situations',
      'Develop scientific thinking skills'
    ]
  },
  {
    id: 3,
    title: 'GCSE Chemistry (Grades 4-9)',
    description: 'Comprehensive GCSE Chemistry covering Atomic Structure, Bonding, Chemical Reactions and Analysis.',
    fullDescription: 'Explore the molecular world with our comprehensive GCSE Chemistry course. From atomic structure and chemical bonding to organic chemistry and quantitative analysis, we cover all essential topics. Our course includes virtual lab simulations, reaction mechanisms, and plenty of practice with chemical equations and calculations.',
    price: '£38/hour',
    rating: 4.9,
    students: 160,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    category: 'GCSE',
    subject: 'Chemistry',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Emma Thompson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Atomic Structure and Periodic Table',
      'Chemical Bonding and Structure',
      'Chemical Reactions and Equations',
      'Quantitative Chemistry',
      'Organic Chemistry Basics',
      'Chemical Analysis and Testing'
    ],
    skills: [
      'Chemical equation balancing',
      'Mole calculations',
      'Understanding reaction mechanisms',
      'Laboratory safety and techniques',
      'Data analysis and interpretation',
      'Chemical formula writing'
    ],
    requirements: [
      'GCSE Mathematics (Grade 4 recommended)',
      'Scientific calculator',
      'Periodic table (provided)',
      'Lab safety awareness'
    ],
    instructorBio: 'Dr. Emma Thompson is a chemistry education specialist with 12 years of GCSE teaching experience. She has developed innovative teaching methods that make chemistry accessible and enjoyable.',
    outcomes: [
      'Achieve GCSE grade 4-9 in Chemistry',
      'Master chemical concepts and calculations',
      'Understand real-world chemistry applications',
      'Develop laboratory skills and safety awareness'
    ]
  },
  {
    id: 4,
    title: 'GCSE Biology (Grades 4-9)',
    description: 'Complete GCSE Biology covering Cell Biology, Human Physiology, Genetics, Evolution and Ecology.',
    fullDescription: 'Discover the wonders of life with our comprehensive GCSE Biology course. From microscopic cellular processes to complex ecological systems, we cover all aspects of biology required for GCSE success. Interactive diagrams, virtual dissections, and real-world case studies make learning biology engaging and memorable.',
    price: '£36/hour',
    rating: 4.7,
    students: 200,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    category: 'GCSE',
    subject: 'Biology',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Dr. Michael Roberts',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Cell Biology and Microscopy',
      'Human Body Systems',
      'Plant Biology and Photosynthesis',
      'Genetics and Inheritance',
      'Evolution and Natural Selection',
      'Ecology and Environmental Science'
    ],
    skills: [
      'Microscopy and cell observation',
      'Genetic cross analysis',
      'Experimental design in biology',
      'Data interpretation from biological studies',
      'Understanding biological processes',
      'Environmental impact assessment'
    ],
    requirements: [
      'Basic understanding of scientific method',
      'Notebook for diagrams and notes',
      'Interest in living organisms',
      'GCSE Mathematics helpful but not essential'
    ],
    instructorBio: 'Dr. Michael Roberts combines 18 years of biology teaching with field research experience. He brings real-world biological discoveries into the classroom to inspire students.',
    outcomes: [
      'Achieve GCSE grade 4-9 in Biology',
      'Understand life processes and systems',
      'Develop scientific investigation skills',
      'Apply biological knowledge to current issues'
    ]
  },
  {
    id: 5,
    title: 'GCSE Computer Science (Grades 4-9)',
    description: 'Learn programming, algorithms, data structures and computer systems for GCSE Computer Science.',
    fullDescription: 'Master the digital world with our comprehensive GCSE Computer Science course. Learn programming fundamentals in Python, understand computer systems architecture, explore algorithms and data structures, and discover how computers solve real-world problems. Perfect for students interested in technology and future careers in computing.',
    price: '£42/hour',
    rating: 4.8,
    students: 140,
    image: 'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&h=600&fit=crop',
    category: 'GCSE',
    subject: 'Computer Science',
    duration: '20 weeks',
    level: 'GCSE',
    instructor: 'Mr. James Chen',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Programming Fundamentals (Python)',
      'Computer Systems and Architecture',
      'Algorithms and Data Structures',
      'Networks and Internet Technologies',
      'Data Representation and Storage',
      'Computational Thinking and Problem Solving'
    ],
    skills: [
      'Python programming',
      'Algorithm design and analysis',
      'Problem decomposition',
      'Data structure implementation',
      'System analysis and design',
      'Digital literacy and cyber security'
    ],
    requirements: [
      'Computer with internet access',
      'No prior programming experience needed',
      'Logical thinking ability',
      'GCSE Mathematics recommended'
    ],
    instructorBio: 'Mr. James Chen is a software engineer turned educator with 10 years of industry experience and 8 years teaching GCSE Computer Science. He makes programming accessible and fun.',
    outcomes: [
      'Achieve GCSE grade 4-9 in Computer Science',
      'Master Python programming',
      'Understand computer systems',
      'Develop computational thinking skills'
    ]
  },
  {
    id: 6,
    title: 'Advanced Mathematics (A-Level Preparation)',
    description: 'Prepare for A-Level Mathematics with advanced topics in Calculus, Statistics, and Mechanics.',
    fullDescription: 'Bridge the gap between GCSE and A-Level Mathematics with our advanced preparation course. Covering differential and integral calculus, advanced statistics, mechanics, and further mathematical concepts, this course provides the solid foundation needed for A-Level success and university-level mathematics.',
    price: '£45/hour',
    rating: 4.9,
    students: 85,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=600&fit=crop',
    category: 'Advanced',
    subject: 'Mathematics',
    duration: '16 weeks',
    level: 'Pre-A-Level',
    instructor: 'Prof. Lisa Anderson',
    examBoard: 'AQA, Edexcel, OCR, MEI',
    modules: [
      'Introduction to Calculus',
      'Advanced Algebra and Functions',
      'Coordinate Geometry and Curves',
      'Statistics and Hypothesis Testing',
      'Mechanics and Mathematical Physics',
      'Further Mathematical Techniques'
    ],
    skills: [
      'Differential and integral calculus',
      'Advanced algebraic manipulation',
      'Statistical analysis and testing',
      'Mathematical modeling',
      'Problem-solving with complex functions',
      'Mathematical proof techniques'
    ],
    requirements: [
      'GCSE Mathematics Grade 7 or above',
      'Graphing calculator recommended',
      'Strong algebraic foundation',
      'Commitment to regular practice'
    ],
    instructorBio: 'Prof. Lisa Anderson has taught A-Level Mathematics for 22 years and has helped hundreds of students transition successfully from GCSE to university-level mathematics.',
    outcomes: [
      'Ready for A-Level Mathematics',
      'Master calculus fundamentals',
      'Develop advanced problem-solving skills',
      'Build confidence for higher mathematics'
    ]
  },
  // Add other courses with similar detailed structure...
  {
    id: 7,
    title: 'Computer Science Fundamentals',
    description: 'Learn programming, algorithms, and computer science principles from industry experts.',
    fullDescription: 'Build a solid foundation in computer science with our comprehensive fundamentals course. From basic programming concepts to advanced algorithms and data structures, this course prepares you for further study or a career in technology. Hands-on projects and real-world applications make learning practical and engaging.',
    price: '$60/hour',
    rating: 4.8,
    students: 200,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
    category: 'Programming',
    subject: 'Computer Science',
    duration: '16 weeks',
    level: 'Beginner',
    instructor: 'Prof. Michael Chen',
    examBoard: 'N/A',
    modules: [
      'Programming Basics (Python)',
      'Data Structures and Algorithms',
      'Object-Oriented Programming',
      'Database Fundamentals',
      'Web Development Basics',
      'Software Engineering Principles'
    ],
    skills: [
      'Python programming proficiency',
      'Algorithm design and analysis',
      'Database design and querying',
      'Web development basics',
      'Software project management',
      'Problem-solving and debugging'
    ],
    requirements: [
      'Computer with reliable internet',
      'No prior programming experience needed',
      'Logical thinking ability',
      'Time commitment for practice'
    ],
    instructorBio: 'Prof. Michael Chen has 15 years of industry experience at major tech companies and 8 years teaching computer science. He specializes in making complex concepts accessible.',
    outcomes: [
      'Master programming fundamentals',
      'Understand computer science principles',
      'Build real-world projects',
      'Prepare for advanced CS courses'
    ]
  },
  {
    id: 8,
    title: 'English Literature & Writing',
    description: 'Improve your writing skills and explore classic and modern literature.',
    fullDescription: 'Enhance your English language skills through literature analysis and creative writing. This course combines critical reading of classic and contemporary texts with practical writing exercises to develop both analytical and creative abilities. Perfect for students preparing for English Literature exams or wanting to improve their writing.',
    price: '$45/hour',
    rating: 4.7,
    students: 120,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    category: 'English',
    subject: 'Literature',
    duration: '10 weeks',
    level: 'Intermediate',
    instructor: 'Lisa Thompson',
    examBoard: 'AQA, Edexcel, OCR',
    modules: [
      'Poetry Analysis and Interpretation',
      'Novel Study and Character Development',
      'Drama and Theatrical Techniques',
      'Creative Writing and Style',
      'Essay Writing and Critical Analysis',
      'Contemporary Literature and Themes'
    ],
    skills: [
      'Literary analysis and interpretation',
      'Creative writing techniques',
      'Critical essay writing',
      'Character and theme analysis',
      'Poetry appreciation',
      'Comparative literature study'
    ],
    requirements: [
      'Strong reading comprehension',
      'Basic writing skills',
      'Interest in literature',
      'Regular reading commitment'
    ],
    instructorBio: 'Lisa Thompson is a published author and literature teacher with 14 years of experience. She has helped students develop both analytical and creative writing skills.',
    outcomes: [
      'Improve literary analysis skills',
      'Develop creative writing abilities',
      'Master essay writing techniques',
      'Gain appreciation for literature'
    ]
  },
  {
    id: 9,
    title: 'Physics & Chemistry',
    description: 'Understand the fundamental principles of physics and chemistry with hands-on examples.',
    fullDescription: 'Explore the fundamental sciences with our integrated Physics and Chemistry course. This unique approach shows how these subjects complement each other in understanding the natural world. From atomic structure to thermodynamics, students gain a comprehensive understanding of scientific principles.',
    price: '$55/hour',
    rating: 4.8,
    students: 90,
    image: 'https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=800&h=600&fit=crop',
    category: 'Science',
    subject: 'Physics & Chemistry',
    duration: '14 weeks',
    level: 'Intermediate',
    instructor: 'Dr. James Wilson',
    examBoard: 'Multiple',
    modules: [
      'Atomic Structure and Bonding',
      'Energy and Chemical Reactions',
      'States of Matter and Phase Changes',
      'Electricity and Electrochemistry',
      'Waves, Light and Spectroscopy',
      'Nuclear Physics and Radioactivity'
    ],
    skills: [
      'Scientific calculation and analysis',
      'Laboratory techniques and safety',
      'Data interpretation and graphing',
      'Understanding molecular behavior',
      'Chemical equation balancing',
      'Physics problem-solving'
    ],
    requirements: [
      'Strong mathematics skills',
      'Scientific calculator',
      'Interest in how things work',
      'Safety consciousness'
    ],
    instructorBio: 'Dr. James Wilson has taught both physics and chemistry for 16 years and specializes in showing the connections between these fundamental sciences.',
    outcomes: [
      'Understand fundamental scientific principles',
      'See connections between physics and chemistry',
      'Develop laboratory and analytical skills',
      'Prepare for advanced science courses'
    ]
  },
  {
    id: 10,
    title: 'Spanish Language Learning',
    description: 'Become fluent in Spanish with interactive lessons and conversation practice.',
    fullDescription: 'Embark on your Spanish language journey with our comprehensive course designed for English speakers. From basic vocabulary and grammar to advanced conversation and cultural understanding, this course uses immersive techniques to build fluency naturally and confidently.',
    price: '$40/hour',
    rating: 4.9,
    students: 180,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
    category: 'Languages',
    subject: 'Spanish',
    duration: '8 weeks',
    level: 'Beginner',
    instructor: 'Emma Rodriguez',
    examBoard: 'N/A',
    modules: [
      'Basic Vocabulary and Pronunciation',
      'Essential Grammar and Verb Conjugation',
      'Conversational Spanish and Listening',
      'Spanish Culture and Context',
      'Travel and Daily Life Spanish',
      'Advanced Communication Skills'
    ],
    skills: [
      'Spanish vocabulary building',
      'Grammar and sentence structure',
      'Listening comprehension',
      'Speaking and pronunciation',
      'Cultural awareness',
      'Real-world communication'
    ],
    requirements: [
      'No prior Spanish knowledge needed',
      'Headphones for listening exercises',
      'Regular practice commitment',
      'Interest in Spanish-speaking cultures'
    ],
    instructorBio: 'Emma Rodriguez is a native Spanish speaker and certified language teacher with 12 years of experience helping English speakers master Spanish.',
    outcomes: [
      'Achieve conversational Spanish fluency',
      'Understand Spanish grammar fundamentals',
      'Communicate confidently in Spanish',
      'Appreciate Spanish-speaking cultures'
    ]
  },
  {
    id: 11,
    title: 'Music Theory & Piano',
    description: 'Learn music theory and piano playing techniques from professional musicians.',
    fullDescription: 'Discover the beauty of music through our integrated theory and piano course. Whether you\'re a complete beginner or looking to formalize your musical knowledge, this course combines practical piano skills with essential music theory to create a well-rounded musical education.',
    price: '$50/hour',
    rating: 4.6,
    students: 75,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&h=600&fit=crop',
    category: 'Music',
    subject: 'Piano & Theory',
    duration: '12 weeks',
    level: 'Beginner',
    instructor: 'David Park',
    examBoard: 'ABRSM, Trinity',
    modules: [
      'Basic Music Theory and Notation',
      'Piano Technique and Posture',
      'Scales, Chords and Harmony',
      'Sight-Reading and Ear Training',
      'Classical and Popular Repertoire',
      'Performance Skills and Confidence'
    ],
    skills: [
      'Piano playing technique',
      'Music theory understanding',
      'Sight-reading abilities',
      'Ear training and pitch recognition',
      'Musical interpretation',
      'Performance confidence'
    ],
    requirements: [
      'Access to piano or keyboard',
      'Music stand and notation',
      'Regular practice time',
      'No prior musical experience needed'
    ],
    instructorBio: 'David Park is a professional pianist and music educator with 20 years of experience. He has performed internationally and taught students from beginner to advanced levels.',
    outcomes: [
      'Play piano with proper technique',
      'Understand music theory fundamentals',
      'Read musical notation fluently',
      'Perform with confidence and expression'
    ]
  }
]

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

                <div className="flex items-center gap-2 text-gray-600">
                  <span>Instructor:</span>
                  <span className="font-semibold text-gray-900">{course.instructor}</span>
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
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mb-4"
                    >
                      Enroll Now
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
                { id: 'instructor', label: 'Instructor', icon: UserGroupIcon },
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.skills.map((skill, index) => (
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
                      {course.outcomes.map((outcome, index) => (
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
                    {course.modules.map((module, index) => (
                      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{module}</h3>
                          </div>
                          <PlayCircleIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'instructor' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h2>
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.instructor}</h3>
                        <p className="text-gray-600">{course.subject} Expert</p>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{course.instructorBio}</p>
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
                  {course.requirements.map((requirement, index) => (
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
