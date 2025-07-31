'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeSlashIcon, CheckIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import Modal from './Modal'
import { useAuth } from './AuthContext'

interface SignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToLogin: () => void
  onDemoLogin?: (userType: 'student' | 'tutor') => void
}

export default function SignupModal({ isOpen, onClose, onSwitchToLogin, onDemoLogin }: SignupModalProps) {
  const { registerUser, signInWithGoogle, signInWithFacebook } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<'student' | 'tutor'>('student')
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!')
      return false
    }
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long!')
      return false
    }
    if (!agreeToTerms) {
      toast.error('Please agree to the terms and conditions!')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      // Register user with real database backend
      const newUser = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: userType
      })
      
      toast.success(`Welcome ${newUser.name}! Account created successfully! 🎉`, {
        style: {
          borderRadius: '10px',
          background: '#10B981',
          color: '#fff',
        }
      })
      
      setIsLoading(false)
      onClose()
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      setAgreeToTerms(false)
      
    } catch (error: any) {
      setIsLoading(false)
      const errorMessage = error.message === 'Email already exists' 
        ? 'An account with this email already exists. Please try logging in instead.'
        : 'Failed to create account. Please try again.'
      toast.error(errorMessage)
    }
  }

  const handleSocialSignup = async (provider: string) => {
    setIsLoading(true)
    
    try {
      if (provider === 'Google') {
        await signInWithGoogle()
        toast.success('Successfully signed up with Google! 🎉', {
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          }
        })
      } else if (provider === 'Facebook') {
        await signInWithFacebook()
        toast.success('Successfully signed up with Facebook! 🎉', {
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          }
        })
      }
      
      setIsLoading(false)
      onClose()
      
    } catch (error) {
      setIsLoading(false)
      console.error(`${provider} signup error:`, error)
      toast.error(`Failed to sign up with ${provider}. Please try again.`)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Your Account">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* User Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            I want to join as:
          </label>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserType('student')}
              className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                userType === 'student'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">🎓</div>
                <div className="font-medium">Student</div>
                <div className="text-xs text-gray-500 mt-1">Learn from experts</div>
              </div>
            </motion.button>
            
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setUserType('tutor')}
              className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                userType === 'tutor'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨‍🏫</div>
                <div className="font-medium">Tutor</div>
                <div className="text-xs text-gray-500 mt-1">Teach and earn</div>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="First name"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              placeholder="Last name"
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Fields */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agree-terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agree-terms" className="text-gray-600">
              I agree to the{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-500 font-medium"
                onClick={() => toast('Terms of Service coming soon!', { icon: '📋' })}
              >
                Terms of Service
              </button>
              {' '}and{' '}
              <button
                type="button"
                className="text-primary-600 hover:text-primary-500 font-medium"
                onClick={() => toast('Privacy Policy coming soon!', { icon: '🔒' })}
              >
                Privacy Policy
              </button>
            </label>
          </div>
        </div>

        {/* Sign Up Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-700 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating account...
            </div>
          ) : (
            <>
              <CheckIcon className="h-5 w-5 inline mr-2" />
              Create Account
            </>
          )}
        </motion.button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        {/* Demo Signup Buttons */}
        {onDemoLogin && (
          <div className="space-y-3">
            <p className="text-center text-sm text-gray-600 font-medium">Quick Demo Signup:</p>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDemoLogin('student')}
                className="flex items-center justify-center px-4 py-3 border-2 border-blue-200 rounded-lg shadow-sm bg-blue-50 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <span className="mr-2">🎓</span>
                Demo Student
              </motion.button>
              
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onDemoLogin('tutor')}
                className="flex items-center justify-center px-4 py-3 border-2 border-green-200 rounded-lg shadow-sm bg-green-50 text-sm font-medium text-green-700 hover:bg-green-100 transition-colors"
              >
                <span className="mr-2">👨‍🏫</span>
                Demo Tutor
              </motion.button>
            </div>
          </div>
        )}

        {/* Social Signup Buttons */}
        <div className="space-y-3">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialSignup('Google')}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <span className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Sign in
            </button>
          </span>
        </div>
      </form>
    </Modal>
  )
}
