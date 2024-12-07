import { ReactNode } from 'react';

import Footer from '@components/(shared)/navigation/footer';
import Navbar from '@components/(shared)/navigation/navbar';

import { AuthProvider } from '@contexts/authContext';

type PublicLayoutProps = {
  children: ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
      <Footer/>
    </AuthProvider>
  );
}
