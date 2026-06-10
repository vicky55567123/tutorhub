import Link from 'next/link'

export default function HowToGetGrade9InGCSEMathsPage() {
  return (
    <article className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-3">Published: 2026-06-10</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">How to Get Grade 9 in GCSE Maths</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>Grade 9 requires both consistency and high-level problem solving. Use this 4-part framework:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Master the basics first:</strong> Algebra, fractions, percentages, and ratio must be automatic.</li>
            <li><strong>Train exam technique:</strong> Do timed past papers every week and mark strictly.</li>
            <li><strong>Target grade 8/9 topics:</strong> Practice the hardest multi-step questions repeatedly.</li>
            <li><strong>Review mistakes deeply:</strong> Keep a notebook of errors and revisit weekly.</li>
          </ol>
          <p>Small daily practice (45–60 mins) beats occasional long revision sessions.</p>
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
