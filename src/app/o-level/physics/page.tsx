'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, BoltIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'General Physics', items: ['Measurements & Units', 'Kinematics', 'Forces & Newton\'s Laws', 'Momentum & Energy'] },
  { name: 'Thermal Physics', items: ['Kinetic Theory', 'Thermal Properties', 'Transfer of Thermal Energy', 'Gas Laws'] },
  { name: 'Waves', items: ['Wave Motion', 'Light & Optics', 'Sound', 'Electromagnetic Spectrum'] },
  { name: 'Electricity & Modern', items: ['Circuits & Ohm\'s Law', 'Magnetism & Electromagnetism', 'Radioactivity', 'Nuclear Physics'] },
]

const examBoards = ['Cambridge International', 'Oxford AQA']

const relatedPages = [
  { name: 'O-Level Maths Tutor', href: '/o-level/maths' },
  { name: 'O-Level Chemistry Tutor', href: '/o-level/chemistry' },
  { name: 'IGCSE Physics Tutor', href: '/igcse/physics' },
  { name: 'GCSE Physics Tutor', href: '/gcse/physics' },
  { name: 'A-Level Physics Tutor', href: '/a-level/physics' },
]

export default function OLevelPhysicsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-orange-50 via-white to-red-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BoltIcon className="w-4 h-4" /> O-Level Physics
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">O-Level Physics Tutor</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Expert online O-Level Physics tutoring covering the Cambridge International syllabus, helping students build strong conceptual foundations and achieve top grades.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold text-lg hover:bg-orange-700 transition-colors shadow-lg">Book a Free Trial Lesson</Link>
            <Link href="/" className="px-8 py-4 border-2 border-orange-200 text-orange-700 rounded-xl font-semibold text-lg hover:bg-orange-50 transition-colors">Back to Homepage</Link>
          </motion.div>
        </div>
      </section>



      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full O-Level Physics curriculum — Cambridge International syllabus</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-orange-50 rounded-2xl p-6 border border-orange-100">
                <h3 className="font-bold text-orange-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">{section.items.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircleIcon className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (<span key={board} className="px-5 py-2 bg-white border border-orange-200 text-orange-800 rounded-full font-semibold text-sm shadow-sm">{board}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our O-Level Physics Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Cambridge Syllabus Focus', desc: 'Lessons built around the Cambridge O-Level 5054 syllabus with targeted paper practice.' },
              { title: 'Clear Physics Explanations', desc: 'Complex concepts broken down with diagrams, worked examples, and real-world context.' },
              { title: 'International Student Support', desc: 'Experienced working with students across South Asia, Southeast Asia, and Africa.' },
              { title: 'Flexible Online Sessions', desc: 'Available worldwide — all you need is an internet connection.' },
            ].map(({ title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AcademicCapIcon className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{title}</h3><p className="text-gray-600 text-sm">{desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your O-Level Physics Grade?</h2>
          <p className="text-orange-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-orange-700 rounded-xl font-bold text-lg hover:bg-orange-50 transition-colors shadow-lg">Get Started — Free Trial Lesson</Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (<Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">{name}</Link>))}
            <Link href="/" className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">← Homepage</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
