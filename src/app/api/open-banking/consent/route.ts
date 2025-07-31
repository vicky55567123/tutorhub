// API endpoint for Open Banking consent creation
// /api/open-banking/consent

import { NextRequest, NextResponse } from 'next/server'
import { OpenBankingService } from '@/lib/open-banking'

export async function POST(request: NextRequest) {
  try {
    const { permissions, providerId, redirectUri } = await request.json()

    // Validate required parameters
    if (!permissions || !providerId) {
      return NextResponse.json(
        { error: 'Missing required parameters: permissions and providerId', success: false },
        { status: 400 }
      )
    }

    // Check if real API credentials are configured
    const apiKey = process.env.OPEN_BANKING_API_KEY
    const clientId = process.env.OPEN_BANKING_CLIENT_ID
    const clientSecret = process.env.OPEN_BANKING_CLIENT_SECRET

    if (!apiKey || !clientId || !clientSecret) {
      console.error('❌ Open Banking credentials not configured')
      return NextResponse.json({
        success: false,
        error: 'Open Banking service is not configured. Please contact support to enable bank verification.',
        requiresSetup: true
      }, { status: 503 })
    }

    // Real API implementation when credentials are configured
    const config = {
      apiKey,
      clientId,
      clientSecret,
      redirectUri: redirectUri || `${process.env.NEXTAUTH_URL}/api/open-banking/callback`,
      providerId,
      environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox'
    }

    const openBankingService = OpenBankingService.getInstance(config)
    const consent = await openBankingService.createAccountConsent(permissions)

    // Log successful consent creation
    console.log(`Open Banking consent created successfully for provider ${providerId}:`, {
      consentId: consent.consentId,
      status: consent.status,
      expirationDateTime: consent.expirationDateTime
    })

    return NextResponse.json({
      success: true,
      consent,
      message: `Consent created successfully with ${providerId}`
    })

  } catch (error) {
    console.error('Open Banking consent creation failed:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create banking consent'
    if (error instanceof Error) {
      if (error.message.includes('unauthorized') || error.message.includes('401')) {
        errorMessage = 'Invalid API credentials. Please check your Open Banking configuration.'
      } else if (error.message.includes('provider not found') || error.message.includes('404')) {
        errorMessage = 'Banking provider not supported or temporarily unavailable.'
      } else if (error.message.includes('rate limit') || error.message.includes('429')) {
        errorMessage = 'Too many requests. Please try again in a few minutes.'
      } else {
        errorMessage = error.message
      }
    }

    return NextResponse.json(
      { 
        error: errorMessage,
        success: false,
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const consentId = searchParams.get('consentId')

  if (!consentId) {
    return NextResponse.json(
      { error: 'Consent ID is required' },
      { status: 400 }
    )
  }

  try {
    // In a real implementation, you would fetch consent status from the provider
    // For now, return a mock response
    return NextResponse.json({
      success: true,
      consent: {
        consentId,
        status: 'AWAITING_AUTHORISATION',
        permissions: ['ReadAccountsDetail', 'ReadBalances'],
        expirationDateTime: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      }
    })

  } catch (error) {
    console.error('Failed to get consent status:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get consent status',
        success: false 
      },
      { status: 500 }
    )
  }
}
