'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, CalculatorIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'Number', items: ['Fractions, Decimals & Percentages', 'Powers, Roots & Indices', 'Standard Form', 'Rational & Irrational Numbers'] },
  { name: 'Algebra', items: ['Linear & Quadratic Equations', 'Simultaneous Equations', 'Sequences', 'Algebraic Manipulation'] },
  { name: 'Geometry', items: ['Angles & Polygons', 'Circles', 'Trigonometry', 'Vectors & Transformations'] },
  { name: 'Statistics & Probability', items: ['Data Analysis', 'Averages & Spread', 'Probability', 'Graphs & Charts'] },
]

const examBoards = ['Cambridge International', 'Oxford AQA']

const relatedPages = [
  { name: 'O-Level Physics Tutor', href: '/o-level/physics' },
  { name: 'O-Level Chemistry Tutor', href: '/o-level/chemistry' },
  { name: 'IGCSE Maths Tutor', href: '/igcse/maths' },
  { name: 'GCSE Maths Tutor', href: '/gcse/maths' },
  { name: 'A-Level Maths Tutor', href: '/a-level/maths' },
]

export default function OLevelMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-purple-50 via-white to-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CalculatorIcon className="w-4 h-4" /> O-Level Maths
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">O-Level Maths Tutor</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Expert online O-Level Maths tutoring for Cambridge International students — building strong foundations and targeting A* grades.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold text-lg hover:bg-purple-700 transition-colors shadow-lg">Book a Free Trial Lesson</Link>
            <Link href="/" className="px-8 py-4 border-2 border-purple-200 text-purple-700 rounded-xl font-semibold text-lg hover:bg-purple-50 transition-colors">Back to Homepage</Link>
          </motion.div>
        </div>
      </section>



      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full O-Level Maths curriculum — Cambridge International syllabus</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="font-bold text-purple-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">{section.items.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircleIcon className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (<span key={board} className="px-5 py-2 bg-white border border-purple-200 text-purple-800 rounded-full font-semibold text-sm shadow-sm">{board}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our O-Level Maths Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Cambridge Syllabus Expertise', desc: 'Deep knowledge of the Cambridge O-Level Maths syllabus with targeted past paper practice.' },
              { title: 'A* Grade Strategy', desc: 'Focus on the higher-mark questions and topics most commonly tested at the top grade boundary.' },
              { title: 'International Student Support', desc: 'Experienced tutoring students across Pakistan, Sri Lanka, Malaysia, and beyond.' },
              { title: 'Flexible Online Sessions', desc: 'Available worldwide — all you need is an internet connection.' },
            ].map(({ title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AcademicCapIcon className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{title}</h3><p className="text-gray-600 text-sm">{desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your O-Level Maths Grade?</h2>
          <p className="text-purple-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50 transition-colors shadow-lg">Get Started — Free Trial Lesson</Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (<Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">{name}</Link>))}
            <Link href="/" className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">← Homepage</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
