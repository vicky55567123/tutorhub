'use client'

import { useState } from 'react'

export default function CalendarAuthPage() {
  const [status, setStatus] = useState<string>('')

  const handleAuthorize = async () => {
    setStatus('Redirecting to Google...')
    
    try {
      // This will redirect to Google OAuth with Calendar permissions
      window.location.href = '/api/auth/google/authorize'
    } catch (error) {
      setStatus('Error: ' + (error as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Calendar Authorization Required
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            To schedule video lessons, you need to authorize calendar access.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-medium text-blue-800 mb-2">Steps:</h3>
            <ol className="text-sm text-blue-700 space-y-1">
              <li>1. Click &quot;Authorize Calendar Access&quot;</li>
              <li>2. Sign in with your Google account</li>
              <li>3. Grant calendar permissions</li>
              <li>4. You&apos;ll be redirected back</li>
            </ol>
          </div>
        </div>

        <button
          onClick={handleAuthorize}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Authorize Calendar Access
        </button>

        {status && (
          <div className="mt-4 p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600">{status}</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <a 
            href="/video-lessons" 
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            ← Back to Video Lessons
          </a>
        </div>
      </div>
    </div>
  )
}
