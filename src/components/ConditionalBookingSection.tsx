'use client'

import { usePathname } from 'next/navigation'
import BookingFormSection from './BookingFormSection'

// Pages that behave like a logged-in "app" area rather than a public
// marketing page. The free-consultation call-to-action doesn't make sense
// once someone already has an account and is managing sessions, so we hide
// it there.
const HIDDEN_PREFIXES = [
  '/dashboard',
  '/profile',
  '/settings',
  '/billing',
  '/favorites',
  '/my-courses',
  '/book-session',
  '/tutor/availability',
  '/admin',
  '/auth-debug',
  '/calendar-auth',
]

export default function ConditionalBookingSection() {
  const pathname = usePathname()

  const shouldHide = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname?.startsWith(`${prefix}/`)
  )

  if (shouldHide) return null

  return <BookingFormSection />
}
