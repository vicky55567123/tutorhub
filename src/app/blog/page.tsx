import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Maths Tutoring Blog | GCSE, IGCSE & O-Level Tips',
  description: 'Weekly GCSE Maths articles on exam mistakes, revision strategies, formula sheets, and grade improvement.',
  alternates: {
    canonical: 'https://yourtutor.netlify.app/blog',
  },
  openGraph: {
    title: 'Maths Tutoring Blog',
    description: 'Weekly GCSE Maths articles and revision advice.',
    url: 'https://yourtutor.netlify.app/blog',
    type: 'website',
  },
}

const posts = [
  {
    title: 'Top 10 GCSE Maths Exam Mistakes',
    slug: 'top-10-gcse-maths-exam-mistakes',
    excerpt: 'Avoid the most common errors that cost students easy marks in GCSE Maths exams.',
    date: '2026-06-10',
  },
  {
    title: 'How to Get Grade 9 in GCSE Maths',
    slug: 'how-to-get-grade-9-in-gcse-maths',
    excerpt: 'A practical, step-by-step strategy to reach grade 9 with focused preparation.',
    date: '2026-06-10',
  },
  {
    title: 'Best GCSE Revision Strategy',
    slug: 'best-gcse-revision-strategy',
    excerpt: 'Build a revision plan that balances topics, past papers, and active recall.',
    date: '2026-06-10',
  },
  {
    title: 'GCSE Maths Formula Sheet Guide',
    slug: 'gcse-maths-formula-sheet-guide',
    excerpt: 'Understand the formula sheet, what to memorise, and how to apply each formula under pressure.',
    date: '2026-06-10',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Maths Tutoring Blog</h1>
          <p className="text-lg text-gray-600">Weekly tips for GCSE/IGCSE/O-Level Maths success.</p>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="font-semibold text-primary-600 hover:text-primary-700">
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
