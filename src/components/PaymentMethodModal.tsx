'use client'

import { useState } from 'react'
import Modal from './Modal'
import { toast } from 'react-hot-toast'
import { PaymentValidationService } from '@/lib/payment-validation'
import OpenBankingModal from './OpenBankingModal'
import { type OpenBankingAccount } from '@/lib/open-banking'

interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  isDefault: boolean
}

interface PaymentMethodModalProps {
  isOpen: boolean
  onClose: () => void
  onAddPaymentMethod: (paymentMethod: PaymentMethod) => void
}

export default function PaymentMethodModal({ 
  isOpen, 
  onClose, 
  onAddPaymentMethod 
}: PaymentMethodModalProps) {
  const [paymentType, setPaymentType] = useState<'card' | 'paypal' | 'bank'>('card')
  const [formData, setFormData] = useState({
    // Card fields
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    // PayPal fields
    paypalEmail: '',
    // Bank fields
    accountHolderName: '',
    accountNumber: '',
    sortCode: '',
    bankName: '',
    // Common
    isDefault: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [nameValidation, setNameValidation] = useState<{
    isValid: boolean
    message: string
    type: 'success' | 'error' | 'warning' | ''
    confidence?: number
    suggestions?: string[]
  }>({ isValid: false, message: '', type: '' })
  const [isValidatingName, setIsValidatingName] = useState(false)
  const [isOpenBankingModalOpen, setIsOpenBankingModalOpen] = useState(false)
  const [verifiedAccount, setVerifiedAccount] = useState<OpenBankingAccount | null>(null)

  const validateNameWithService = async (name: string) => {
    if (!name.trim()) {
      return { isValid: false, message: '', type: '' as const }
    }

    setIsValidatingName(true)
    
    try {
      // Option 1: Use local validation service
      const validationService = PaymentValidationService.getInstance()
      const localResult = await validationService.validateNameWithBankingService(name)
      
      // Option 2: Use API endpoint for enhanced validation (optional)
      try {
        const apiResponse = await fetch('/api/validate-payment-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            name, 
            validateWithExternalService: true 
          })
        })
        
        if (apiResponse.ok) {
          const apiResult = await apiResponse.json()
          if (apiResult.success) {
            const validation = apiResult.validation
            
            if (validation.isValid && validation.confidence >= 70) {
              return { 
                isValid: true, 
                message: `Valid UK bank account name format ✓ (${validation.confidence}% confidence)`, 
                type: 'success' as const,
                confidence: validation.confidence,
                suggestions: validation.suggestions
              }
            } else if (validation.confidence >= 50) {
              return { 
                isValid: true, 
                message: `Acceptable name format (${validation.confidence}% confidence)`, 
                type: 'warning' as const,
                confidence: validation.confidence,
                suggestions: validation.suggestions
              }
            } else {
              return { 
                isValid: false, 
                message: `Name format may not match UK banking standards (${validation.confidence}% confidence)`, 
                type: 'error' as const,
                suggestions: validation.suggestions
              }
            }
          }
        }
      } catch (apiError) {
        console.warn('API validation failed, using local validation:', apiError)
      }
      
      // Fallback to local validation result
      if (localResult.isValidFormat && localResult.riskScore < 30) {
        return { 
          isValid: true, 
          message: 'Valid UK bank account name format ✓', 
          type: 'success' as const,
          confidence: 100 - localResult.riskScore,
          suggestions: localResult.suggestions
        }
      } else if (localResult.isValidFormat && localResult.riskScore < 60) {
        return { 
          isValid: true, 
          message: 'Acceptable name format (medium confidence)', 
          type: 'warning' as const,
          confidence: 100 - localResult.riskScore,
          suggestions: localResult.suggestions
        }
      } else {
        return { 
          isValid: false, 
          message: 'Name format may not match UK banking standards', 
          type: 'error' as const,
          suggestions: localResult.suggestions
        }
      }
    } catch (error) {
      console.error('Name validation error:', error)
      // Fallback to basic validation
      return validateNameRealTime(name)
    } finally {
      setIsValidatingName(false)
    }
  }

  const handleOpenBankingVerification = (account: OpenBankingAccount) => {
    setVerifiedAccount(account)
    setFormData(prev => ({
      ...prev,
      accountHolderName: account.accountHolderName
    }))
    setNameValidation({
      isValid: true,
      message: `✅ Account verified via Open Banking (${account.bankName})`,
      type: 'success',
      confidence: 100
    })
    toast.success('Bank account verified successfully!', {
      icon: '🏦',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const validateNameRealTime = (name: string) => {
    if (!name.trim()) {
      return { isValid: false, message: '', type: '' as const }
    }

    const trimmedName = name.trim()

    // Check minimum length
    if (trimmedName.length < 2) {
      return { isValid: false, message: 'Name too short (minimum 2 characters)', type: 'error' as const }
    }

    // Check maximum length
    if (trimmedName.length > 35) {
      return { isValid: false, message: 'Name too long (maximum 35 characters)', type: 'error' as const }
    }

    // Check for valid characters only
    const validNameRegex = /^[A-Za-z\s\-']+$/
    if (!validNameRegex.test(trimmedName)) {
      return { isValid: false, message: 'Only letters, spaces, hyphens, and apostrophes allowed', type: 'error' as const }
    }

    // Check for consecutive spaces or special characters
    if (trimmedName.includes('  ') || trimmedName.includes('--') || trimmedName.includes("''")) {
      return { isValid: false, message: 'No consecutive spaces or special characters', type: 'error' as const }
    }

    // Check that name starts and ends with a letter
    if (!/^[A-Za-z].*[A-Za-z]$/.test(trimmedName) && trimmedName.length > 1) {
      return { isValid: false, message: 'Name must start and end with a letter', type: 'error' as const }
    }

    // Check for at least one space (indicating first and last name)
    if (!trimmedName.includes(' ')) {
      return { isValid: false, message: 'Please include both first and last name', type: 'warning' as const }
    }

    // Check each word is valid
    const words = trimmedName.split(' ').filter(word => word.length > 0)
    if (words.length < 2) {
      return { isValid: false, message: 'Please enter both first and last name', type: 'warning' as const }
    }

    // All checks passed
    return { isValid: true, message: 'Valid UK bank account name format', type: 'success' as const }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Real-time validation for bank transfer name
    if (name === 'accountHolderName' && paymentType === 'bank') {
      // First do immediate basic validation
      const basicValidation = validateNameRealTime(value)
      setNameValidation(basicValidation)
      
      // Then do enhanced validation with debouncing
      if (value.trim().length >= 3) {
        setTimeout(async () => {
          const enhancedValidation = await validateNameWithService(value)
          setNameValidation(enhancedValidation)
        }, 500) // Debounce API calls
      }
    }
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    // Add spaces every 4 digits
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.replace(/\s/g, '').length <= 16) {
      setFormData(prev => ({ ...prev, cardNumber: formatted }))
    }
  }

  const formatSortCode = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '')
    // Add hyphens every 2 digits
    return digits.replace(/(\d{2})(?=\d)/g, '$1-')
  }

  const handleSortCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSortCode(e.target.value)
    if (formatted.replace(/-/g, '').length <= 6) {
      setFormData(prev => ({ ...prev, sortCode: formatted }))
    }
  }

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '')
    if (digits.length <= 8) {
      setFormData(prev => ({ ...prev, accountNumber: digits }))
    }
  }

  const getCardBrand = (cardNumber: string) => {
    const digits = cardNumber.replace(/\s/g, '')
    if (digits.startsWith('4')) return 'Visa'
    if (digits.startsWith('5') || digits.startsWith('2')) return 'Mastercard'
    if (digits.startsWith('3')) return 'American Express'
    return 'Unknown'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (paymentType === 'card') {
        const digits = formData.cardNumber.replace(/\s/g, '')
        if (digits.length < 13 || digits.length > 19) {
          toast.error('Please enter a valid card number')
          return
        }
        if (!formData.expiryMonth || !formData.expiryYear) {
          toast.error('Please enter expiry date')
          return
        }
        if (!formData.cvv || formData.cvv.length < 3) {
          toast.error('Please enter a valid CVV')
          return
        }
        if (!formData.cardholderName.trim()) {
          toast.error('Please enter cardholder name')
          return
        }
      } else if (paymentType === 'paypal') {
        if (!formData.paypalEmail.trim()) {
          toast.error('Please enter your PayPal email')
          return
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.paypalEmail)) {
          toast.error('Please enter a valid email address')
          return
        }
      } else if (paymentType === 'bank') {
        if (!formData.accountHolderName.trim()) {
          toast.error('Please enter your name for payment reference')
          return
        }
        
        // Validate UK bank account name format
        const name = formData.accountHolderName.trim()
        
        // Check minimum length
        if (name.length < 2) {
          toast.error('Name must be at least 2 characters long')
          return
        }
        
        // Check maximum length (UK banks typically allow 18-35 characters)
        if (name.length > 35) {
          toast.error('Name must be 35 characters or less')
          return
        }
        
        // Check for valid characters only (letters, spaces, hyphens, apostrophes)
        const validNameRegex = /^[A-Za-z\s\-']+$/
        if (!validNameRegex.test(name)) {
          toast.error('Name can only contain letters, spaces, hyphens, and apostrophes')
          return
        }
        
        // Check for consecutive spaces or special characters
        if (name.includes('  ') || name.includes('--') || name.includes("''")) {
          toast.error('Name cannot contain consecutive spaces or special characters')
          return
        }
        
        // Check that name starts and ends with a letter
        if (!/^[A-Za-z].*[A-Za-z]$/.test(name) && name.length > 1) {
          toast.error('Name must start and end with a letter')
          return
        }
        
        // Check for at least one space (indicating first and last name)
        if (!name.includes(' ')) {
          toast.error('Please enter your full name (first and last name)')
          return
        }
        
        // Check each word is valid (no single letters except common initials)
        const words = name.split(' ').filter(word => word.length > 0)
        if (words.length < 2) {
          toast.error('Please enter both first and last name')
          return
        }
        
        // Validate each word
        for (const word of words) {
          if (word.length === 1 && !['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].includes(word.toUpperCase())) {
            toast.error('Single letter names must be valid initials (A-Z)')
            return
          }
        }
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newPaymentMethod: PaymentMethod = {
        id: `pm_${Date.now()}`,
        type: paymentType,
        isDefault: formData.isDefault,
        ...(paymentType === 'card' && {
          last4: formData.cardNumber.replace(/\s/g, '').slice(-4),
          brand: getCardBrand(formData.cardNumber),
          expiryMonth: parseInt(formData.expiryMonth),
          expiryYear: parseInt(formData.expiryYear)
        }),
        ...(paymentType === 'paypal' && {
          email: formData.paypalEmail
        }),
        ...(paymentType === 'bank' && {
          last4: '7014', // Last 4 digits of Waqar Ahmed's account
          brand: 'Bank Transfer (Waqar Ahmed)'
        })
      }

      onAddPaymentMethod(newPaymentMethod)
      
      toast.success(`${
        paymentType === 'card' 
          ? 'Card' 
          : paymentType === 'bank'
          ? 'Bank transfer payment method'
          : 'Payment method'
      } added successfully!`, {
        icon: paymentType === 'bank' ? '🏦' : '💳',
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
        }
      })

      // Reset form
      setFormData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        cardholderName: '',
        paypalEmail: '',
        accountHolderName: '',
        accountNumber: '',
        sortCode: '',
        bankName: '',
        isDefault: false
      })
      
      // Reset validation state
      setNameValidation({ isValid: false, message: '', type: '' })
      setVerifiedAccount(null)
      
      onClose()
    } catch (error) {
      toast.error('Failed to add payment method. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 20 }, (_, i) => currentYear + i)

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Add Payment Method">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { type: 'card' as const, label: 'Credit Card', icon: '💳' },
              { type: 'paypal' as const, label: 'PayPal', icon: '🅿️' },
              { type: 'bank' as const, label: 'Bank Account', icon: '🏦' }
            ].map(({ type, label, icon }) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setPaymentType(type)
                  // Clear validation state when switching payment types
                  setNameValidation({ isValid: false, message: '', type: '' })
                  setVerifiedAccount(null)
                }}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  paymentType === type
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="text-sm font-medium">{label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Card Form */}
        {paymentType === 'card' && (
          <>
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
              {formData.cardNumber && (
                <div className="mt-1 text-sm text-gray-500">
                  {getCardBrand(formData.cardNumber)}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryMonth" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Month
                </label>
                <select
                  id="expiryMonth"
                  name="expiryMonth"
                  value={formData.expiryMonth}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {String(i + 1).padStart(2, '0')}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="expiryYear" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Year
                </label>
                <select
                  id="expiryYear"
                  name="expiryYear"
                  value={formData.expiryYear}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>
          </>
        )}

        {/* PayPal Form */}
        {paymentType === 'paypal' && (
          <div>
            <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-2">
              PayPal Email Address
            </label>
            <input
              type="email"
              id="paypalEmail"
              name="paypalEmail"
              value={formData.paypalEmail}
              onChange={handleInputChange}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🅿️</div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    PayPal Integration
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    We&apos;ll securely link your PayPal account for future payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer Form */}
        {paymentType === 'bank' && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">🏦</div>
                <div>
                  <p className="text-sm font-medium text-blue-800">
                    Bank Transfer Payment
                  </p>
                  <p className="text-sm text-blue-600 mt-1">
                    Payments will be sent to Waqar Ahmed&apos;s account for tutoring services
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Payment Details</h4>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Holder:</span>
                  <span className="font-medium text-gray-900">Waqar Ahmed</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sort Code:</span>
                  <span className="font-medium text-gray-900">23-14-70</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium text-gray-900">80647014</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                  Your Full Name (for payment reference) *
                </label>
                <button
                  type="button"
                  onClick={() => setIsOpenBankingModalOpen(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  🔒 Verify with Open Banking
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="studentName"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name (e.g., John Smith)"
                  className={`w-full px-3 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent ${
                    nameValidation.type === 'error' 
                      ? 'border-red-300 focus:ring-red-500' 
                      : nameValidation.type === 'success'
                      ? 'border-green-300 focus:ring-green-500'
                      : nameValidation.type === 'warning'
                      ? 'border-yellow-300 focus:ring-yellow-500'
                      : 'border-gray-300 focus:ring-indigo-500'
                  }`}
                  required
                  maxLength={35}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {isValidatingName ? (
                    <div className="animate-spin h-5 w-5 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                  ) : nameValidation.type === 'success' ? (
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  ) : nameValidation.type === 'warning' ? (
                    <svg className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : null}
                </div>
              </div>
              
              {/* Real-time validation feedback */}
              {nameValidation.message && (
                <div className="mt-1">
                  <div className={`text-sm flex items-center ${
                    nameValidation.type === 'error' 
                      ? 'text-red-600' 
                      : nameValidation.type === 'success'
                      ? 'text-green-600'
                      : nameValidation.type === 'warning'
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }`}>
                    {nameValidation.message}
                    {nameValidation.confidence && (
                      <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded">
                        {nameValidation.confidence}% confidence
                      </span>
                    )}
                  </div>
                  
                  {/* Show suggestions if available */}
                  {nameValidation.suggestions && nameValidation.suggestions.length > 0 && (
                    <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                      <p className="text-xs font-medium text-blue-800 mb-1">Suggestions:</p>
                      <ul className="text-xs text-blue-700 space-y-0.5">
                        {nameValidation.suggestions.map((suggestion, index) => (
                          <li key={index}>• {suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              {/* Verified Account Display */}
              {verifiedAccount && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-green-800">Account Verified ✓</h4>
                      <div className="mt-1 text-sm text-green-700">
                        <p><strong>Bank:</strong> {verifiedAccount.bankName}</p>
                        <p><strong>Account Holder:</strong> {verifiedAccount.accountHolderName}</p>
                        <p><strong>Account:</strong> •••• {verifiedAccount.accountNumber?.slice(-4)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  This will be used as the payment reference when you make transfers
                </p>
                <div className="mt-1 text-xs text-gray-400">
                  <p>Name requirements:</p>
                  <ul className="list-disc list-inside space-y-0.5 mt-1">
                    <li>Must include first and last name</li>
                    <li>2-35 characters long</li>
                    <li>Letters, spaces, hyphens, and apostrophes only</li>
                    <li>Must start and end with a letter</li>
                    <li>No consecutive spaces or special characters</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="text-2xl mr-3">💳</div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    How Bank Transfer Payment Works
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Use the account details above to send payments</li>
                    <li>• Include your name as the payment reference</li>
                    <li>• Payments go directly to the tutor&apos;s account</li>
                    <li>• You&apos;ll receive confirmation once payment is received</li>
                  </ul>
                  <div className="mt-3 p-2 bg-yellow-100 rounded border border-yellow-300">
                    <p className="text-xs text-yellow-800 font-medium">
                      ⚠️ Important: Your name is only used for payment reference. 
                      We don&apos;t collect your bank account details.
                    </p>
                  </div>
                  <div className="mt-2 p-2 bg-blue-100 rounded border border-blue-300">
                    <p className="text-xs text-blue-800 font-medium">
                      🔒 Enhanced Validation: We use banking industry standards to verify 
                      your name format matches UK bank account requirements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Set as Default */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDefault"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleInputChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
            Set as default payment method
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Adding...
              </div>
            ) : (
              'Add Payment Method'
            )}
          </button>
        </div>
      </form>
      </Modal>

      {/* Open Banking Modal - Render outside to avoid nesting issues */}
      <OpenBankingModal
        isOpen={isOpenBankingModalOpen}
        onClose={() => setIsOpenBankingModalOpen(false)}
        onAccountVerified={handleOpenBankingVerification}
        userProvidedName={formData.accountHolderName}
      />
    </>
  )
}
