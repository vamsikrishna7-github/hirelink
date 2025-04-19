import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import BootstrapClient from './BootstrapClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IsHome from '@/components/IsHome';
import Head from 'next/head';

export const metadata = {
  title: "HireLink - Connect Employers with Consultancies",
  description: "A platform connecting Employers with Consultancies for hiring candidates. Post jobs, browse CVs, and streamline your hiring process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <BootstrapClient />
        <Navbar />
        <IsHome />
        <main className="min-vh-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
