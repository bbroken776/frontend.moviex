import type { Metadata } from 'next'
import { ReactNode } from 'react'

import NotificationContainer from '@components/(shared)/custom/notification/container'
import { AuthProvider } from '@contexts/authContext'
import 'react-toastify/dist/ReactToastify.css'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center justify-center">
      <AuthProvider>
        <NotificationContainer />
        {children}
      </AuthProvider>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Authentication | MovieX Online Streaming',
  description:
    'Login or register to access the best streaming content available online!',
  keywords:
    'login, register, authentication, MovieX, streaming access, secure login, create account',
  authors: [{ name: 'ArchKode', url: 'https://archkode.pt' }],
  robots: 'noindex, nofollow',
  icons: ['/logo.png'],
}
