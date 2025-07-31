// API endpoint for Open Banking callback handling
// /api/open-banking/callback

import { NextRequest, NextResponse } from 'next/server'
import { OpenBankingService } from '@/lib/open-banking'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')
  const consentId = searchParams.get('consent_id') || searchParams.get('id') // Different providers use different parameter names

  // Handle authorization errors
  if (error) {
    const errorDescription = searchParams.get('error_description') || 'Bank authorization failed'
    console.error('Open Banking authorization error:', { error, errorDescription })
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/billing?error=${encodeURIComponent(errorDescription)}&tab=payment-methods`
    )
  }

  if (!code) {
    console.error('No authorization code received from bank')
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/billing?error=No authorization code received from bank&tab=payment-methods`
    )
  }

  try {
    // Get consent details from localStorage (stored during consent creation)
    // In production, you'd store this in a secure session or database
    const providerId = state || 'truelayer' // Use state parameter to identify provider
    
    // Validate environment variables
    const apiKey = process.env.OPEN_BANKING_API_KEY
    const clientId = process.env.OPEN_BANKING_CLIENT_ID
    const clientSecret = process.env.OPEN_BANKING_CLIENT_SECRET

    if (!apiKey || !clientId || !clientSecret) {
      throw new Error('Open Banking credentials not configured')
    }

    // Initialize Open Banking service with the specific provider
    const config = {
      apiKey,
      clientId,
      clientSecret,
      redirectUri: `${process.env.NEXTAUTH_URL}/api/open-banking/callback`,
      providerId
    }

    const openBankingService = OpenBankingService.getInstance(config)
    
    // Exchange authorization code for access token
    const accessToken = await openBankingService.exchangeCodeForToken(code, consentId || '')
    
    // Get user's accounts
    const accounts = await openBankingService.getAccounts(accessToken)
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found or accessible')
    }

    // Use the first account (in production, you might let user choose)
    const primaryAccount = accounts[0]
    
    // Store the verification result
    const accountData = encodeURIComponent(JSON.stringify(primaryAccount))
    const tokenData = encodeURIComponent(accessToken)
    
    console.log('Open Banking callback successful:', {
      providerId,
      accountId: primaryAccount.id,
      accountHolderName: primaryAccount.accountHolderName
    })
    
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/billing?success=Bank account connected&tab=payment-methods&account=${accountData}&token=${tokenData}`
    )

  } catch (error) {
    console.error('Open Banking callback failed:', error)
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/billing?error=${encodeURIComponent('Failed to connect bank account')}&tab=payment-methods`
    )
  }
}
