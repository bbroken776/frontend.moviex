import { ReactNode } from 'react'

import { AuthProvider } from '@contexts/authContext'
import { montserratFont } from '@utils/fonts'

type PublicLayoutProps = {
  children: ReactNode
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <html lang="en">
      <body className={`${montserratFont.className} min-h-screen flex items-center justify-center bg-mineshaft`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
