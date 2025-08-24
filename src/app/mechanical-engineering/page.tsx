'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CogIcon,
  WrenchScrewdriverIcon,
  CalculatorIcon,
  BeakerIcon,
  ComputerDesktopIcon,
  ChartBarIcon,
  CheckCircleIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline'

const engineeringSubjects = [
  {
    name: 'Thermodynamics',
    icon: ChartBarIcon,
    description: 'Heat transfer, energy systems, and thermal analysis',
    topics: ['Heat Transfer', 'Energy Conversion', 'Thermal Systems', 'Entropy & Enthalpy'],
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50',
    textColor: 'text-red-800',
    difficulty: 'Advanced'
  },
  {
    name: 'Fluid Mechanics',
    icon: BeakerIcon,
    description: 'Fluid flow, pressure systems, and hydraulic engineering',
    topics: ['Fluid Properties', 'Flow Analysis', 'Pressure Systems', 'Pipe Networks'],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-800',
    difficulty: 'Intermediate'
  },
  {
    name: 'Mechanics of Materials',
    icon: WrenchScrewdriverIcon,
    description: 'Stress, strain, and material behavior under loading',
    topics: ['Stress Analysis', 'Strain Calculations', 'Material Properties', 'Failure Theories'],
    color: 'from-gray-500 to-gray-700',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-800',
    difficulty: 'Intermediate'
  },
  {
    name: 'Machine Design',
    icon: CogIcon,
    description: 'Design principles for mechanical systems and components',
    topics: ['Design Process', 'Component Selection', 'Safety Factors', 'Manufacturing'],
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800',
    difficulty: 'Advanced'
  },
  {
    name: 'Engineering Mathematics',
    icon: CalculatorIcon,
    description: 'Advanced mathematics for engineering applications',
    topics: ['Differential Equations', 'Vector Calculus', 'Linear Algebra', 'Numerical Methods'],
    color: 'from-purple-500 to-purple-700',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-800',
    difficulty: 'Foundation'
  },
  {
    name: 'CAD & Simulation',
    icon: ComputerDesktopIcon,
    description: 'Computer-aided design and engineering simulation tools',
    topics: ['3D Modeling', 'FEA Analysis', 'CFD Simulation', 'Technical Drawing'],
    color: 'from-indigo-500 to-indigo-700',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-800',
    difficulty: 'Practical'
  }
]

const careerPaths = [
  {
    title: 'Automotive Engineer',
    description: 'Design and develop vehicles and automotive systems',
    companies: ['BMW', 'Mercedes', 'Toyota', 'Tesla'],
    salary: '£35,000 - £65,000',
    icon: '🚗'
  },
  {
    title: 'Aerospace Engineer',
    description: 'Work on aircraft and spacecraft design and manufacturing',
    companies: ['Boeing', 'Airbus', 'NASA', 'SpaceX'],
    salary: '£40,000 - £75,000',
    icon: '✈️'
  },
  {
    title: 'Manufacturing Engineer',
    description: 'Optimize production processes and manufacturing systems',
    companies: ['Rolls-Royce', 'Siemens', 'GE', 'Caterpillar'],
    salary: '£30,000 - £60,000',
    icon: '🏭'
  },
  {
    title: 'Robotics Engineer',
    description: 'Design and program robotic systems and automation',
    companies: ['Boston Dynamics', 'ABB', 'KUKA', 'Fanuc'],
    salary: '£45,000 - £80,000',
    icon: '🤖'
  }
]

const features = [
  'Industry-experienced tutors',
  'Practical problem-solving approach',
  'Real-world engineering projects',
  'CAD software training included',
  'University preparation',
  'Professional certification guidance'
]

const stats = [
  { label: 'Engineering Students', value: '3,200+', icon: UserGroupIcon },
  { label: 'Average Grade Improvement', value: '1.5 Grades', icon: StarIcon },
  { label: 'Employment Rate', value: '92%', icon: BuildingOffice2Icon },
  { label: 'Industry Partners', value: '50+', icon: RocketLaunchIcon }
]

const softwareTools = [
  'SolidWorks',
  'AutoCAD',
  'ANSYS',
  'MATLAB',
  'LabVIEW',
  'Fusion 360'
]

export default function MechanicalEngineeringPage() {
  const [selectedLevel, setSelectedLevel] = useState('Foundation')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-gray-600 to-blue-600 rounded-2xl">
                <CogIcon className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-700 to-blue-600 bg-clip-text text-transparent">
                Mechanical Engineering
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Master the principles of mechanical engineering with expert tutoring in thermodynamics, 
              fluid mechanics, machine design, and cutting-edge CAD technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/courses?category=Mechanical-Engineering"
                className="px-8 py-4 bg-gradient-to-r from-gray-700 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Browse Engineering Courses
              </Link>
              <Link
                href="/tutors?subject=Mechanical-Engineering"
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
              >
                Find Engineering Tutors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
              >
                <stat.icon className="h-8 w-8 text-gray-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Subjects */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Engineering Subjects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master fundamental and advanced mechanical engineering concepts with our expert tutors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {engineeringSubjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${subject.bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${subject.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                    <subject.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    subject.difficulty === 'Foundation' ? 'bg-green-100 text-green-800' :
                    subject.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    subject.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {subject.difficulty}
                  </span>
                </div>
                
                <h3 className={`text-xl font-bold ${subject.textColor} mb-3`}>
                  {subject.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {subject.description}
                </p>
                
                <div className="space-y-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <div key={topicIndex} className="flex items-center">
                      <CheckCircleIcon className={`w-4 h-4 ${subject.textColor} mr-2 flex-shrink-0`} />
                      <span className="text-gray-700 text-sm">{topic}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link
                    href={`/subjects/${subject.name.toLowerCase().replace(' ', '-')}`}
                    className={`inline-flex items-center text-sm font-medium ${subject.textColor} hover:underline`}
                  >
                    Learn More
                    <motion.svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Tools */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-gray-700 to-blue-600 rounded-3xl p-8 lg:p-12 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Industry-Standard Software Training</h3>
              <p className="text-xl text-gray-100 max-w-3xl mx-auto">
                Learn the professional software tools used by mechanical engineers worldwide
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {softwareTools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <ComputerDesktopIcon className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="font-semibold text-white">{tool}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Career Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore exciting career paths in mechanical engineering with excellent prospects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerPaths.map((career, index) => (
              <motion.div
                key={career.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{career.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{career.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{career.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Top Companies:</h4>
                  <p className="text-gray-600 text-sm">{career.companies.join(', ')}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Salary Range:</h4>
                  <p className="text-green-600 font-semibold text-sm">{career.salary}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Why Choose Our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-blue-600">
                    Engineering Programme?
                  </span>
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Our comprehensive mechanical engineering programme combines theoretical knowledge 
                  with practical applications, preparing you for a successful engineering career.
                </p>
                <Link
                  href="/courses?category=Mechanical-Engineering"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-700 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Start Your Engineering Journey
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200"
                  >
                    <CheckCircleIcon className="w-6 h-6 text-gray-600 mr-4 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
