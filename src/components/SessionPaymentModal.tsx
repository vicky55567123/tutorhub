'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCardIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface SessionPaymentModalProps {
  isOpen: boolean
  amount: number
  currencySymbol?: string
  description: string
  onClose: () => void
  onSuccess: () => void
}

/**
 * Lightweight simulated checkout for a single tutoring session.
 *
 * This is a demo/mock payment step (no real card processor is wired up yet -
 * see .github/copilot-instructions.md, Stripe integration is still "to be
 * implemented"). It performs basic client-side format validation, then after
 * a short fake delay calls `onSuccess`, which the caller uses to mark
 * `paymentConfirmed: true` when creating the booking.
 */
export default function SessionPaymentModal({
  isOpen,
  amount,
  currencySymbol = '£',
  description,
  onClose,
  onSuccess,
}: SessionPaymentModalProps) {
  const [cardholderName, setCardholderName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  function formatCardNumber(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    if (digits.length <= 2) return digits
    return `${digits.slice(0, 2)}/${digits.slice(2)}`
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!cardholderName.trim()) {
      toast.error('Enter the cardholder name')
      return
    }
    const digitsOnly = cardNumber.replace(/\s/g, '')
    if (digitsOnly.length !== 16) {
      toast.error('Card number must be 16 digits')
      return
    }
    const expiryMatch = expiry.match(/^(\d{2})\/(\d{2})$/)
    if (!expiryMatch) {
      toast.error('Enter expiry as MM/YY')
      return
    }
    const [, mm, yy] = expiryMatch
    const month = Number(mm)
    const year = 2000 + Number(yy)
    if (month < 1 || month > 12) {
      toast.error('Enter a valid expiry month')
      return
    }
    const expiryDate = new Date(year, month, 0, 23, 59, 59)
    if (expiryDate.getTime() < Date.now()) {
      toast.error('This card has expired')
      return
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error('Enter a valid CVV')
      return
    }

    setIsProcessing(true)
    // Simulated payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsProcessing(false)
    toast.success('Payment successful!')
    onSuccess()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-primary-600" /> Pay for Session
              </h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 pt-5">
              <div className="bg-primary-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <span className="text-sm text-gray-700">{description}</span>
                <span className="text-xl font-bold text-primary-700">
                  {currencySymbol}
                  {amount.toFixed(2)}
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Name on card"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {isProcessing ? (
                  'Processing...'
                ) : (
                  <>
                    <LockClosedIcon className="h-4 w-4" />
                    Pay {currencySymbol}
                    {amount.toFixed(2)} &amp; Book Session
                  </>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Demo checkout - no real card is charged. Real payment processing (Stripe) is coming soon.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
