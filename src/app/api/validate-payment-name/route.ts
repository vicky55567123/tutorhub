// API endpoint for enhanced name validation
// /api/validate-payment-name

import { NextRequest, NextResponse } from 'next/server'
import { PaymentValidationService } from '@/lib/payment-validation'

export async function POST(request: NextRequest) {
  try {
    const { name, validateWithExternalService = false } = await request.json()

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { error: 'Name is required and must be a string' },
        { status: 400 }
      )
    }

    const validationService = PaymentValidationService.getInstance()
    
    // Basic validation
    const basicValidation = validationService.validateUKAccountHolderName(name)
    
    let result = {
      isValid: basicValidation.isValid,
      confidence: basicValidation.confidence,
      warnings: basicValidation.warnings,
      suggestions: basicValidation.suggestions,
      validationLevel: 'basic'
    }

    // Enhanced validation if requested
    if (validateWithExternalService) {
      try {
        const enhancedValidation = await validationService.validateNameWithBankingService(name)
        result = {
          ...result,
          isValid: enhancedValidation.isValidFormat,
          confidence: 100 - enhancedValidation.riskScore,
          suggestions: enhancedValidation.suggestions,
          validationLevel: 'enhanced'
        }
      } catch (error) {
        console.error('Enhanced validation failed:', error)
        // Fall back to basic validation
      }
    }

    return NextResponse.json({
      success: true,
      validation: result,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Validation API error:', error)
    return NextResponse.json(
      { 
        error: 'Validation service temporarily unavailable',
        success: false 
      },
      { status: 500 }
    )
  }
}

// Rate limiting middleware could be added here
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'UK Bank Account Name Validation API',
    version: '1.0.0',
    endpoints: {
      'POST /api/validate-payment-name': 'Validate UK bank account holder name format'
    },
    documentation: '/UK_BANK_VALIDATION_GUIDE.md'
  })
}
