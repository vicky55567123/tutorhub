'use client'

import { useAuth } from '@/components/AuthContext'
import PaymentMethodModal from '@/components/PaymentMethodModal'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCardIcon,
  CalendarIcon,
  ReceiptRefundIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentTextIcon,
  PlusIcon,
  CurrencyPoundIcon,
  ShieldCheckIcon,
  ClockIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank'
  last4?: string
  brand?: string
  expiryMonth?: number
  expiryYear?: number
  email?: string
  isDefault: boolean
}

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  status: 'completed' | 'pending' | 'failed' | 'refunded'
  paymentMethod: string
  receiptUrl?: string
}

interface Subscription {
  id: string
  planName: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  status: 'active' | 'cancelled' | 'expired'
  nextBillingDate: string
  features: string[]
}

export default function BillingPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  
  // Mock data - in real app, this would come from API
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions] = useState<Transaction[]>([])
  const [subscription] = useState<Subscription | null>(null)

  // Handle Open Banking callback
  useEffect(() => {
    const handleOpenBankingCallback = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const success = urlParams.get('success')
      const accountData = urlParams.get('account')
      const provider = urlParams.get('provider')
      const error = urlParams.get('error')

      if (error) {
        toast.error(`Bank verification failed: ${error}`)
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname)
        return
      }

      if (success && accountData) {
        try {
          const account = JSON.parse(decodeURIComponent(accountData))
          
          // Only process real verified bank accounts (not test data)
          if (account.id && !account.id.includes('test_account')) {
            // Create new payment method from verified bank account
            const newPaymentMethod: PaymentMethod = {
              id: account.id,
              type: 'bank',
              last4: account.accountNumber?.slice(-4) || '****',
              brand: account.bankName || 'Bank Account',
              isDefault: paymentMethods.length === 0 // Make first one default
            }

            // Add the verified bank account as a payment method
            setPaymentMethods(prev => [...prev, newPaymentMethod])
            
            toast.success(`Bank account verified successfully! ${account.accountHolderName}'s ${account.bankName} account has been added.`, {
              duration: 6000,
              icon: '🏦'
            })

            // Switch to payment methods tab to show the new account
            setActiveTab('payment-methods')
          } else {
            // Reject test/fake accounts
            toast.error('Cannot add test account. Please use a real bank account for verification.', {
              duration: 6000,
              icon: '❌'
            })
          }
          setActiveTab('payment-methods')

        } catch (parseError) {
          console.error('Failed to parse account data:', parseError)
          toast.error('Failed to process bank verification data')
        }

        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname)
      }
    }

    handleOpenBankingCallback()
  }, [paymentMethods.length])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CreditCardIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view billing information.</p>
        </div>
      </div>
    )
  }

  const handleAddPaymentMethod = () => {
    setIsPaymentModalOpen(true)
  }

  const onAddPaymentMethod = (newPaymentMethod: PaymentMethod) => {
    setPaymentMethods(prev => {
      // If this is set as default, make all others non-default
      if (newPaymentMethod.isDefault) {
        const updatedMethods = prev.map(method => ({ ...method, isDefault: false }))
        return [...updatedMethods, newPaymentMethod]
      }
      return [...prev, newPaymentMethod]
    })
  }

  const handleSubscribe = (planName: string, price: number) => {
    toast.success(`Subscription to ${planName} would be processed here`, {
      icon: '🎓',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const handleDownloadReceipt = (transactionId: string) => {
    toast.success('Receipt download started', {
      icon: '📄',
      style: {
        borderRadius: '10px',
        background: '#10B981',
        color: '#fff',
      }
    })
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`, {
        icon: '📋',
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
        }
      })
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'refunded':
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 9.99,
      billingCycle: 'monthly' as const,
      features: [
        'Access to basic courses',
        'Community forum access',
        'Basic progress tracking',
        'Email support'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 19.99,
      billingCycle: 'monthly' as const,
      features: [
        'Access to all courses',
        'Priority tutor matching',
        'Advanced progress analytics',
        'Live Q&A sessions',
        '1-on-1 tutor consultations',
        'Certificate of completion',
        'Priority email support'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 39.99,
      billingCycle: 'monthly' as const,
      features: [
        'Everything in Premium',
        'Unlimited 1-on-1 sessions',
        'Custom learning paths',
        'Advanced reporting',
        'API access',
        'White-label options',
        'Dedicated account manager'
      ],
      popular: false
    }
  ]

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'subscription', name: 'Subscription' },
    { id: 'payment-methods', name: 'Payment Methods' },
    { id: 'transactions', name: 'Transaction History' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <CreditCardIcon className="h-8 w-8 text-gray-600 mr-3" />
            Billing & Subscriptions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your subscriptions, payment methods, and billing history
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-2 shadow-sm mb-8"
        >
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Current Plan</h3>
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {subscription ? subscription.planName : 'Free Plan'}
                </p>
                <p className="text-gray-600 mt-2">
                  {subscription 
                    ? `£${subscription.price}/month`
                    : 'No active subscription'
                  }
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Next Billing</h3>
                  <CalendarIcon className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {subscription ? subscription.nextBillingDate : 'N/A'}
                </p>
                <p className="text-gray-600 mt-2">
                  {subscription ? 'Automatic renewal' : 'No active billing'}
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                  <CurrencyPoundIcon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  £{transactions.reduce((sum, t) => t.status === 'completed' ? sum + t.amount : sum, 0).toFixed(2)}
                </p>
                <p className="text-gray-600 mt-2">
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('subscription')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors text-left"
                >
                  <ShieldCheckIcon className="h-6 w-6 text-primary-600 mb-2" />
                  <p className="font-medium text-gray-900">Upgrade Plan</p>
                  <p className="text-sm text-gray-600">Get access to premium features</p>
                </button>
                
                <button
                  onClick={() => setActiveTab('payment-methods')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
                >
                  <CreditCardIcon className="h-6 w-6 text-green-600 mb-2" />
                  <p className="font-medium text-gray-900">Payment Methods</p>
                  <p className="text-sm text-gray-600">Manage your cards and accounts</p>
                </button>
                
                <button
                  onClick={() => setActiveTab('transactions')}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
                >
                  <DocumentTextIcon className="h-6 w-6 text-blue-600 mb-2" />
                  <p className="font-medium text-gray-900">View History</p>
                  <p className="text-sm text-gray-600">Download receipts and invoices</p>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:border-yellow-300 hover:bg-yellow-50 transition-colors text-left">
                  <ReceiptRefundIcon className="h-6 w-6 text-yellow-600 mb-2" />
                  <p className="font-medium text-gray-900">Get Support</p>
                  <p className="text-sm text-gray-600">Billing questions and refunds</p>
                </button>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CurrencyPoundIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Information</h3>
                  <p className="text-gray-600 mb-4">
                    For tutoring sessions and course payments, use the payment methods provided.
                  </p>
                  <button
                    onClick={() => setActiveTab('payment-methods')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <CreditCardIcon className="h-4 w-4 mr-2" />
                    View Payment Methods
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Current Subscription */}
            {subscription && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Subscription</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-gray-900">{subscription.planName}</p>
                    <p className="text-gray-600">£{subscription.price}/{subscription.billingCycle}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2 ${getStatusColor(subscription.status)}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Next billing date</p>
                    <p className="font-semibold text-gray-900">{subscription.nextBillingDate}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Available Plans */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                {subscription ? 'Change Plan' : 'Choose Your Plan'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {pricingPlans.map(plan => (
                  <div
                    key={plan.id}
                    className={`bg-white rounded-xl p-6 shadow-sm border-2 ${
                      plan.popular ? 'border-primary-200 relative' : 'border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h4>
                      <div className="text-3xl font-bold text-gray-900">
                        £{plan.price}
                        <span className="text-base font-normal text-gray-600">/{plan.billingCycle}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSubscribe(plan.name, plan.price)}
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        plan.popular
                          ? 'bg-primary-600 text-white hover:bg-primary-700'
                          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                      }`}
                    >
                      {subscription && subscription.planName === plan.name
                        ? 'Current Plan'
                        : subscription
                        ? 'Switch to This Plan'
                        : 'Get Started'
                      }
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payment-methods' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Payment Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CurrencyPoundIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Instructions</h3>
                  <p className="text-gray-600 mb-4">
                    To pay for tutoring services, please send payment to the following account:
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="group">
                        <p className="text-sm font-medium text-gray-500">Account Holder</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900">Waqar Ahmed</p>
                          <button
                            onClick={() => copyToClipboard('Waqar Ahmed', 'Account holder name')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                            title="Copy account holder name"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="group">
                        <p className="text-sm font-medium text-gray-500">Sort Code</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900">23-14-70</p>
                          <button
                            onClick={() => copyToClipboard('23-14-70', 'Sort code')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                            title="Copy sort code"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                      <div className="group">
                        <p className="text-sm font-medium text-gray-500">Account Number</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-900">80647014</p>
                          <button
                            onClick={() => copyToClipboard('80647014', 'Account number')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
                            title="Copy account number"
                          >
                            <ClipboardDocumentIcon className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-600">
                          <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                          <span>Please include your name and course details as payment reference</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard('Waqar Ahmed\n23-14-70\n80647014', 'All payment details')}
                          className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                        >
                          <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                          Copy All
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Payment Methods</h3>
              <button
                onClick={handleAddPaymentMethod}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Add Payment Method
              </button>
            </div>

            {paymentMethods.length > 0 ? (
              <div className="space-y-4">
                {paymentMethods.map(method => (
                  <div key={method.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center mr-4">
                          {method.type === 'card' ? (
                            <CreditCardIcon className="h-5 w-5 text-gray-600" />
                          ) : method.type === 'paypal' ? (
                            <span className="text-xs font-bold text-gray-600">PP</span>
                          ) : (
                            <span className="text-xs font-bold text-gray-600">🏦</span>
                          )}
                        </div>
                        <div>
                          {method.type === 'card' ? (
                            <>
                              <p className="font-medium text-gray-900">
                                {method.brand} •••• {method.last4}
                              </p>
                              <p className="text-sm text-gray-600">
                                Expires {method.expiryMonth}/{method.expiryYear}
                              </p>
                            </>
                          ) : method.type === 'paypal' ? (
                            <>
                              <p className="font-medium text-gray-900">PayPal</p>
                              <p className="text-sm text-gray-600">{method.email}</p>
                            </>
                          ) : (
                            <>
                              <p className="font-medium text-gray-900">
                                Bank Transfer to Waqar Ahmed
                              </p>
                              <p className="text-sm text-gray-600">Account ending •••• 7014</p>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Default
                          </span>
                        )}
                        <button 
                          className="text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove payment method"
                        >
                          <XCircleIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <CreditCardIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Payment Methods</h3>
                <p className="text-gray-600 mb-6">
                  Add a payment method to subscribe to premium plans and make purchases.
                </p>
                <button
                  onClick={handleAddPaymentMethod}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <PlusIcon className="h-5 w-5 mr-2" />
                  Add Payment Method
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>

            {transactions.length > 0 ? (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {transactions.map(transaction => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="py-4 px-4 text-gray-900">
                            {transaction.date}
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="text-gray-900">{transaction.description}</p>
                              <p className="text-sm text-gray-600">{transaction.paymentMethod}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 font-medium text-gray-900">
                            £{transaction.amount.toFixed(2)}
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {transaction.receiptUrl && (
                              <button
                                onClick={() => handleDownloadReceipt(transaction.id)}
                                className="text-primary-600 hover:text-primary-700 transition-colors"
                                title="Download receipt"
                              >
                                <DocumentTextIcon className="h-5 w-5" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm">
                <ReceiptRefundIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Transactions</h3>
                <p className="text-gray-600 mb-6">
                  Your transaction history will appear here once you make your first purchase.
                </p>
                <button
                  onClick={() => setActiveTab('subscription')}
                  className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Browse Plans
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Payment Method Modal */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onAddPaymentMethod={onAddPaymentMethod}
      />
    </div>
  )
}
