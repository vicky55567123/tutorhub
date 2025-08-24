'use client'

import { ReactNode } from 'react'

interface MainContentWrapperProps {
  children: ReactNode
}

export default function MainContentWrapper({ children }: MainContentWrapperProps) {
  return (
    <div className="pl-0 md:pl-0 transition-all duration-300">
      {children}
    </div>
  )
}
