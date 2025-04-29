"use client";

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isLogin = pathname?.startsWith('/login');
  const isForgotPassword = pathname?.startsWith('/forgot-password');

  return (
    <>
      {!isDashboard && !isLogin && !isForgotPassword && <Navbar />}
      {children}
      {!isDashboard && !isLogin && !isForgotPassword && <Footer />}
    </>
  );
}
