import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'POST TITLE | Maths Tutoring Blog',
  description: 'Short SEO description of this article.',
  alternates: {
    canonical: 'https://yourtutor.netlify.app/blog/post-slug',
  },
}

export default function BlogPostTemplate() {
  return (
    <article className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-gray-500 mb-3">Published: YYYY-MM-DD</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">POST TITLE</h1>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>Write your introduction here.</p>
          <h2>Section heading</h2>
          <p>Write helpful content focused on search intent.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Actionable point 1</li>
            <li>Actionable point 2</li>
            <li>Actionable point 3</li>
          </ul>
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
