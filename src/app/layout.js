import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import BootstrapClient from './BootstrapClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: "HireLink - Connect Employers with Consultancies",
  description: "A platform connecting Employers with Consultancies for hiring candidates. Post jobs, browse CVs, and streamline your hiring process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapClient />
        <Navbar />
        <main className="min-vh-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
