import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GCSE Maths Formula Sheet Guide | Maths Tutoring Blog',
  description: 'A practical guide to using the GCSE Maths formula sheet effectively in exam conditions.',
  alternates: {
    canonical: 'https://yourtutor.netlify.app/blog/gcse-maths-formula-sheet-guide',
  },
}

export default function GCSEMathsFormulaSheetGuidePage() {
  return (
    <article className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-3">Published: 2026-06-10</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">GCSE Maths Formula Sheet Guide</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>The formula sheet helps, but it won’t replace understanding. Use it strategically.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Know where each formula is located before exam day.</li>
            <li>Still memorise high-frequency formulas to save time.</li>
            <li>Practise substituting values carefully (watch units).</li>
            <li>Rearrange formulas confidently for higher-mark questions.</li>
            <li>Combine formula use with clear working for method marks.</li>
          </ul>
          <p>Practice with the exact formula sheet your exam board allows.</p>
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
