'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, CalculatorIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'Number & Arithmetic', items: ['Fractions, Decimals & Percentages', 'Powers & Roots', 'Standard Form', 'Surds'] },
  { name: 'Algebra', items: ['Solving Equations & Inequalities', 'Quadratics & Factorising', 'Sequences & Series', 'Simultaneous Equations'] },
  { name: 'Geometry & Measures', items: ['Angles, Shapes & Circles', 'Trigonometry', 'Vectors', 'Transformations'] },
  { name: 'Statistics & Probability', items: ['Data Handling & Graphs', 'Mean, Median & Mode', 'Probability Trees', 'Scatter Diagrams'] },
]

const examBoards = ['AQA', 'Edexcel', 'OCR', 'WJEC', 'Cambridge']

const relatedPages = [
  { name: 'GCSE Physics Tutor', href: '/gcse/physics' },
  { name: 'GCSE Chemistry Tutor', href: '/gcse/chemistry' },
  { name: 'IGCSE Maths Tutor', href: '/igcse/maths' },
  { name: 'O-Level Maths Tutor', href: '/o-level/maths' },
  { name: 'A-Level Maths Tutor', href: '/a-level/maths' },
]

export default function GCSEMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <CalculatorIcon className="w-4 h-4" /> GCSE Maths
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            GCSE Maths Tutor
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Personalized online GCSE Maths tutoring to help you build confidence, master key topics, and achieve the grade you need.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg">
              Book a Free Trial Lesson
            </Link>
            <Link href="/" className="px-8 py-4 border-2 border-blue-200 text-blue-700 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Back to Homepage
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}


      {/* Topics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full GCSE Maths curriculum — Foundation and Higher tier</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-blue-50 rounded-2xl p-6 border border-blue-100"
              >
                <h3 className="font-bold text-blue-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Exam Boards */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (
              <span key={board} className="px-5 py-2 bg-white border border-blue-200 text-blue-800 rounded-full font-semibold text-sm shadow-sm">
                {board}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our GCSE Maths Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Tailored to Your Exam Board', desc: 'Lessons are aligned to your specific GCSE syllabus, whether AQA, Edexcel, OCR or WJEC.' },
              { title: 'Foundation & Higher Tier', desc: 'Whether you\'re targeting a grade 4 or a grade 9, lessons are adapted to your level.' },
              { title: 'Past Paper Practice', desc: 'Regular exam-style questions and past papers to build familiarity and exam technique.' },
              { title: 'Flexible Online Sessions', desc: 'Learn from home at a time that suits you. Sessions available evenings and weekends.' },
            ].map(({ title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm"
              >
                <AcademicCapIcon className="w-8 h-8 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your GCSE Maths Grade?</h2>
          <p className="text-blue-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Get Started — Free Trial Lesson
          </Link>
        </div>
      </section>

      {/* Related Pages */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">
                {name}
              </Link>
            ))}
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              ← Homepage
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
