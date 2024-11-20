import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';

import { montserratFont } from '@utils/fonts';
import '@styles/globals.css';
import ProtectedClient from '@components/(shared)/protectedclient';

interface BaseLayoutProps {
  children: ReactNode;
}

export default async function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <ProtectedClient>
      <html lang="en">
        <body className={`${montserratFont.className} min-h-screen flex flex-col bg-mineshaft`}>
          {children}
        </body>
      </html>
    </ProtectedClient>
  )
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'MovieX Online Streaming | MovieX | Watch Movies Online',
  description: 'Enjoy your life with the best streaming content available online! Watch movies, TV shows, and exclusive content on MovieX.',
  keywords: 'movies, streaming, watch online, TV shows, free movies, MovieX, exclusive content, HD streaming, online entertainment, popular movies',
  authors: [{ name: 'ArchKode', url: 'https://archkode.pt' }],
  robots: 'index, nofollow',
  icons: ['/logo.png'],
};