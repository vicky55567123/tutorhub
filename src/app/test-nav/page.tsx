'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NavigationTestPage() {
  const router = useRouter()
  const [testResults, setTestResults] = useState<string[]>([])

  const testRoutes = ['/favorites', '/billing', '/settings', '/my-courses', '/profile', '/dashboard']

  const testNavigation = async (route: string) => {
    try {
      router.push(route)
      setTestResults(prev => [...prev, `✅ ${route} - Navigation successful`])
    } catch (error) {
      setTestResults(prev => [...prev, `❌ ${route} - Navigation failed: ${error}`])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Navigation Test</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {testRoutes.map(route => (
            <button
              key={route}
              onClick={() => testNavigation(route)}
              className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900">Test {route}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h2>
          <div className="space-y-2">
            {testResults.length === 0 ? (
              <p className="text-gray-500">Click buttons above to test navigation</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="text-sm font-mono">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Direct Navigation Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {testRoutes.map(route => (
              <a
                key={route}
                href={route}
                className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors text-center"
              >
                <div className="text-sm font-medium text-blue-900">Go to {route}</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
