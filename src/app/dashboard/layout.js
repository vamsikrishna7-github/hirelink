import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import BootstrapClient from '../BootstrapClient';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TicketProvider } from '@/context/help-center/Ticket';
import { ProfileProvider } from '@/context/shared/Profile';

export const metadata = {
  title: "HireLink Dashboard",
  description: "HireLink Dashboard - Manage your applications and profile",
};

export default function DashboardLayout({ children }) {
  return (
    <TicketProvider>
      <ProfileProvider>
        <div className="dashboard-layout">
          {children}
          <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        </div>
      </ProfileProvider>
    </TicketProvider>
  );
}