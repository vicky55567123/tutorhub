import Link from 'next/link'

export default function OnlineMathsTutorUAEPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">Online Maths Tutor UAE</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Online Maths tutoring for UAE students with support across British curricula, exam preparation, and confidence-building lesson plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors">Book Free Consultation</Link>
            <Link href="/igcse-maths-tutor" className="px-8 py-4 border border-emerald-200 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition-colors">IGCSE Maths Tutor</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
