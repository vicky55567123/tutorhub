'use client'

import { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'

export default function BookingFormSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    studentGrade: '',
    message: '',
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const text = `Hi, I'd like to book a free consultation.%0A%0AName: ${encodeURIComponent(formData.name)}%0AEmail: ${encodeURIComponent(formData.email)}%0AWhatsApp: ${encodeURIComponent(formData.whatsapp)}%0AStudent Grade: ${encodeURIComponent(formData.studentGrade)}%0AMessage: ${encodeURIComponent(formData.message)}`
    window.open(`https://wa.me/447446255033?text=${text}`, '_blank', 'noopener,noreferrer')

    toast.success('Consultation request prepared on WhatsApp')

    setFormData({
      name: '',
      email: '',
      whatsapp: '',
      studentGrade: '',
      message: '',
    })
  }

  return (
    <section className="bg-white border-t border-gray-200 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Book Free Consultation</h2>
          <p className="text-gray-600 mt-2">Tell us about your child and we&apos;ll get back to you quickly.</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div>
            <label htmlFor="booking-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="booking-name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Parent or student name"
            />
          </div>

          <div>
            <label htmlFor="booking-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="booking-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="booking-whatsapp" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
            <input
              id="booking-whatsapp"
              type="text"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="+44..."
            />
          </div>

          <div>
            <label htmlFor="booking-grade" className="block text-sm font-medium text-gray-700 mb-1">Student Grade</label>
            <input
              id="booking-grade"
              type="text"
              required
              value={formData.studentGrade}
              onChange={(e) => setFormData({ ...formData, studentGrade: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g. Year 11 / Grade 5"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="booking-message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="booking-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Tell us the subject, exam board, and goals."
            />
          </div>

          <div className="md:col-span-2 text-center mt-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors"
            >
              Book Free Consultation
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
