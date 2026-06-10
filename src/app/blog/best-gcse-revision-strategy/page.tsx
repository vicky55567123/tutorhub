import Link from 'next/link'

export default function BestGCSERevisionStrategyPage() {
  return (
    <article className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-3">Published: 2026-06-10</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Best GCSE Revision Strategy</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>A high-performing revision plan is simple, repeatable, and based on exam evidence.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Split revision into topic blocks (Algebra, Number, Geometry, Statistics).</li>
            <li>Use active recall: answer questions from memory, then check notes.</li>
            <li>Do at least 2 timed past papers each week.</li>
            <li>Mark with exam board mark schemes and note lost marks.</li>
            <li>Review weak areas every Sunday before starting new topics.</li>
          </ul>
          <p>Focus on quality and consistency, not just total hours.</p>
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
