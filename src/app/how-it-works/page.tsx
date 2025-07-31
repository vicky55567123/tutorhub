import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How It Works - TutorHub',
  description: 'Learn how TutorHub connects students with expert tutors for personalized online learning',
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How TutorHub Works
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Get matched with expert tutors in just 3 simple steps and start learning today
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Tutor</h3>
            <p className="text-gray-600 leading-relaxed">
              Browse our extensive network of qualified tutors. Filter by subject, experience level, 
              availability, and teaching style to find the perfect match for your learning needs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-secondary-600">2</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Lesson</h3>
            <p className="text-gray-600 leading-relaxed">
              Book a lesson at a time that works for you. Choose from one-time sessions or 
              ongoing tutoring packages. Get instant confirmation and Google Meet links.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="w-20 h-20 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl font-bold text-accent-600">3</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Start Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Join your HD video lesson and learn with personalized attention. Track your progress, 
              get homework help, and achieve your academic goals with expert guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TutorHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We&apos;ve designed every feature to make online learning effective, engaging, and accessible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">HD Video Lessons</h3>
              <p className="text-gray-600">
                Crystal-clear video quality with Google Meet integration for seamless online learning experiences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Personalized Learning</h3>
              <p className="text-gray-600">
                Every lesson is tailored to your unique learning style, pace, and academic goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling</h3>
              <p className="text-gray-600">
                Book lessons when it&apos;s convenient for you, with 24/7 availability from global tutors.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Tutors</h3>
              <p className="text-gray-600">
                Learn from qualified professionals with proven track records and subject expertise.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed progress reports and learning analytics.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Get help whenever you need it with our dedicated student support team.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* GCSE Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Specialized GCSE Support
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get expert help with your GCSE subjects from tutors who understand the curriculum 
                and exam requirements inside out.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Mathematics</h4>
                  <p className="text-sm text-gray-600">Algebra, Geometry, Statistics</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">English</h4>
                  <p className="text-sm text-gray-600">Literature, Language, Writing</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Sciences</h4>
                  <p className="text-sm text-gray-600">Biology, Chemistry, Physics</p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Languages</h4>
                  <p className="text-sm text-gray-600">French, Spanish, German</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">GCSE Success Stats</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Grade Improvement</span>
                    <span className="font-bold text-primary-600">89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary-600 h-2 rounded-full w-[89%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Student Satisfaction</span>
                    <span className="font-bold text-secondary-600">96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary-600 h-2 rounded-full w-[96%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Exam Pass Rate</span>
                    <span className="font-bold text-accent-600">94%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-accent-600 h-2 rounded-full w-[94%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have improved their grades and confidence with TutorHub
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/courses"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Browse Courses
            </Link>
            <Link
              href="/tutors"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
            >
              Find a Tutor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
