// UK Payment Validation Service
// This demonstrates integration patterns for UK payment validation

interface OpenBankingProvider {
  name: string
  apiEndpoint: string
  requiresLicense: boolean
  features: string[]
}

// Major UK Open Banking providers
export const UK_OPEN_BANKING_PROVIDERS: OpenBankingProvider[] = [
  {
    name: 'TrueLayer',
    apiEndpoint: 'https://api.truelayer.com',
    requiresLicense: true,
    features: ['Account verification', 'Payment initiation', 'Identity verification']
  },
  {
    name: 'Plaid (UK)',
    apiEndpoint: 'https://production.plaid.com',
    requiresLicense: true,
    features: ['Account verification', 'Identity verification', 'Income verification']
  },
  {
    name: 'Yapily',
    apiEndpoint: 'https://api.yapily.com',
    requiresLicense: true,
    features: ['Account information', 'Payment initiation', 'Identity verification']
  },
  {
    name: 'Banked',
    apiEndpoint: 'https://api.banked.com',
    requiresLicense: true,
    features: ['Account verification', 'Payment processing', 'Real-time payments']
  }
]

// Mock validation service (for demonstration)
export class PaymentValidationService {
  private static instance: PaymentValidationService
  
  static getInstance(): PaymentValidationService {
    if (!PaymentValidationService.instance) {
      PaymentValidationService.instance = new PaymentValidationService()
    }
    return PaymentValidationService.instance
  }

  // Enhanced name validation with UK banking rules
  validateUKAccountHolderName(name: string): {
    isValid: boolean
    confidence: number
    warnings: string[]
    suggestions?: string[]
  } {
    const warnings: string[] = []
    const suggestions: string[] = []
    let confidence = 0

    // Basic validation
    const trimmedName = name.trim()
    
    if (trimmedName.length < 2) {
      return { isValid: false, confidence: 0, warnings: ['Name too short'] }
    }

    if (trimmedName.length > 35) {
      return { isValid: false, confidence: 0, warnings: ['Name exceeds UK bank limit (35 characters)'] }
    }

    // UK banking character validation
    const validUKBankingRegex = /^[A-Za-z\s\-'\.]+$/
    if (!validUKBankingRegex.test(trimmedName)) {
      warnings.push('Contains invalid characters for UK banking')
      confidence -= 30
    } else {
      confidence += 20
    }

    // Check for proper name structure
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0)
    
    if (words.length < 2) {
      warnings.push('Should include both first and last name')
      confidence -= 20
    } else {
      confidence += 15
    }

    // Check for common UK naming patterns
    const hasCommonTitles = /^(Mr|Mrs|Miss|Ms|Dr|Prof|Sir|Lady|Lord)\s+/i.test(trimmedName)
    if (hasCommonTitles) {
      confidence += 10
      suggestions.push('Consider removing title for bank account matching')
    }

    // Check for suspicious patterns
    if (/\d/.test(trimmedName)) {
      warnings.push('Contains numbers - unusual for account holder names')
      confidence -= 25
    }

    // Check for consecutive special characters
    if (/[\-'\.]{2,}/.test(trimmedName)) {
      warnings.push('Contains consecutive special characters')
      confidence -= 15
    }

    // Check word lengths (very short words might be initials)
    const shortWords = words.filter(word => word.length === 1)
    if (shortWords.length > 2) {
      warnings.push('Too many single-letter names/initials')
      confidence -= 10
    }

    // Final confidence adjustment
    confidence = Math.max(0, Math.min(100, confidence + 50)) // Base 50 + adjustments

    return {
      isValid: confidence >= 60 && warnings.length === 0,
      confidence,
      warnings,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    }
  }

  // Simulate bank verification (in real implementation, this would call Open Banking API)
  async verifyAccountWithOpenBanking(
    accountHolderName: string,
    sortCode: string,
    accountNumber: string
  ): Promise<{
    verified: boolean
    nameMatch: 'exact' | 'partial' | 'none' | 'unknown'
    provider: string
    requiresUserConsent: boolean
  }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // In a real implementation, this would:
    // 1. Request user consent for account verification
    // 2. Use Open Banking API to verify account details
    // 3. Compare provided name with account holder name
    // 4. Return verification result

    // Mock response for demonstration
    return {
      verified: true,
      nameMatch: 'unknown', // Real APIs would return actual match status
      provider: 'TrueLayer',
      requiresUserConsent: true
    }
  }

  // Alternative: Use bank name validation service
  async validateNameWithBankingService(name: string): Promise<{
    isValidFormat: boolean
    riskScore: number
    suggestions: string[]
  }> {
    // This would integrate with services like:
    // - Experian Identity Verification
    // - Equifax Identity Check
    // - CIFAS (fraud prevention)
    
    const validation = this.validateUKAccountHolderName(name)
    
    return {
      isValidFormat: validation.isValid,
      riskScore: 100 - validation.confidence,
      suggestions: validation.suggestions || []
    }
  }
}

// Sort code validation for UK banks
export function validateUKSortCode(sortCode: string): boolean {
  const cleaned = sortCode.replace(/[-\s]/g, '')
  return /^\d{6}$/.test(cleaned)
}

// Account number validation for UK banks
export function validateUKAccountNumber(accountNumber: string): boolean {
  const cleaned = accountNumber.replace(/\s/g, '')
  return /^\d{8}$/.test(cleaned)
}

// UK bank identifier from sort code
export function identifyUKBank(sortCode: string): string | null {
  const cleaned = sortCode.replace(/[-\s]/g, '')
  
  // Sample bank identification (partial list)
  const bankPrefixes: { [key: string]: string } = {
    '20': 'Barclays',
    '30': 'Lloyds Banking Group',
    '40': 'HSBC',
    '60': 'National Westminster Bank',
    '08': 'Co-operative Bank',
    '23': 'Metro Bank'
  }
  
  const prefix = cleaned.substring(0, 2)
  return bankPrefixes[prefix] || null
}
