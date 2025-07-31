'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BanknotesIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  ArrowRightIcon,
  CreditCardIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import { OPEN_BANKING_PROVIDERS, type OpenBankingProvider, type OpenBankingAccount } from '@/lib/open-banking'

interface OpenBankingModalProps {
  isOpen: boolean
  onClose: () => void
  onAccountVerified: (account: OpenBankingAccount) => void
  userProvidedName: string
}

export default function OpenBankingModal({ 
  isOpen, 
  onClose, 
  onAccountVerified,
  userProvidedName 
}: OpenBankingModalProps) {
  const [step, setStep] = useState<'provider' | 'consent' | 'verification' | 'complete'>('provider')
  const [selectedProvider, setSelectedProvider] = useState<OpenBankingProvider | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [consent, setConsent] = useState<any>(null)
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [connectedAccount, setConnectedAccount] = useState<OpenBankingAccount | null>(null)

  // Handle URL parameters from Open Banking callback
  useEffect(() => {
    const handleCallback = async () => {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search)
        const success = urlParams.get('success')
        const error = urlParams.get('error')
        const accountData = urlParams.get('account')
        const token = urlParams.get('token')

        if (success && accountData && token) {
          try {
            const account = JSON.parse(decodeURIComponent(accountData))
            setConnectedAccount(account)
            setStep('verification')
            
            // Verify the account holder name
            await verifyAccountName(decodeURIComponent(token), account.accountId)
          } catch (err) {
            console.error('Failed to parse account data:', err)
          }
        }

        if (error) {
          toast.error(decodeURIComponent(error))
          setStep('provider')
        }
      }
    }

    handleCallback()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleProviderSelect = async (provider: OpenBankingProvider) => {
    setSelectedProvider(provider)
    setIsLoading(true)

    try {
      const response = await fetch('/api/open-banking/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          permissions: ['ReadAccountsDetail', 'ReadBalances', 'ReadTransactionsDetail'],
          providerId: provider.id,
          redirectUri: `${window.location.origin}/api/open-banking/callback`
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.consent) {
        setConsent(data.consent)
        setStep('consent')
        
        // Store consent details for callback
        localStorage.setItem('openBankingConsent', JSON.stringify({
          consentId: data.consent.consentId,
          providerId: provider.id,
          userProvidedName: userProvidedName
        }))
        
        // Redirect to bank authorization
        if (data.consent.authorisationUrl) {
          window.location.href = data.consent.authorisationUrl
        } else {
          throw new Error('No authorization URL received from provider')
        }
      } else if (data.requiresSetup) {
        // Service not configured
        toast.error(
          <div className="text-center">
            <p>Bank verification is not available yet.</p>
            <p className="mt-2 font-medium">Contact us for help:</p>
            <div className="flex gap-2 justify-center mt-2">
              <a 
                href="tel:+447446255033" 
                className="text-blue-600 hover:text-blue-700 underline font-bold"
              >
                📞 Call
              </a>
              <span className="text-gray-500">|</span>
              <a 
                href="https://wa.me/447446255033" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 underline font-bold"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>, 
          {
            duration: 8000,
            icon: '⚙️'
          }
        )
        setStep('provider')
      } else {
        throw new Error(data.error || 'Failed to create consent with provider')
      }
    } catch (error) {
      console.error('Open Banking consent creation failed:', error)
      toast.error(
        <div className="text-center">
          <p>Failed to connect to {provider.displayName}. Please try again.</p>
          <p className="mt-2 font-medium">Need help?</p>
          <div className="flex gap-2 justify-center mt-2">
            <a 
              href="tel:+447446255033" 
              className="text-blue-600 hover:text-blue-700 underline font-bold"
            >
              📞 Call
            </a>
            <span className="text-gray-500">|</span>
            <a 
              href="https://wa.me/447446255033" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 underline font-bold"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>,
        {
          duration: 6000
        }
      )
      setStep('provider')
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAccountName = async (accessToken: string, accountId: string) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/open-banking/verify-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          accountId,
          expectedName: userProvidedName,
          providerId: selectedProvider?.id
        })
      })

      const data = await response.json()

      if (data.success) {
        setVerificationResult(data.verification)
        
        if (data.verification.verified) {
          setStep('complete')
          toast.success('Bank account verified successfully!', {
            icon: '✅',
            style: {
              borderRadius: '10px',
              background: '#10B981',
              color: '#fff',
            }
          })
        } else {
          toast.error(`Name verification failed: ${data.verification.nameMatch}% match`)
        }
      } else {
        throw new Error(data.error || 'Verification failed')
      }
    } catch (error) {
      console.error('Account verification failed:', error)
      toast.error('Failed to verify account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleComplete = () => {
    if (connectedAccount && verificationResult?.verified) {
      // Create enhanced account object with verification data
      const verifiedAccount = {
        ...connectedAccount,
        // Add verification metadata without modifying the original type
        __verification: {
          verified: true,
          confidence: verificationResult.confidence,
          verifiedAt: new Date().toISOString()
        }
      }
      onAccountVerified(verifiedAccount)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity" 
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }} 
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <BanknotesIcon className="h-6 w-6 text-blue-600" />
              </div>
              <button
                type="button"
                className="rounded-md p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <h3 className="text-lg font-medium text-gray-900 text-center">
              {step === 'provider' && 'Connect Your Bank Account'}
              {step === 'consent' && 'Authorize Bank Access'}
              {step === 'verification' && 'Verifying Account'}
              {step === 'complete' && 'Account Connected!'}
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2">
              {step === 'provider' && 'Securely verify your identity using Open Banking'}
              {step === 'consent' && 'You will be redirected to your bank to authorize access'}
              {step === 'verification' && 'Checking account holder name matches your provided details'}
              {step === 'complete' && 'Your bank account has been successfully verified'}
            </p>
          </div>

          {/* Provider Selection */}
          {step === 'provider' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Open Banking Verification</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Connect your bank account to verify your identity and enable secure payments. 
                      This uses regulated Open Banking APIs and is FCA approved.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {OPEN_BANKING_PROVIDERS.filter(p => p.isActive).map((provider) => (
                  <button
                    key={provider.id}
                    onClick={() => handleProviderSelect(provider)}
                    disabled={isLoading}
                    className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                      <CreditCardIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{provider.displayName}</p>
                      <p className="text-sm text-gray-600">
                        {provider.supportedFeatures.accountVerification ? 'Account Verification' : ''}
                        {provider.supportedFeatures.paymentInitiation ? ' • Payment Initiation' : ''}
                      </p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 text-gray-400" />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Consent Step */}
          {step === 'consent' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to {selectedProvider?.displayName}...</p>
                <p className="text-sm text-gray-500 mt-2">
                  You will be asked to authorize access to your account information.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">What happens next?</p>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• You&apos;ll be redirected to your bank&apos;s secure website</li>
                      <li>• Login with your online banking credentials</li>
                      <li>• Authorize read-only access to your account details</li>
                      <li>• We&apos;ll verify your name matches your account</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Verification Step */}
          {step === 'verification' && (
            <div className="space-y-4">
              <div className="text-center">
                {isLoading ? (
                  <>
                    <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Verifying account details...</p>
                  </>
                ) : verificationResult ? (
                  <>
                    <div className={`h-8 w-8 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      verificationResult.verified ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {verificationResult.verified ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                      ) : (
                        <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <p className={`font-medium ${
                      verificationResult.verified ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {verificationResult.verified ? 'Verification Successful' : 'Verification Failed'}
                    </p>
                  </>
                ) : null}
              </div>

              {connectedAccount && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Connected Account</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Bank:</span> {connectedAccount.bankName}</p>
                    <p><span className="text-gray-600">Account:</span> •••• {connectedAccount.accountNumber?.slice(-4)}</p>
                    <p><span className="text-gray-600">Name:</span> {connectedAccount.accountHolderName}</p>
                  </div>
                </div>
              )}

              {verificationResult && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Verification Result</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">Expected Name:</span> {userProvidedName}</p>
                    <p><span className="text-gray-600">Account Name:</span> {verificationResult.accountHolderName}</p>
                    <p><span className="text-gray-600">Match Type:</span> {verificationResult.nameMatch}</p>
                    <p><span className="text-gray-600">Confidence:</span> {verificationResult.confidence}%</p>
                  </div>
                </div>
              )}

              {verificationResult?.verified && (
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleComplete}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Add Verified Account
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Complete Step */}
          {step === 'complete' && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-green-600 font-medium">Account Successfully Connected!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Your bank account has been verified and can now be used for secure payments.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">What&apos;s Next?</p>
                    <ul className="text-sm text-green-700 mt-1 space-y-1">
                      <li>• Your account is now verified for payments</li>
                      <li>• You can initiate secure payments using Open Banking</li>
                      <li>• All transactions are protected by bank-level security</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleComplete}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
