import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import BootstrapClient from './BootstrapClient';
import IsHome from '@/components/IsHome';
import LayoutWrapper from '@/components/LayoutWrapper';
import { GoogleOAuthProvider } from '@react-oauth/google';


export const metadata = {
  title: "HireLink - Connect Employers with Consultancies",
  description: "A platform connecting Employers with Consultancies for hiring candidates. Post jobs, browse CVs, and streamline your hiring process.",
};

export default function RootLayout({ children }) {
  return (
    <GoogleOAuthProvider clientId="578224276104-sk0t3bvkn2qerllusiaibg6t0k348g31.apps.googleusercontent.com">
    <html lang="en">
      <body>
        <BootstrapClient />
        <LayoutWrapper>
          <IsHome />
          <main className="min-vh-100">
            {children}
          </main>
        </LayoutWrapper>
      </body>
    </html>
    </GoogleOAuthProvider>
  );
}
