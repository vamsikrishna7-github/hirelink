import 'bootstrap/dist/css/bootstrap.min.css';
import '../globals.css';
import BootstrapClient from '../BootstrapClient';

export const metadata = {
  title: "HireLink Dashboard",
  description: "HireLink Dashboard - Manage your applications and profile",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}