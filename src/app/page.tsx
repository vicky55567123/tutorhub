import HeroSection from '@/components/HeroSection'
import FeaturesSection from '@/components/FeaturesSection'
import TutorShowcase from '@/components/TutorShowcase'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TutorShowcase />
      <FeaturesSection />
      
      {/* Popular Subjects */}
      <section className="py-20 bg-gradient-to-br from-secondary-50 via-white to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            Explore
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
              {' '}popular subjects
            </span>
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Master any subject with our expert tutors and comprehensive learning resources
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: 'Mathematics', emoji: '🧮', color: 'from-blue-400 to-indigo-500' },
              { name: 'Science', emoji: '🔬', color: 'from-green-400 to-emerald-500' },
              { name: 'English', emoji: '📖', color: 'from-purple-400 to-pink-500' },
              { name: 'Programming', emoji: '💻', color: 'from-gray-600 to-gray-800' },
              { name: 'Languages', emoji: '🌍', color: 'from-orange-400 to-red-500' },
              { name: 'Music', emoji: '🎵', color: 'from-pink-400 to-rose-500' }
            ].map((subject) => (
              <Link 
                key={subject.name} 
                href={`/courses/${subject.name.toLowerCase()}`}
                className="group relative bg-white rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:scale-105 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{subject.emoji}</div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-gray-900">{subject.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">Ready to start learning?</h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            Join thousands of students who are already achieving their goals with our expert tutors and proven learning methods.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/courses" 
              className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Explore Courses
            </Link>
            <Link 
              href="/tutors" 
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold py-4 px-8 rounded-2xl text-lg transition-all duration-200 border border-white/30 hover:scale-105"
            >
              Find a Tutor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
