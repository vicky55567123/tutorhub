import Link from 'next/link'

export default function Top10GCSEMathsExamMistakesPage() {
  return (
    <article className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-3">Published: 2026-06-10</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Top 10 GCSE Maths Exam Mistakes</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>These are the most common mistakes GCSE Maths students make in exams — and how to avoid them.</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Not reading the question fully before starting.</li>
            <li>Dropping minus signs in algebra and equations.</li>
            <li>Using the wrong formula for area/volume questions.</li>
            <li>Rounding too early and losing method marks.</li>
            <li>Forgetting units in final answers.</li>
            <li>Miscalculating percentages and ratio scaling.</li>
            <li>Skipping working out on calculator questions.</li>
            <li>Ignoring command words like “estimate” or “show that”.</li>
            <li>Spending too long on one hard question.</li>
            <li>Not checking answers in the final 5 minutes.</li>
          </ol>
          <p>Use past papers weekly and keep an “error log” to track repeated mistakes and fix them quickly.</p>
        </div>
        <div className="mt-10">
          <Link href="/contact" className="inline-flex px-6 py-3 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Book Free Consultation
          </Link>
        </div>
      </div>
    </article>
  )
}
