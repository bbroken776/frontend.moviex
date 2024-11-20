import { ReactNode } from 'react'

import Navbar from '@components/(shared)/navigation/navbar'
import { AuthProvider } from '@contexts/authContext'
import { montserratFont } from '@utils/fonts'

type PublicLayoutProps = {
  children: ReactNode
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  )
}
