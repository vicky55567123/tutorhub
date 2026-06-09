'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, CalculatorIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'Pure Maths 1 & 2', items: ['Proof & Algebra', 'Coordinate Geometry', 'Sequences & Series', 'Calculus — Differentiation & Integration'] },
  { name: 'Pure Maths 3 & 4', items: ['Functions & Transformations', 'Trigonometry & Identities', 'Further Calculus', 'Differential Equations'] },
  { name: 'Statistics', items: ['Probability Distributions', 'Normal Distribution', 'Statistical Hypothesis Testing', 'Regression & Correlation'] },
  { name: 'Mechanics', items: ['Kinematics in 1D & 2D', 'Newton\'s Laws', 'Moments', 'Projectile Motion'] },
]

const examBoards = ['AQA', 'Edexcel', 'OCR', 'Cambridge CIE', 'OCR MEI']

const relatedPages = [
  { name: 'A-Level Physics Tutor', href: '/a-level/physics' },
  { name: 'A-Level Chemistry Tutor', href: '/a-level/chemistry' },
  { name: 'GCSE Maths Tutor', href: '/gcse/maths' },
  { name: 'IGCSE Maths Tutor', href: '/igcse/maths' },
  { name: 'O-Level Maths Tutor', href: '/o-level/maths' },
]

export default function ALevelMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <CalculatorIcon className="w-4 h-4" /> A-Level Maths
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">A-Level Maths Tutor</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Expert online A-Level Maths tutoring covering Pure Maths, Statistics, and Mechanics — helping you build deep understanding and achieve top grades for university.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg">Book a Free Trial Lesson</Link>
            <Link href="/" className="px-8 py-4 border-2 border-indigo-200 text-indigo-700 rounded-xl font-semibold text-lg hover:bg-indigo-50 transition-colors">Back to Homepage</Link>
          </motion.div>
        </div>
      </section>



      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full A-Level Maths curriculum — AS and A2</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="font-bold text-indigo-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">{section.items.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircleIcon className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (<span key={board} className="px-5 py-2 bg-white border border-indigo-200 text-indigo-800 rounded-full font-semibold text-sm shadow-sm">{board}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our A-Level Maths Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Deep Understanding Over Memorisation', desc: 'A-Level Maths rewards real understanding. Lessons focus on building genuine mathematical thinking.' },
              { title: 'All Exam Boards Covered', desc: 'Whether you\'re sitting AQA, Edexcel, OCR, or Cambridge — lessons are aligned to your exact syllabus.' },
              { title: 'Exam Technique & Grade Boundaries', desc: 'Targeted practice on A and A* grade questions, mark scheme familiarity, and exam timing.' },
              { title: 'University Application Support', desc: 'Strong A-Level Maths grades open doors — we help you get there.' },
            ].map(({ title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AcademicCapIcon className="w-8 h-8 text-indigo-500 flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{title}</h3><p className="text-gray-600 text-sm">{desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel at A-Level Maths?</h2>
          <p className="text-indigo-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-indigo-700 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg">Get Started — Free Trial Lesson</Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (<Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">{name}</Link>))}
            <Link href="/" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">← Homepage</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
