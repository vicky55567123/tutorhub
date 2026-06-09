'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, CalculatorIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'Number', items: ['Integers, Decimals & Fractions', 'Percentages & Ratios', 'Standard Form', 'Estimation'] },
  { name: 'Algebra & Graphs', items: ['Expressions & Equations', 'Quadratics', 'Functions & Graphs', 'Coordinate Geometry'] },
  { name: 'Geometry', items: ['Circles & Polygons', 'Trigonometry', 'Vectors', 'Transformations & Matrices'] },
  { name: 'Statistics & Probability', items: ['Data Representation', 'Mean, Median, Mode', 'Probability', 'Cumulative Frequency'] },
]

const examBoards = ['Cambridge CIE', 'Edexcel Pearson', 'Oxford AQA']

const relatedPages = [
  { name: 'GCSE Maths Tutor', href: '/gcse/maths' },
  { name: 'IGCSE Physics Tutor', href: '/igcse/physics' },
  { name: 'IGCSE Chemistry Tutor', href: '/igcse/chemistry' },
  { name: 'O-Level Maths Tutor', href: '/o-level/maths' },
  { name: 'A-Level Maths Tutor', href: '/a-level/maths' },
]

export default function IGCSEMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <CalculatorIcon className="w-4 h-4" /> IGCSE Maths
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            IGCSE Maths Tutor
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Personalized online IGCSE Maths tutoring covering the full Cambridge and Edexcel syllabus — helping international students achieve top grades.
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



      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full IGCSE Maths curriculum — Core and Extended</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircleIcon className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (
              <span key={board} className="px-5 py-2 bg-white border border-blue-200 text-blue-800 rounded-full font-semibold text-sm shadow-sm">{board}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our IGCSE Maths Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'International Curriculum Expertise', desc: 'Specialist knowledge of Cambridge CIE and Edexcel IGCSE syllabuses, including Core and Extended tiers.' },
              { title: 'A* to Grade 9 Target', desc: 'Structured lessons to help you reach the highest grade boundaries in Paper 1 and Paper 2.' },
              { title: 'Past Paper & Mark Scheme Practice', desc: 'Extensive practice with official past papers and detailed mark scheme walkthroughs.' },
              { title: 'Flexible Online Sessions', desc: 'Available worldwide — all you need is an internet connection.' },
            ].map(({ title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
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

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Improve Your IGCSE Maths Grade?</h2>
          <p className="text-blue-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-blue-700 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Get Started — Free Trial Lesson
          </Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (
              <Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">{name}</Link>
            ))}
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">← Homepage</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
