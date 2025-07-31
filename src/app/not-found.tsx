import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. 
            The page might have been moved, deleted, or you might have entered the wrong URL.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/"
            className="btn-primary inline-block px-6 py-3"
          >
            Go Back Home
          </Link>
          <div className="text-sm text-gray-500">
            Or try these popular pages:
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Link 
              href="/courses"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Browse Courses
            </Link>
            <Link 
              href="/tutors"
              className="text-primary-600 hover:text-primary-700 underline"
            >
              Find Tutors
            </Link>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-3">Need help? Contact us:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+447446255033"
                className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
              >
                📞 Call: +44 7446 255033
              </a>
              <a
                href="https://wa.me/447446255033"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-xs text-gray-400">
          Error Code: 404 - Page Not Found
        </div>
      </div>
    </div>
  )
}
