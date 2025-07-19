import Link from 'next/link'

// Ahmed Waqar featured profile - Force deployment update
const tutors = [
  // GCSE Specialist Tutors
  {
    id: 12,
    name: 'Ahmed Waqar',
    subject: 'GCSE Maths, Physics & Chemistry',
    specialization: 'Multi-Subject GCSE Expert (Grades 4-9)',
    experience: '12 years',
    rating: 4.9,
    reviews: 284,
    price: '£45/hour',
    description: 'Triple Science GCSE specialist with 12 years experience. Expert in Maths, Physics & Chemistry across all exam boards. Achieved 98% grade 7+ success rate with 500+ students.',
    availability: 'Available today',
    verified: true,
    avatar: '🎓',
    qualifications: ['MSc Physics', 'BSc Mathematics', 'QTS', 'GCSE Lead Examiner'],
    examBoards: ['AQA', 'Edexcel', 'OCR', 'WJEC'],
    specialFeatures: ['Multi-subject expertise', 'Former examiner', 'Proven track record']
  },
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    subject: 'GCSE Mathematics',
    specialization: 'Mathematics (Grades 4-9)',
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    price: '£35/hour',
    description: 'GCSE Mathematics specialist with 8 years experience. Helped 200+ students achieve grades 7-9. Expert in AQA, Edexcel & OCR.',
    availability: 'Available today',
    verified: true,
    avatar: '👩‍🏫',
    qualifications: ['PhD Mathematics', 'QTS', 'GCSE Examiner'],
    examBoards: ['AQA', 'Edexcel', 'OCR']
  },
  {
    id: 2,
    name: 'Dr. David Wilson',
    subject: 'GCSE Physics',
    specialization: 'Physics (Grades 4-9)',
    experience: '10 years',
    rating: 4.8,
    reviews: 143,
    price: '£40/hour',
    description: 'GCSE Physics expert and former examiner. Specializes in mechanics, electricity, and waves. 95% student success rate.',
    availability: 'Available today',
    verified: true,
    avatar: '👨‍🔬',
    qualifications: ['PhD Physics', 'QTS', 'Former AQA Examiner'],
    examBoards: ['AQA', 'Edexcel', 'OCR']
  },
  {
    id: 3,
    name: 'Dr. Emily Roberts',
    subject: 'GCSE Chemistry',
    specialization: 'Chemistry (Grades 4-9)',
    experience: '7 years',
    rating: 4.9,
    reviews: 128,
    price: '£38/hour',
    description: 'GCSE Chemistry specialist with focus on organic chemistry and chemical analysis. Interactive teaching methods.',
    availability: 'Available tomorrow',
    verified: true,
    avatar: '👩‍⚗️',
    qualifications: ['PhD Chemistry', 'QTS', 'RSC Member'],
    examBoards: ['AQA', 'Edexcel', 'OCR']
  },
  {
    id: 4,
    name: 'Dr. James Mitchell',
    subject: 'GCSE Biology',
    specialization: 'Biology (Grades 4-9)',
    experience: '9 years',
    rating: 4.7,
    reviews: 167,
    price: '£36/hour',
    description: 'GCSE Biology expert with expertise in genetics, ecology, and human biology. Makes complex topics easy to understand.',
    availability: 'Available today',
    verified: true,
    avatar: '👨‍⚕️',
    qualifications: ['PhD Biology', 'QTS', 'Medical Background'],
    examBoards: ['AQA', 'Edexcel', 'OCR']
  },
  {
    id: 5,
    name: 'Mr. Alex Turner',
    subject: 'GCSE Computer Science',
    specialization: 'Computer Science (Grades 4-9)',
    experience: '6 years',
    rating: 4.8,
    reviews: 112,
    price: '£42/hour',
    description: 'GCSE Computer Science teacher and software developer. Expert in Python programming and computational thinking.',
    availability: 'Available today',
    verified: true,
    avatar: '👨‍💻',
    qualifications: ['MSc Computer Science', 'QTS', 'Industry Experience'],
    examBoards: ['AQA', 'Edexcel', 'OCR']
  },
  // General Subject Tutors
  {
    id: 6,
    name: 'Dr. Sarah Johnson',
    subject: 'Mathematics',
    experience: '8 years',
    rating: 4.9,
    reviews: 156,
    price: '$50/hour',
    description: 'PhD in Mathematics with expertise in calculus, algebra, and statistics. Helped 500+ students achieve their academic goals.',
    availability: 'Available today',
    verified: true,
    avatar: '👩‍🏫'
  },
  {
    id: 7,
    name: 'Prof. Michael Chen',
    subject: 'Computer Science',
    experience: '10 years',
    rating: 4.8,
    reviews: 203,
    price: '$65/hour',
    description: 'Former Google engineer teaching programming, algorithms, and software development. Specializes in Python and JavaScript.',
    availability: 'Available tomorrow',
    verified: true,
    avatar: '👨‍💻'
  },
  {
    id: 8,
    name: 'Emma Rodriguez',
    subject: 'Spanish',
    experience: '6 years',
    rating: 4.9,
    reviews: 189,
    price: '$40/hour',
    description: 'Native Spanish speaker with a degree in Linguistics. Makes learning Spanish fun and interactive.',
    availability: 'Available today',
    verified: true,
    avatar: '👩‍🎓'
  },
  {
    id: 9,
    name: 'Dr. James Wilson',
    subject: 'Physics',
    experience: '12 years',
    rating: 4.7,
    reviews: 134,
    price: '$55/hour',
    description: 'University professor with extensive research background. Simplifies complex physics concepts for students.',
    availability: 'Available in 2 hours',
    verified: true,
    avatar: '👨‍🔬'
  },
  {
    id: 10,
    name: 'Lisa Thompson',
    subject: 'English Literature',
    experience: '7 years',
    rating: 4.8,
    reviews: 167,
    price: '$45/hour',
    description: 'Published author and English teacher. Passionate about helping students develop writing and analytical skills.',
    availability: 'Available today',
    verified: true,
    avatar: '👩‍📚'
  },
  {
    id: 11,
    name: 'David Park',
    subject: 'Music',
    experience: '9 years',
    rating: 4.6,
    reviews: 98,
    price: '$50/hour',
    description: 'Professional pianist and music teacher. Teaches piano, music theory, and composition to all skill levels.',
    availability: 'Available tomorrow',
    verified: true,
    avatar: '👨‍🎵'
  }
]

const subjects = ['All Subjects', 'Mathematics', 'Computer Science', 'Spanish', 'Physics', 'English Literature', 'Music']

export default function Tutors() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find Expert Tutors</h1>
          <p className="text-gray-600 mt-2">
            Connect with qualified tutors for personalized learning experiences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Tutors</label>
              <input
                type="text"
                placeholder="Enter tutor name or subject..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                aria-label="Select subject"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select 
                aria-label="Select price range"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Any Price</option>
                <option>$20 - $40</option>
                <option>$40 - $60</option>
                <option>$60+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select 
                aria-label="Select availability"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>Any Time</option>
                <option>Available Now</option>
                <option>Available Today</option>
                <option>Available This Week</option>
              </select>
            </div>
          </div>
          <button className="mt-4 btn-primary">
            Search Tutors
          </button>
        </div>

        {/* Tutors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor.id} className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-200 ${
              tutor.id === 12 ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50 relative' : ''
            }`}>
              {tutor.id === 12 && (
                <div className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  ⭐ FEATURED
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`text-4xl mr-4 ${tutor.id === 12 ? 'animate-pulse' : ''}`}>{tutor.avatar}</div>
                  <div>
                    <h3 className={`text-lg font-semibold ${tutor.id === 12 ? 'text-yellow-900' : 'text-gray-900'} flex items-center`}>
                      {tutor.name}
                      {tutor.verified && (
                        <span className="ml-2 text-green-500" title="Verified Tutor">
                          ✓
                        </span>
                      )}
                      {tutor.id === 12 && (
                        <span className="ml-2 text-yellow-600" title="Multi-Subject Expert">
                          🏆
                        </span>
                      )}
                    </h3>
                    <p className={`font-medium ${tutor.id === 12 ? 'text-yellow-700' : 'text-primary-600'}`}>{tutor.subject}</p>
                    <p className="text-sm text-gray-500">{tutor.experience} experience</p>
                    {tutor.specialFeatures && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tutor.specialFeatures.map((feature, index) => (
                          <span key={index} className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <span className={`text-lg font-bold ${tutor.id === 12 ? 'text-yellow-700' : 'text-primary-600'}`}>{tutor.price}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{tutor.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm text-gray-600 ml-1">{tutor.rating}</span>
                  <span className="text-sm text-gray-500 ml-2">({tutor.reviews} reviews)</span>
                </div>
                <span className="text-sm text-green-600">{tutor.availability}</span>
              </div>
              
              <div className="flex space-x-3">
                <Link 
                  href={`/tutors/${tutor.id}`}
                  className={`flex-1 text-white text-center py-2 px-4 rounded-lg transition duration-200 text-sm font-medium ${
                    tutor.id === 12 
                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600' 
                      : 'bg-primary-600 hover:bg-primary-700'
                  }`}
                >
                  View Profile
                </Link>
                <button className={`px-4 py-2 border rounded-lg transition duration-200 text-sm font-medium ${
                  tutor.id === 12
                    ? 'border-yellow-500 text-yellow-700 hover:bg-yellow-100'
                    : 'border-primary-600 text-primary-600 hover:bg-primary-50'
                }`}>
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Tutors
          </button>
        </div>
      </div>
    </div>
  )
}
