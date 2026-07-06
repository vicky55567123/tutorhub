'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BanknotesIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  PhotoIcon,
  XMarkIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

export interface PaymentProofData {
  payerName: string
  reference: string
  screenshotDataUrl: string
}

interface SessionPaymentModalProps {
  isOpen: boolean
  amount: number
  currencySymbol?: string
  description: string
  onClose: () => void
  onSuccess: (proof: PaymentProofData) => void
}

/** Fixed bank transfer details students pay into. */
const BANK_DETAILS = {
  name: 'Waqar Ahmed',
  accountNumber: '83690969',
  sortCode: '60-84-64',
}

const MAX_SCREENSHOT_SOURCE_BYTES = 8 * 1024 * 1024 // 8MB raw upload limit
const COMPRESSED_MAX_DIMENSION = 1280

/** Downscales/compresses an image file into a small JPEG data URL so it can
 *  be stored inline (no separate file-storage bucket needed for this demo
 *  bank-transfer flow). */
function compressImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read the file'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file is not a valid image'))
      img.onload = () => {
        const scale = Math.min(1, COMPRESSED_MAX_DIMENSION / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not process the image'))
          return
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.75))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

/**
 * Manual bank-transfer payment flow for a single tutoring session:
 *
 *  Step 1 ("details"): shows the fixed bank account to transfer into, plus
 *    the exact amount due. The student transfers the money themselves
 *    outside the app, then clicks "I've Paid".
 *  Step 2 ("proof"): the student enters their name/reference and uploads a
 *    screenshot of the completed transfer. Submitting calls `onSuccess`
 *    with that proof, which the caller sends along when creating the
 *    booking (the booking is created with payment_status = 'pending' until
 *    an admin reviews the screenshot in the Admin Dashboard).
 */
export default function SessionPaymentModal({
  isOpen,
  amount,
  currencySymbol = '£',
  description,
  onClose,
  onSuccess,
}: SessionPaymentModalProps) {
  const [step, setStep] = useState<'details' | 'proof'>('details')
  const [payerName, setPayerName] = useState('')
  const [reference, setReference] = useState('')
  const [screenshotDataUrl, setScreenshotDataUrl] = useState('')
  const [isCompressing, setIsCompressing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setStep('details')
      setPayerName('')
      setReference('')
      setScreenshotDataUrl('')
    }
  }, [isOpen])

  function copyToClipboard(value: string, label: string) {
    navigator.clipboard
      ?.writeText(value)
      .then(() => toast.success(`${label} copied`))
      .catch(() => toast.error('Could not copy - please copy it manually'))
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (screenshot)')
      return
    }
    if (file.size > MAX_SCREENSHOT_SOURCE_BYTES) {
      toast.error('That image is too large - please upload a screenshot under 8MB')
      return
    }

    setIsCompressing(true)
    try {
      const dataUrl = await compressImageToDataUrl(file)
      setScreenshotDataUrl(dataUrl)
    } catch (error) {
      console.error(error)
      toast.error(error instanceof Error ? error.message : 'Failed to process image')
    } finally {
      setIsCompressing(false)
    }
  }

  async function handleSubmitProof(e: React.FormEvent) {
    e.preventDefault()
    if (!payerName.trim()) {
      toast.error('Enter the name the transfer was made from')
      return
    }
    if (!screenshotDataUrl) {
      toast.error('Please upload a screenshot of your bank transfer')
      return
    }

    setIsSubmitting(true)
    // Small simulated delay so the "Submitting..." state is visible.
    await new Promise((resolve) => setTimeout(resolve, 500))
    setIsSubmitting(false)
    toast.success('Payment proof submitted - your session is booked!')
    onSuccess({ payerName: payerName.trim(), reference: reference.trim(), screenshotDataUrl })
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
            className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                {step === 'proof' && (
                  <button
                    onClick={() => setStep('details')}
                    aria-label="Back"
                    className="text-gray-400 hover:text-gray-600 mr-1"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                  </button>
                )}
                <BanknotesIcon className="h-5 w-5 text-primary-600" />
                {step === 'details' ? 'Pay by Bank Transfer' : 'Confirm Your Payment'}
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

            {step === 'details' ? (
              <div className="px-6 pb-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Transfer the exact amount above to the account below, then click <strong>I&apos;ve Paid</strong> and
                  upload a screenshot of the completed transfer as proof.
                </p>

                <div className="border border-gray-200 rounded-xl divide-y divide-gray-100">
                  {[
                    { label: 'Name', value: BANK_DETAILS.name },
                    { label: 'Account number', value: BANK_DETAILS.accountNumber },
                    { label: 'Sort code', value: BANK_DETAILS.sortCode },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <p className="text-xs text-gray-400">{row.label}</p>
                        <p className="text-sm font-semibold text-gray-900">{row.value}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(row.value, row.label)}
                        aria-label={`Copy ${row.label}`}
                        className="text-gray-400 hover:text-primary-600 p-1.5 rounded-lg hover:bg-gray-50"
                      >
                        <ClipboardDocumentIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400">
                  Tip: use your name as the payment reference so it&apos;s easy to match your transfer.
                </p>

                <button
                  type="button"
                  onClick={() => setStep('proof')}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  <CheckIcon className="h-4 w-4" />
                  I&apos;ve Paid - Upload Proof
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Your session is confirmed once an admin verifies your payment proof.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitProof} className="px-6 pb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name the transfer was made from</label>
                  <input
                    type="text"
                    value={payerName}
                    onChange={(e) => setPayerName(e.target.value)}
                    placeholder="e.g. John Smith"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment reference / transaction ID <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder="e.g. bank transaction reference"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Screenshot of payment</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    aria-label="Upload payment screenshot"
                    className="hidden"
                  />
                  {screenshotDataUrl ? (
                    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={screenshotDataUrl} alt="Payment screenshot preview" className="w-full max-h-56 object-contain bg-gray-50" />
                      <button
                        type="button"
                        onClick={() => {
                          setScreenshotDataUrl('')
                          if (fileInputRef.current) fileInputRef.current.value = ''
                        }}
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white text-gray-600 rounded-full p-1 shadow"
                        aria-label="Remove screenshot"
                      >
                        <XMarkIcon className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isCompressing}
                      className="w-full flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg py-6 text-gray-500 hover:border-primary-400 hover:text-primary-600 disabled:opacity-60"
                    >
                      <PhotoIcon className="h-8 w-8" />
                      <span className="text-sm">{isCompressing ? 'Processing image...' : 'Click to upload a screenshot'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isCompressing}
                  className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Payment Proof & Book Session'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  An admin will verify this transfer shortly. You&apos;ll keep your booked slot in the meantime.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
