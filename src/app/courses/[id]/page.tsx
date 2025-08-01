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
    description: 'Master GCSE Chemistry with expert guidance through Atomic Structure, Chemical Bonding, Reactions, Quantitative Analysis and Organic Chemistry - designed for grades 4-9 across all exam boards.',
    fullDescription: 'Discover the fascinating molecular world with our comprehensive GCSE Chemistry course, expertly designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. From fundamental atomic theory and chemical bonding to complex organic reactions and quantitative analysis, our structured approach combines theoretical understanding with practical application. Students master essential chemical calculations, equation balancing, and laboratory techniques through engaging virtual experiments, real-world examples, and targeted exam practice.',
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
    instructorBio: 'Dr. Emma Thompson is a chemistry education specialist with 12 years of GCSE teaching experience and a PhD in Organic Chemistry. She has developed innovative teaching methods that make complex chemistry concepts accessible and enjoyable, with over 95% of her students achieving their target grades. Her approach combines visual learning, practical applications, and exam-focused strategies.',
    outcomes: [
      'Achieve GCSE Chemistry grade 4-9 with comprehensive exam preparation',
      'Master chemical concepts, calculations, and practical laboratory techniques',
      'Develop strong analytical skills for complex chemical problems and reactions',
      'Understand real-world chemistry applications in industry, medicine, and environment',
      'Build confidence in laboratory work, safety procedures, and scientific investigation',
      'Prepare effectively for A-Level Chemistry or science-related university courses'
    ]
  },
  {
    id: 4,
    title: 'GCSE Biology (Grades 4-9)',
    description: 'Master GCSE Biology through comprehensive coverage of Cell Biology, Human Body Systems, Genetics, Evolution and Ecology - expertly designed for grades 4-9 success across all exam boards.',
    fullDescription: 'Explore the fascinating world of living organisms with our comprehensive GCSE Biology course, specially designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. From microscopic cellular processes and DNA structure to complex ecological relationships and human physiology, our expert-led program combines cutting-edge visual learning tools, interactive diagrams, virtual laboratory experiences, and real-world case studies to make biology both understandable and memorable.',
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
    instructorBio: 'Dr. Michael Roberts combines 18 years of biology teaching excellence with active field research experience in marine biology and genetics. He brings cutting-edge biological discoveries into the classroom through virtual lab experiences and real-world case studies. His students consistently achieve top grades, with 92% reaching grades 7-9 in recent years.',
    outcomes: [
      'Achieve GCSE Biology grade 4-9 with comprehensive understanding of life processes',
      'Master complex biological concepts through visual learning and practical applications',
      'Develop advanced scientific investigation and experimental design skills',
      'Apply biological knowledge to analyze current environmental and medical issues',
      'Build strong foundation for A-Level Biology or biomedical science careers',
      'Understand human impact on ecosystems and sustainable development principles'
    ]
  },
  {
    id: 5,
    title: 'GCSE Computer Science (Grades 4-9)',
    description: 'Master GCSE Computer Science through hands-on programming in Python, algorithm design, computer systems architecture, and computational thinking - designed for grades 4-9 across all exam boards.',
    fullDescription: 'Step into the digital future with our comprehensive GCSE Computer Science course, expertly designed to help students achieve grades 4-9 across AQA, Edexcel, and OCR exam boards. Master programming fundamentals through Python, explore computer systems architecture, develop algorithmic thinking, and understand how technology shapes our world. Our hands-on approach combines practical coding projects, theoretical understanding, and real-world problem-solving to prepare students for the digital economy and potential computer science careers.',
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
      'Programming Fundamentals Python',
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
    instructorBio: 'Mr. James Chen is a software engineer turned educator with 10 years of industry experience at leading tech companies and 8 years teaching GCSE Computer Science. He specializes in making programming concepts accessible and engaging, with 89% of his students achieving grades 7-9. His real-world industry knowledge brings practical relevance to every lesson.',
    outcomes: [
      'Achieve GCSE Computer Science grade 4-9 with confidence in both theory and practical programming',
      'Master Python programming with ability to create complex, well-structured programs',
      'Understand computer systems architecture and how hardware and software interact',
      'Develop advanced computational thinking and problem-solving methodologies',
      'Build portfolio of programming projects demonstrating technical skills',
      'Prepare for A-Level Computer Science or technology-related career pathways'
    ]
  },
  {
    id: 6,
    title: 'Advanced Mathematics (A-Level Preparation)',
    description: 'Bridge the gap to A-Level success with advanced topics in Calculus, Complex Algebra, Statistics, and Mechanics - comprehensive preparation for high-achieving GCSE students.',
    fullDescription: 'Excel in your transition from GCSE to A-Level Mathematics with our comprehensive advanced preparation course, designed for high-achieving students aiming for top grades. Master differential and integral calculus fundamentals, explore complex algebraic functions, delve into advanced statistical concepts, and understand mechanical principles. Our expert-led program builds the sophisticated mathematical thinking and problem-solving skills essential for A-Level success and university-level mathematics.',
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
      'Achieve seamless transition to A-Level Mathematics with advanced preparation',
      'Master calculus fundamentals including differentiation and integration techniques',
      'Develop sophisticated mathematical reasoning and advanced problem-solving skills',
      'Build exceptional confidence for higher mathematics and university-level study',
      'Excel in complex algebraic manipulation and advanced function analysis',
      'Prepare for competitive mathematics examinations and STEM career pathways'
    ]
  },
  // Add other courses with similar detailed structure...
  {
    id: 7,
    title: 'Computer Science Fundamentals',
    description: 'Master computer science fundamentals through hands-on programming, algorithm design, and software development principles - perfect preparation for tech careers or advanced study.',
    fullDescription: 'Build an exceptional foundation in computer science with our comprehensive fundamentals course, designed for students seeking careers in technology or advanced computer science study. Master programming concepts through Python, explore sophisticated algorithms and data structures, understand object-oriented design principles, and gain practical experience with databases and web development. Our industry-expert instructors combine theoretical knowledge with hands-on projects and real-world applications to ensure graduates are well-prepared for the modern tech landscape.',
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
    instructorBio: 'Prof. Michael Chen brings exceptional credentials with 15 years of industry experience at major tech companies including Google and Microsoft, plus 8 years teaching computer science at university level. He specializes in making complex programming concepts accessible through practical, project-based learning. His students consistently achieve excellent outcomes, with many securing positions at top tech companies.',
    outcomes: [
      'Master comprehensive programming fundamentals with industry-standard practices',
      'Understand core computer science principles and algorithmic thinking',
      'Build impressive portfolio of real-world projects demonstrating technical skills',
      'Prepare thoroughly for advanced computer science courses or tech career entry',
      'Develop professional software development and project management abilities',
      'Gain confidence in modern programming languages and development environments'
    ]
  },
  {
    id: 8,
    title: 'English Literature & Writing',
    description: 'Master English Literature analysis and creative writing through expert guidance with classic and contemporary texts - designed for exam success and lifelong literary appreciation.',
    fullDescription: 'Transform your English language abilities through our comprehensive Literature and Writing course, expertly designed for students preparing for GCSE/A-Level English Literature or those seeking to enhance their analytical and creative writing skills. Explore classic and contemporary literature through guided analysis, develop sophisticated essay-writing techniques, and unleash your creative potential through structured writing exercises. Our experienced instructors combine deep literary knowledge with practical writing strategies to build confidence in both critical analysis and creative expression.',
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
    instructorBio: 'Lisa Thompson is a published author and accomplished literature educator with 14 years of teaching experience across GCSE and A-Level English Literature. Her novel "Whispers in the Wind" won the 2019 Literary Excellence Award. She combines deep literary scholarship with practical writing expertise, helping students achieve outstanding results with 94% reaching their target grades.',
    outcomes: [
      'Develop sophisticated literary analysis skills with confidence in textual interpretation',
      'Master advanced creative writing techniques across multiple genres and styles',
      'Excel in essay writing with clear structure, compelling arguments, and elegant expression',
      'Gain deep appreciation for literature spanning classic and contemporary works',
      'Build strong foundation for A-Level English Literature or university English studies',
      'Develop critical thinking skills applicable across academic disciplines and professional contexts'
    ]
  },
  {
    id: 9,
    title: 'Physics & Chemistry',
    description: 'Master the fundamental principles of physics and chemistry through an integrated approach that reveals the deep connections between these essential sciences.',
    fullDescription: 'Discover the interconnected world of physical sciences with our unique integrated Physics and Chemistry course, designed to show how these fundamental subjects complement and enhance each other in understanding the natural world. From atomic structure and chemical bonding to thermodynamics and electromagnetic phenomena, students develop a comprehensive understanding of scientific principles. Our expert-led approach combines theoretical knowledge with practical applications, laboratory techniques, and real-world problem-solving to prepare students for advanced scientific study or STEM careers.',
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
    instructorBio: 'Dr. James Wilson has 16 years of experience teaching both physics and chemistry at university and secondary levels, with a PhD in Physical Chemistry from Cambridge University. He specializes in demonstrating the fascinating connections between these fundamental sciences through innovative teaching methods and hands-on experiments. His interdisciplinary approach helps students achieve exceptional understanding of scientific principles.',
    outcomes: [
      'Master fundamental scientific principles across physics and chemistry with deep understanding',
      'Recognize and apply the powerful connections between physical and chemical phenomena',
      'Develop advanced laboratory skills, safety awareness, and analytical techniques',
      'Build strong foundation for A-Level Sciences or specialized STEM career pathways',
      'Excel in scientific problem-solving with mathematical modeling and data analysis',
      'Understand real-world applications of science in technology, medicine, and industry'
    ]
  },
  {
    id: 10,
    title: 'Spanish Language Learning',
    description: 'Master Spanish language skills through immersive learning techniques, conversation practice, and cultural exploration - from complete beginner to confident communicator.',
    fullDescription: 'Embark on an exciting Spanish language journey with our comprehensive immersive course, expertly designed for English speakers seeking to achieve genuine fluency. From foundational vocabulary and essential grammar structures to advanced conversation skills and cultural understanding, our native-speaker instructors use proven immersive techniques, interactive exercises, and real-world scenarios to build natural Spanish communication abilities. Perfect for travel, career advancement, or personal enrichment.',
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
    instructorBio: 'Emma Rodriguez is a native Spanish speaker from Madrid and certified language educator with 12 years of specialized experience helping English speakers master Spanish. She holds advanced qualifications in language pedagogy and has developed innovative immersive teaching methods. Her students achieve remarkable fluency rates, with 91% reaching conversational level within the course duration.',
    outcomes: [
      'Achieve genuine conversational Spanish fluency for real-world communication',
      'Master Spanish grammar fundamentals with confidence in complex sentence structures',
      'Communicate naturally in Spanish across social, professional, and travel contexts',
      'Develop deep appreciation and understanding of Spanish-speaking cultures worldwide',
      'Build strong foundation for advanced Spanish study or professional language use',
      'Gain cultural competency essential for international business or travel experiences'
    ]
  },
  {
    id: 11,
    title: 'Music Theory & Piano',
    description: 'Master piano performance and music theory through expert instruction - from complete beginner to confident musician with professional technique and deep musical understanding.',
    fullDescription: 'Discover the transformative power of music through our comprehensive integrated piano and theory course, expertly designed for students of all levels seeking genuine musical mastery. Whether you\'re a complete beginner or looking to formalize existing musical knowledge, our professional musician instructors combine practical piano technique, essential music theory, and performance skills to create exceptional musical education. Prepare for ABRSM and Trinity examinations while developing lifelong musical appreciation and skills.',
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
    instructorBio: 'David Park is a distinguished professional pianist and music educator with 20 years of performance and teaching experience. He has performed internationally in prestigious venues including Carnegie Hall and Royal Albert Hall, and holds advanced certifications from both ABRSM and Trinity colleges. His students consistently achieve distinction grades in formal examinations, with many pursuing successful musical careers.',
    outcomes: [
      'Develop exceptional piano technique with proper posture, fingering, and musical expression',
      'Master comprehensive music theory including harmony, rhythm, and compositional principles',
      'Achieve fluent sight-reading abilities for confident performance of diverse repertoire',
      'Build sophisticated ear training skills for pitch recognition and musical analysis',
      'Perform with genuine confidence, artistry, and professional presentation skills',
      'Prepare successfully for ABRSM/Trinity examinations or pursue advanced musical study'
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
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">What You&apos;ll Learn</h3>
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
                    {course.modules.map((module, index) => {
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
