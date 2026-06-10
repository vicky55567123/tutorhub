import Link from 'next/link'

export default function IGCSEMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">IGCSE Maths Tutor</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Specialist online IGCSE Maths tutoring for Cambridge and Edexcel students with targeted support for Core and Extended papers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors">Book Free Consultation</Link>
            <Link href="/igcse/maths" className="px-8 py-4 border border-indigo-200 text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">View Full IGCSE Maths Page</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
