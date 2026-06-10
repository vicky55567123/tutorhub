import Link from 'next/link'

export default function OLevelMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-purple-50 via-white to-violet-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">O-Level Maths Tutor</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Online O-Level Maths tutoring designed to strengthen fundamentals, improve exam performance, and help students reach top grades.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors">Book Free Consultation</Link>
            <Link href="/o-level/maths" className="px-8 py-4 border border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-colors">View Full O-Level Maths Page</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
