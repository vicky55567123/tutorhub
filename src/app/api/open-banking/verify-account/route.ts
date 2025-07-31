// API endpoint for bank account verification
// /api/open-banking/verify-account

import { NextRequest, NextResponse } from 'next/server'
import { OpenBankingService } from '@/lib/open-banking'

export async function POST(request: NextRequest) {
  try {
    const { accessToken, accountId, expectedName, providerId } = await request.json()

    if (!accessToken || !accountId || !expectedName) {
      return NextResponse.json(
        { error: 'Access token, account ID, and expected name are required' },
        { status: 400 }
      )
    }

    // Check if we have real API credentials
    const apiKey = process.env.OPEN_BANKING_API_KEY
    const clientId = process.env.OPEN_BANKING_CLIENT_ID
    const clientSecret = process.env.OPEN_BANKING_CLIENT_SECRET

    if (!apiKey || !clientId || !clientSecret) {
      console.error('❌ Open Banking credentials not configured')
      return NextResponse.json({
        success: false,
        error: 'Open Banking service is not configured. Please contact support to enable bank verification.'
      }, { status: 503 })
    }

    // Real API mode - only works with proper credentials
    const config = {
      apiKey,
      clientId,
      clientSecret,
      redirectUri: process.env.OPEN_BANKING_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/open-banking/callback`,
      providerId
    }

    const openBankingService = OpenBankingService.getInstance(config)
    const verification = await openBankingService.verifyAccountHolderName(
      accessToken,
      accountId,
      expectedName
    )

    return NextResponse.json({
      success: true,
      verification,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Account verification failed:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Account verification failed',
        success: false 
      },
      { status: 500 }
    )
  }
}
