import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { AuthProvider } from '@contexts/authContext';
import Navbar from '@components/(shared)/navigation/navbar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AuthProvider>
      <Navbar/>
      {children}
    </AuthProvider>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Admin Dashboard | MovieX',
  description: 'Admin dashboard for managing users and movies on MovieX.',
  keywords: 'admin dashboard, movies, users, MovieX, admin panel',
  authors: [{ name: 'ArchKode', url: 'https://archkode.pt' }],
  robots: 'noindex, nofollow',
  icons: ['/logo.png'],
};
