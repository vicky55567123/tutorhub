import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopMenu from '@/components/TopMenu'
import AuthNavbar from '@/components/AuthNavbar'
import SidebarNavigation from '@/components/SidebarNavigation'
import Footer from '@/components/Footer'
import ToastProvider from '@/components/ToastProvider'
import FloatingContactButton from '@/components/FloatingContactButton'
import WhatsAppFloatingButton from '@/components/WhatsAppFloatingButton'
import { AuthProvider } from '@/components/AuthContext'
import NextAuthProvider from '@/components/NextAuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TutorHub - Online Tutoring Platform',
  description: 'Connect with expert tutors and learn anything, anywhere. Personalized online learning sessions with qualified professionals.',
  keywords: 'online tutoring, tutors, learning, education, courses, online classes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthProvider>
          <AuthProvider>
            <div className="min-h-screen flex">
              <SidebarNavigation />
              <div className="flex-1 flex flex-col ml-0 md:ml-20">
                <TopMenu />
                <AuthNavbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <ToastProvider />
            <FloatingContactButton />
            <WhatsAppFloatingButton />
          </AuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
