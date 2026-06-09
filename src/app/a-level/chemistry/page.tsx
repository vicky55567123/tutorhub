'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { AcademicCapIcon, CheckCircleIcon, StarIcon, ClockIcon, UserGroupIcon, BeakerIcon } from '@heroicons/react/24/outline'

const topics = [
  { name: 'Physical Chemistry', items: ['Atomic Structure & Bonding', 'Energetics & Thermodynamics', 'Kinetics', 'Equilibrium & Acids'] },
  { name: 'Inorganic Chemistry', items: ['Periodicity', 'Group 2 & Group 7', 'Transition Metals', 'Reactions in Aqueous Solution'] },
  { name: 'Organic Chemistry', items: ['Nomenclature & Isomerism', 'Alkanes, Alkenes & Arenes', 'Carbonyl Compounds', 'Polymers & Amino Acids'] },
  { name: 'Analytical Chemistry', items: ['Mass Spectrometry', 'Infrared Spectroscopy', 'NMR Spectroscopy', 'Chromatography'] },
]

const examBoards = ['AQA', 'Edexcel', 'OCR', 'Cambridge CIE']

const relatedPages = [
  { name: 'A-Level Maths Tutor', href: '/a-level/maths' },
  { name: 'A-Level Physics Tutor', href: '/a-level/physics' },
  { name: 'GCSE Chemistry Tutor', href: '/gcse/chemistry' },
  { name: 'IGCSE Chemistry Tutor', href: '/igcse/chemistry' },
  { name: 'O-Level Chemistry Tutor', href: '/o-level/chemistry' },
]

export default function ALevelChemistryTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-teal-50 via-white to-green-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <BeakerIcon className="w-4 h-4" /> A-Level Chemistry
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">A-Level Chemistry Tutor</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Specialized online A-Level Chemistry tutoring covering Physical, Inorganic, and Organic Chemistry — helping you understand the content deeply and perform brilliantly in exams.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-teal-600 text-white rounded-xl font-semibold text-lg hover:bg-teal-700 transition-colors shadow-lg">Book a Free Trial Lesson</Link>
            <Link href="/" className="px-8 py-4 border-2 border-teal-200 text-teal-700 rounded-xl font-semibold text-lg hover:bg-teal-50 transition-colors">Back to Homepage</Link>
          </motion.div>
        </div>
      </section>



      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Topics Covered</h2>
          <p className="text-gray-500 text-center mb-10">Full A-Level Chemistry curriculum — AS and A2</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((section) => (
              <motion.div key={section.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                <h3 className="font-bold text-teal-900 mb-3">{section.name}</h3>
                <ul className="space-y-2">{section.items.map((item) => (<li key={item} className="flex items-start gap-2 text-sm text-gray-700"><CheckCircleIcon className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />{item}</li>))}</ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Boards Covered</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {examBoards.map((board) => (<span key={board} className="px-5 py-2 bg-white border border-teal-200 text-teal-800 rounded-full font-semibold text-sm shadow-sm">{board}</span>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Our A-Level Chemistry Tutoring?</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'All Three Branches Covered', desc: 'Comprehensive coverage of Physical, Inorganic, and Organic Chemistry in one tutor.' },
              { title: 'Mechanism & Synthesis Mastery', desc: 'Clear, step-by-step teaching of organic mechanisms and multi-step synthesis routes.' },
              { title: 'Exam Board Specific Preparation', desc: 'Tailored lessons for AQA, Edexcel, OCR, and Cambridge — matching your exact mark scheme.' },
              { title: 'University STEM Pathway', desc: 'Ideal preparation for Medicine, Pharmacy, Chemical Engineering, and Biochemistry degrees.' },
            ].map(({ title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <AcademicCapIcon className="w-8 h-8 text-teal-500 flex-shrink-0 mt-1" />
                <div><h3 className="font-bold text-gray-900 mb-1">{title}</h3><p className="text-gray-600 text-sm">{desc}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 to-green-600 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Excel at A-Level Chemistry?</h2>
          <p className="text-teal-100 mb-8 text-lg">Book a free trial lesson today and see the difference personalized tutoring makes.</p>
          <Link href="/contact" className="px-10 py-4 bg-white text-teal-700 rounded-xl font-bold text-lg hover:bg-teal-50 transition-colors shadow-lg">Get Started — Free Trial Lesson</Link>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Explore Other Subjects & Curricula</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPages.map(({ name, href }) => (<Link key={href} href={href} className="px-4 py-2 bg-gray-100 hover:bg-teal-50 text-gray-700 hover:text-teal-700 rounded-lg text-sm font-medium transition-colors border border-gray-200">{name}</Link>))}
            <Link href="/" className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">← Homepage</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
