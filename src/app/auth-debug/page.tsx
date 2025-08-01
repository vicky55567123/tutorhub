'use client'

import { getProviders, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function AuthDebug() {
  const [providers, setProviders] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [debugInfo, setDebugInfo] = useState<any>({})

  useEffect(() => {
    const loadData = async () => {
      const providers = await getProviders()
      const session = await getSession()
      
      setProviders(providers)
      setSession(session)
      setDebugInfo({
        baseUrl: window.location.origin,
        expectedCallbackUrl: `${window.location.origin}/api/auth/callback/google`,
        nextAuthUrl: process.env.NEXTAUTH_URL || 'Not set',
        currentUrl: window.location.href
      })
    }
    
    loadData()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">NextAuth Debug Information</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-red-600">🔍 Google OAuth Callback URL</h2>
          <div className="space-y-2">
            <p><strong>Expected Callback URL:</strong></p>
            <code className="bg-gray-100 p-2 rounded block text-sm">
              {debugInfo.expectedCallbackUrl}
            </code>
            <p className="text-sm text-gray-600 mt-2">
              ⚠️ This exact URL must be added to your Google Cloud Console → OAuth 2.0 Client → Authorized redirect URIs
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🌐 Environment Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Current URL:</strong> {debugInfo.currentUrl}</p>
            <p><strong>Base URL:</strong> {debugInfo.baseUrl}</p>
            <p><strong>NEXTAUTH_URL:</strong> {debugInfo.nextAuthUrl}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">🔐 Available Providers</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(providers, null, 2)}
          </pre>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">👤 Current Session</h2>
          <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">📋 Fix Steps for redirect_uri_mismatch</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Cloud Console</a></li>
            <li>Navigate to APIs & Services → Credentials</li>
            <li>Click on your OAuth 2.0 Client ID</li>
            <li>In &quot;Authorized redirect URIs&quot;, add exactly:
              <code className="bg-gray-100 p-1 rounded ml-2">{debugInfo.expectedCallbackUrl}</code>
            </li>
            <li>Remove any incorrect URLs (check for trailing slashes, wrong protocols, etc.)</li>
            <li>Save the changes</li>
            <li>Test Google sign-in again</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
