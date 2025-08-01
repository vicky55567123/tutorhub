'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.', {
        duration: 5000,
        icon: '✅'
      })
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      })
      setIsSubmitting(false)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactMethods = [
    {
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      icon: PhoneIcon,
      contact: '+44 7446 255033',
      action: 'tel:+447446255033',
      available: '9 AM - 6 PM (GMT)',
      color: 'blue'
    },
    {
      title: 'WhatsApp Chat',
      description: 'Quick messaging support',
      icon: ChatBubbleLeftRightIcon,
      contact: '+44 7446 255033',
      action: 'https://wa.me/447446255033',
      available: '24/7 Response',
      color: 'green'
    },
    {
      title: 'Email Support',
      description: 'Detailed inquiries and support',
      icon: EnvelopeIcon,
      contact: 'contact@tutorhub.com',
      action: 'mailto:contact@tutorhub.com',
      available: '24 hours response',
      color: 'purple'
    },
    {
      title: 'Help Center',
      description: 'Self-service support resources',
      icon: QuestionMarkCircleIcon,
      contact: 'Browse FAQ & Guides',
      action: '/help',
      available: 'Available 24/7',
      color: 'indigo'
    }
  ]

  const supportCategories = [
    { value: 'general', label: 'General Inquiry', icon: QuestionMarkCircleIcon },
    { value: 'courses', label: 'Courses & Learning', icon: AcademicCapIcon },
    { value: 'video-lessons', label: 'Video Lessons', icon: VideoCameraIcon },
    { value: 'billing', label: 'Billing & Payments', icon: EnvelopeIcon },
    { value: 'technical', label: 'Technical Support', icon: PhoneIcon }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ChatBubbleLeftRightIcon className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get in touch with our friendly support team. We&apos;re here to help you succeed in your learning journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 bg-${method.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <method.icon className={`h-6 w-6 text-${method.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {method.description}
                </p>
                <a
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`text-${method.color}-600 hover:text-${method.color}-700 font-medium text-sm block mb-2`}
                >
                  {method.contact}
                </a>
                <div className="flex items-center text-xs text-gray-500">
                  <ClockIcon className="h-3 w-3 mr-1" />
                  {method.available}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {supportCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We typically respond within 24 hours during business days.
              </p>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Office Hours */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-blue-600" />
                Support Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM GMT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM GMT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-sm text-gray-600">
                    <strong>Emergency Support:</strong> Available 24/7 via WhatsApp for urgent technical issues.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Help
              </h3>
              <div className="space-y-3">
                <Link
                  href="/help"
                  className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <QuestionMarkCircleIcon className="h-5 w-5 text-blue-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Help Center</h4>
                      <p className="text-sm text-gray-600">Browse FAQs and guides</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/video-lessons"
                  className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <VideoCameraIcon className="h-5 w-5 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Video Lessons</h4>
                      <p className="text-sm text-gray-600">Schedule tutoring sessions</p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/courses"
                  className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-5 w-5 text-purple-600 mr-3" />
                    <div>
                      <h4 className="font-medium text-gray-900">Course Support</h4>
                      <p className="text-sm text-gray-600">Get help with course content</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Expected Response Times
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">WhatsApp Messages</span>
                  <span className="font-medium text-green-600">Within 1 hour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email Inquiries</span>
                  <span className="font-medium text-blue-600">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone Calls</span>
                  <span className="font-medium text-purple-600">Immediate</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
