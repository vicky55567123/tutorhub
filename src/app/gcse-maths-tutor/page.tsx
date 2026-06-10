import Link from 'next/link'

export default function GCSEMathsTutorPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">GCSE Maths Tutor</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Online GCSE Maths tutoring for Foundation and Higher tiers, focused on exam technique, confidence, and grade improvement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">Book Free Consultation</Link>
            <Link href="/gcse/maths" className="px-8 py-4 border border-blue-200 text-blue-700 rounded-xl font-semibold hover:bg-blue-50 transition-colors">View Full GCSE Maths Page</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
