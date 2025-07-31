// Open Banking API Integration Service
// This implements PSD2-compliant Open Banking functionality for UK banks

import { PaymentValidationService } from './payment-validation'

// Types for Open Banking API responses
export interface OpenBankingAccount {
  id: string
  accountId: string
  accountNumber: string
  sortCode: string
  accountHolderName: string
  accountType: 'PERSONAL' | 'BUSINESS'
  accountSubType: 'CURRENT_ACCOUNT' | 'SAVINGS_ACCOUNT'
  currency: string
  bankName: string
  balance?: {
    amount: number
    currency: string
  }
}

export interface OpenBankingConsent {
  consentId: string
  status: 'AUTHORISED' | 'AWAITING_AUTHORISATION' | 'REJECTED' | 'EXPIRED' | 'REVOKED'
  permissions: string[]
  expirationDateTime: string
  authorisationUrl?: string
}

export interface PaymentInitiation {
  paymentId: string
  status: 'PENDING' | 'AUTHORISED' | 'EXECUTED' | 'REJECTED' | 'CANCELLED'
  amount: number
  currency: string
  creditorAccount: {
    accountNumber: string
    sortCode: string
    accountHolderName: string
  }
  debtorAccount?: {
    accountNumber: string
    sortCode: string
    accountHolderName: string
  }
  reference: string
  authorisationUrl?: string
}

export interface OpenBankingProvider {
  id: string
  name: string
  displayName: string
  logo: string
  apiBaseUrl: string
  isActive: boolean
  supportedFeatures: {
    accountVerification: boolean
    paymentInitiation: boolean
    balanceCheck: boolean
    identityVerification: boolean
  }
}

// UK Open Banking Providers
export const OPEN_BANKING_PROVIDERS: OpenBankingProvider[] = [
  {
    id: 'truelayer',
    name: 'TrueLayer',
    displayName: 'TrueLayer Open Banking',
    logo: '/api/providers/truelayer/logo',
    apiBaseUrl: 'https://api.truelayer.com',
    isActive: true,
    supportedFeatures: {
      accountVerification: true,
      paymentInitiation: true,
      balanceCheck: true,
      identityVerification: true
    }
  },
  {
    id: 'yapily',
    name: 'Yapily',
    displayName: 'Yapily Open Banking',
    logo: '/api/providers/yapily/logo',
    apiBaseUrl: 'https://api.yapily.com',
    isActive: true,
    supportedFeatures: {
      accountVerification: true,
      paymentInitiation: true,
      balanceCheck: true,
      identityVerification: false
    }
  },
  {
    id: 'banked',
    name: 'Banked',
    displayName: 'Banked Payments',
    logo: '/api/providers/banked/logo',
    apiBaseUrl: 'https://api.banked.com',
    isActive: true,
    supportedFeatures: {
      accountVerification: true,
      paymentInitiation: true,
      balanceCheck: false,
      identityVerification: false
    }
  }
]

export class OpenBankingService {
  private static instance: OpenBankingService
  private apiKey: string
  private clientId: string
  private clientSecret: string
  private redirectUri: string
  private provider: OpenBankingProvider

  constructor(config: {
    apiKey: string
    clientId: string
    clientSecret: string
    redirectUri: string
    providerId?: string
  }) {
    this.apiKey = config.apiKey
    this.clientId = config.clientId
    this.clientSecret = config.clientSecret
    this.redirectUri = config.redirectUri
    this.provider = OPEN_BANKING_PROVIDERS.find(p => p.id === (config.providerId || 'truelayer'))!
  }

  static getInstance(config?: {
    apiKey: string
    clientId: string
    clientSecret: string
    redirectUri: string
    providerId?: string
  }): OpenBankingService {
    if (!OpenBankingService.instance && config) {
      OpenBankingService.instance = new OpenBankingService(config)
    }
    return OpenBankingService.instance
  }

  // Step 1: Create consent for account access
  async createAccountConsent(permissions: string[] = ['ReadAccountsDetail', 'ReadBalances']): Promise<OpenBankingConsent> {
    try {
      // Use provider-specific API endpoints and formats
      let apiUrl: string
      let requestBody: any
      let headers: Record<string, string>

      switch (this.provider.id) {
        case 'truelayer':
          apiUrl = `${this.provider.apiBaseUrl}/v1/data-consents`
          requestBody = {
            redirect_uri: this.redirectUri,
            permissions: permissions,
            expires_at: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() // 90 days
          }
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'Client-Id': this.clientId
          }
          break

        case 'yapily':
          apiUrl = `${this.provider.apiBaseUrl}/account-access-consents`
          requestBody = {
            applicationUserId: `user_${Date.now()}`,
            institutionId: 'gb-banco-santander',
            permissions: permissions,
            redirectUri: this.redirectUri
          }
          headers = {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
          }
          break

        case 'banked':
          apiUrl = `${this.provider.apiBaseUrl}/v2/auth/token`
          requestBody = {
            grant_type: 'client_credentials',
            scope: 'accounts:read',
            redirect_uri: this.redirectUri
          }
          headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
          }
          break

        default:
          throw new Error(`Provider ${this.provider.id} not supported`)
      }

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: this.provider.id === 'banked' 
          ? new URLSearchParams(requestBody).toString()
          : JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`${this.provider.displayName} API Error:`, {
          status: response.status,
          statusText: response.statusText,
          body: errorText
        })
        throw new Error(`${this.provider.displayName} API returned ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      
      // Transform response to common format
      return this.transformConsentResponse(data)

    } catch (error) {
      console.error(`Error creating consent with ${this.provider.displayName}:`, error)
      throw new Error(`Failed to create account consent: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  private transformConsentResponse(data: any): OpenBankingConsent {
    switch (this.provider.id) {
      case 'truelayer':
        return {
          consentId: data.consent_id,
          status: data.status?.toUpperCase() || 'AWAITING_AUTHORISATION',
          permissions: data.permissions || [],
          expirationDateTime: data.expires_at,
          authorisationUrl: data.auth_uri
        }

      case 'yapily':
        return {
          consentId: data.id,
          status: data.status?.toUpperCase() || 'AWAITING_AUTHORISATION',
          permissions: data.permissions || [],
          expirationDateTime: data.expirationDateTime,
          authorisationUrl: data.authorizationUrl
        }

      case 'banked':
        return {
          consentId: data.access_token || `banked_${Date.now()}`,
          status: 'AWAITING_AUTHORISATION',
          permissions: ['ReadAccountsDetail', 'ReadBalances'],
          expirationDateTime: new Date(Date.now() + (data.expires_in || 3600) * 1000).toISOString(),
          authorisationUrl: `${this.provider.apiBaseUrl}/auth/authorize?response_type=code&client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=accounts:read&state=${data.access_token}`
        }

      default:
        throw new Error(`Unknown provider response format for ${this.provider.id}`)
    }
  }

  // Step 2: Exchange authorization code for access token
  async exchangeCodeForToken(authorizationCode: string, consentId: string): Promise<string> {
    try {
      const response = await fetch(`${this.provider.apiBaseUrl}/connect/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: authorizationCode,
          redirect_uri: this.redirectUri
        })
      })

      if (!response.ok) {
        throw new Error(`Token exchange failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Token exchange failed:', error)
      throw new Error('Unable to authenticate with your bank. Please try again.')
    }
  }

  // Step 3: Get user's bank accounts
  async getAccounts(accessToken: string): Promise<OpenBankingAccount[]> {
    try {
      const response = await fetch(`${this.provider.apiBaseUrl}/data/v1/accounts`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-fapi-financial-id': this.clientId
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch accounts: ${response.statusText}`)
      }

      const data = await response.json()
      
      return data.accounts.map((account: any) => ({
        id: account.accountId,
        accountId: account.accountId,
        accountNumber: account.account?.[0]?.identification || '',
        sortCode: account.account?.[0]?.secondaryIdentification || '',
        accountHolderName: account.accountHolderName || '',
        accountType: account.accountType,
        accountSubType: account.accountSubType,
        currency: account.currency,
        bankName: account.servicer?.identification || this.provider.displayName,
        balance: account.balance ? {
          amount: parseFloat(account.balance.amount),
          currency: account.balance.currency
        } : undefined
      }))
    } catch (error) {
      console.error('Failed to fetch accounts:', error)
      throw new Error('Unable to fetch your bank accounts. Please try again.')
    }
  }

  // Step 4: Verify account holder name
  async verifyAccountHolderName(
    accessToken: string, 
    accountId: string, 
    expectedName: string
  ): Promise<{
    verified: boolean
    nameMatch: 'exact' | 'partial' | 'none'
    confidence: number
    accountHolderName: string
  }> {
    try {
      const accounts = await this.getAccounts(accessToken)
      const account = accounts.find(acc => acc.accountId === accountId)
      
      if (!account) {
        throw new Error('Account not found')
      }

      // Use the validation service to compare names
      const validationService = PaymentValidationService.getInstance()
      const nameValidation = validationService.validateUKAccountHolderName(expectedName)
      
      // Normalize names for comparison
      const normalizeString = (str: string) => str.toLowerCase().replace(/[^a-z\s]/g, '').trim()
      const normalizedExpected = normalizeString(expectedName)
      const normalizedActual = normalizeString(account.accountHolderName)
      
      let nameMatch: 'exact' | 'partial' | 'none' = 'none'
      let confidence = 0
      
      if (normalizedExpected === normalizedActual) {
        nameMatch = 'exact'
        confidence = 100
      } else {
        // Check for partial matches
        const expectedWords = normalizedExpected.split(' ')
        const actualWords = normalizedActual.split(' ')
        const matchingWords = expectedWords.filter(word => actualWords.includes(word))
        
        if (matchingWords.length >= 2 || (matchingWords.length === 1 && expectedWords.length === 2)) {
          nameMatch = 'partial'
          confidence = Math.round((matchingWords.length / Math.max(expectedWords.length, actualWords.length)) * 100)
        }
      }
      
      return {
        verified: nameMatch !== 'none' && confidence >= 70,
        nameMatch,
        confidence,
        accountHolderName: account.accountHolderName
      }
    } catch (error) {
      console.error('Name verification failed:', error)
      throw new Error('Unable to verify account holder name. Please try again.')
    }
  }

  // Step 5: Create payment initiation
  async createPayment(
    accessToken: string,
    payment: {
      amount: number
      currency: string
      creditorAccount: {
        accountNumber: string
        sortCode: string
        accountHolderName: string
      }
      debtorAccountId: string
      reference: string
    }
  ): Promise<PaymentInitiation> {
    try {
      const response = await fetch(`${this.provider.apiBaseUrl}/payments/v1/payments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'x-fapi-financial-id': this.clientId,
          'x-idempotency-key': `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        },
        body: JSON.stringify({
          instructedAmount: {
            amount: payment.amount.toFixed(2),
            currency: payment.currency
          },
          creditorAccount: {
            schemeName: 'UK.OBIE.SortCodeAccountNumber',
            identification: `${payment.creditorAccount.sortCode}${payment.creditorAccount.accountNumber}`,
            name: payment.creditorAccount.accountHolderName
          },
          debtorAccount: {
            accountId: payment.debtorAccountId
          },
          remittanceInformation: {
            reference: payment.reference
          }
        })
      })

      if (!response.ok) {
        throw new Error(`Payment creation failed: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        paymentId: data.paymentId,
        status: data.status,
        amount: payment.amount,
        currency: payment.currency,
        creditorAccount: payment.creditorAccount,
        reference: payment.reference,
        authorisationUrl: data.authorisationUrl || `${this.provider.apiBaseUrl}/payments/web-redirect?payment_id=${data.paymentId}&redirect_uri=${encodeURIComponent(this.redirectUri)}`
      }
    } catch (error) {
      console.error('Payment creation failed:', error)
      throw new Error('Unable to create payment. Please try again.')
    }
  }

  // Get payment status
  async getPaymentStatus(accessToken: string, paymentId: string): Promise<PaymentInitiation> {
    try {
      const response = await fetch(`${this.provider.apiBaseUrl}/payments/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-fapi-financial-id': this.clientId
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get payment status: ${response.statusText}`)
      }

      const data = await response.json()
      
      return {
        paymentId: data.paymentId,
        status: data.status,
        amount: parseFloat(data.instructedAmount.amount),
        currency: data.instructedAmount.currency,
        creditorAccount: {
          accountNumber: data.creditorAccount.identification.slice(-8),
          sortCode: data.creditorAccount.identification.slice(0, 6),
          accountHolderName: data.creditorAccount.name
        },
        reference: data.remittanceInformation?.reference || ''
      }
    } catch (error) {
      console.error('Failed to get payment status:', error)
      throw new Error('Unable to check payment status. Please try again.')
    }
  }

  // Revoke consent
  async revokeConsent(accessToken: string, consentId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.provider.apiBaseUrl}/data/v1/account-access-consents/${consentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'x-fapi-financial-id': this.clientId
        }
      })

      return response.ok
    } catch (error) {
      console.error('Failed to revoke consent:', error)
      return false
    }
  }
}
