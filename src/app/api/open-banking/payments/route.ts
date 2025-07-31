// API endpoint for payment initiation
// /api/open-banking/payments

import { NextRequest, NextResponse } from 'next/server'
import { OpenBankingService } from '@/lib/open-banking'

export async function POST(request: NextRequest) {
  try {
    const { 
      accessToken, 
      amount, 
      currency = 'GBP',
      debtorAccountId,
      reference,
      providerId 
    } = await request.json()

    if (!accessToken || !amount || !debtorAccountId || !reference) {
      return NextResponse.json(
        { error: 'Access token, amount, debtor account ID, and reference are required' },
        { status: 400 }
      )
    }

    const config = {
      apiKey: process.env.OPEN_BANKING_API_KEY || 'demo_api_key',
      clientId: process.env.OPEN_BANKING_CLIENT_ID || 'demo_client_id',
      clientSecret: process.env.OPEN_BANKING_CLIENT_SECRET || 'demo_client_secret',
      redirectUri: process.env.OPEN_BANKING_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/open-banking/callback`,
      providerId
    }

    const openBankingService = OpenBankingService.getInstance(config)
    
    // Create payment to Waqar Ahmed's account
    const payment = await openBankingService.createPayment(accessToken, {
      amount: parseFloat(amount),
      currency,
      creditorAccount: {
        accountNumber: '80647014',
        sortCode: '231470',
        accountHolderName: 'Waqar Ahmed'
      },
      debtorAccountId,
      reference
    })

    return NextResponse.json({
      success: true,
      payment,
      message: 'Payment initiated successfully'
    })

  } catch (error) {
    console.error('Payment initiation failed:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Payment initiation failed',
        success: false 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentId = searchParams.get('paymentId')
  const accessToken = searchParams.get('accessToken')

  if (!paymentId || !accessToken) {
    return NextResponse.json(
      { error: 'Payment ID and access token are required' },
      { status: 400 }
    )
  }

  try {
    const config = {
      apiKey: process.env.OPEN_BANKING_API_KEY || 'demo_api_key',
      clientId: process.env.OPEN_BANKING_CLIENT_ID || 'demo_client_id',
      clientSecret: process.env.OPEN_BANKING_CLIENT_SECRET || 'demo_client_secret',
      redirectUri: process.env.OPEN_BANKING_REDIRECT_URI || `${process.env.NEXTAUTH_URL}/api/open-banking/callback`
    }

    const openBankingService = OpenBankingService.getInstance(config)
    const payment = await openBankingService.getPaymentStatus(accessToken, paymentId)

    return NextResponse.json({
      success: true,
      payment
    })

  } catch (error) {
    console.error('Failed to get payment status:', error)
    return NextResponse.json(
      { 
        error: 'Failed to get payment status',
        success: false 
      },
      { status: 500 }
    )
  }
}
