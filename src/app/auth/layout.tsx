import type { Metadata } from 'next'
import { ReactNode } from 'react'

import NotificationContainer from '@components/(shared)/custom/notification/container'
import { AuthProvider } from '@contexts/authContext'
import { montserratFont } from '@utils/fonts'
import 'react-toastify/dist/ReactToastify.css'

interface AuthLayoutProps {
  children: ReactNode
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body className={`${montserratFont.className} min-h-screen flex items-center justify-center bg-mineshaft`}>
        <AuthProvider>
          <NotificationContainer />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'Authentication | MovieX Online Streaming',
  description: 'Login or register to access the best streaming content available online!',
  keywords: 'login, register, authentication, MovieX, streaming access, secure login, create account',
  authors: [{ name: 'ArchKode', url: 'https://archkode.pt' }],
  robots: 'noindex, nofollow',
  icons: ['/logo.png'],
}
