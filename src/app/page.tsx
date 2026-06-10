import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
// import TutorShowcase from '@/components/TutorShowcase' // Disabled temporarily
import GCSESection from '@/components/GCSESection'
import StartLearningSection from '@/components/StartLearningSection'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <HeroSection />

      {/* Trust Bar — answers the 5 parent questions in 5 seconds */}
      <section className="bg-white border-y border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                q: 'Who am I?',
                a: 'A qualified, DBS-checked Maths & Science teacher with 8+ years experience.',
                icon: '👨‍🏫',
              },
              {
                q: 'What do I teach?',
                a: 'Maths, Physics & Chemistry — at GCSE, IGCSE, O-Level & A-Level.',
                icon: '📐',
              },
              {
                q: 'Who do I teach?',
                a: 'Students aged 13–18 preparing for exams, worldwide online.',
                icon: '🎓',
              },
              {
                q: 'Why trust me?',
                a: '200+ students tutored. 96% saw at least one grade improvement.',
                icon: '⭐',
              },
              {
                q: 'How to contact me?',
                a: 'WhatsApp or call today. First lesson is free — no commitment.',
                icon: '📞',
                cta: true,
              },
            ].map(({ q, a, icon, cta }) => (
              <div
                key={q}
                className={`rounded-2xl p-5 border ${cta ? 'bg-primary-50 border-primary-200' : 'bg-gray-50 border-gray-100'}`}
              >
                <div className="text-2xl mb-2">{icon}</div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-1">{q}</p>
                <p className="text-sm text-gray-700 leading-snug">{a}</p>
                {cta && (
                  <div className="flex gap-2 mt-3">
                    <a
                      href="https://wa.me/447446255033?text=Hi! I'd like to book a free trial lesson."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center py-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="tel:+447446255033"
                      className="flex-1 text-center py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-lg transition-colors"
                    >
                      Call Now
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who I Help */}
      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Who I Help</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              If any of these sounds like your child, you&apos;re in the right place.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'GCSE Maths Students',
              'IGCSE Maths Students',
              'O-Level Maths Students',
              'Students Preparing for Mock Exams',
              'Students Retaking Maths',
            ].map((item) => (
              <div
                key={item}
                className="bg-white rounded-xl border border-gray-200 px-5 py-4 text-gray-800 font-semibold shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GCSESection />
      {/* <TutorShowcase /> */} {/* Disabled temporarily - tutors section removed */}
      <StartLearningSection />
      <FeaturesSection />

      {/* Results Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">Student Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real progress from real students, focused on grades, confidence, and exam performance.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Shared with parent/student permission. Names anonymized for privacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'GCSE Science',
                outcome: 'Grade 4 ➜ Grade 7 in 6 months',
                summary: 'Built stronger topic foundations and exam technique through weekly targeted practice.',
                detail: 'Parent feedback: improved confidence, fewer exam mistakes, and better time management.'
              },
              {
                title: 'GCSE Maths',
                outcome: 'Grade 5 ➜ Grade 8',
                summary: 'Focused on algebra, problem-solving, and past-paper method to lift consistency under pressure.',
                detail: 'Parent feedback: clear explanations and measurable improvement in mock exam scores.'
              },
              {
                title: 'IGCSE Chemistry',
                outcome: 'Low confidence ➜ Consistent B/A performance',
                summary: 'Improved understanding of core concepts and question structure, especially in long-answer questions.',
                detail: 'Parent feedback: calmer exam approach and stronger overall academic confidence.'
              },
            ].map((story) => (
              <article key={story.title + story.outcome} className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 mb-2">{story.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{story.outcome}</h3>
                <p className="text-gray-700 mb-3">{story.summary}</p>
                <p className="text-sm text-gray-500">{story.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Subjects at a Glance */}
      <section className="py-16 bg-gradient-to-br from-secondary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            All curricula.
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {' '}All subjects.
            </span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Whether you&apos;re in the UK, internationally, or anywhere in between — there&apos;s a page for your exact curriculum and subject.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'GCSE Maths', href: '/gcse/maths', emoji: '🧮', color: 'from-blue-400 to-blue-600' },
              { name: 'GCSE Physics', href: '/gcse/physics', emoji: '⚡', color: 'from-orange-400 to-orange-600' },
              { name: 'GCSE Chemistry', href: '/gcse/chemistry', emoji: '🧪', color: 'from-green-400 to-green-600' },
              { name: 'IGCSE Maths', href: '/igcse/maths', emoji: '🧮', color: 'from-indigo-400 to-indigo-600' },
              { name: 'IGCSE Physics', href: '/igcse/physics', emoji: '⚡', color: 'from-amber-400 to-amber-600' },
              { name: 'IGCSE Chemistry', href: '/igcse/chemistry', emoji: '🧪', color: 'from-emerald-400 to-emerald-600' },
              { name: 'O-Level Maths', href: '/o-level/maths', emoji: '🧮', color: 'from-purple-400 to-purple-600' },
              { name: 'O-Level Physics', href: '/o-level/physics', emoji: '⚡', color: 'from-red-400 to-red-600' },
              { name: 'O-Level Chemistry', href: '/o-level/chemistry', emoji: '🧪', color: 'from-teal-400 to-teal-600' },
              { name: 'A-Level Maths', href: '/a-level/maths', emoji: '🧮', color: 'from-blue-500 to-indigo-600' },
              { name: 'A-Level Physics', href: '/a-level/physics', emoji: '⚡', color: 'from-sky-400 to-sky-600' },
              { name: 'A-Level Chemistry', href: '/a-level/chemistry', emoji: '🧪', color: 'from-cyan-400 to-cyan-600' },
            ].map((subject) => (
              <Link
                key={subject.name}
                href={subject.href}
                className="group relative bg-white rounded-2xl p-5 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 hover:scale-105 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">{subject.emoji}</div>
                  <h3 className="font-semibold text-gray-800 text-sm group-hover:text-gray-900">{subject.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">Dedicated Tutor Pages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { name: 'GCSE Maths Tutor', href: '/gcse-maths-tutor' },
                { name: 'IGCSE Maths Tutor', href: '/igcse-maths-tutor' },
                { name: 'O-Level Maths Tutor', href: '/o-level-maths-tutor' },
                { name: 'Online Maths Tutor UK', href: '/online-maths-tutor-uk' },
                { name: 'Online Maths Tutor UAE', href: '/online-maths-tutor-uae' },
              ].map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 font-semibold text-gray-800 hover:text-primary-700"
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">Book your free trial lesson today.</h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            No commitment. No payment upfront. Just a free session to see if we&apos;re the right fit for your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/447446255033?text=Hi! I'd like to book a free trial lesson."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              💬 WhatsApp Us
            </a>
            <a
              href="tel:+447446255033"
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              📞 Call: +44 7446 255033
            </a>
            <Link
              href="/contact"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 border border-white/30 hover:scale-105"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
