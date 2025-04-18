"use client";

import { useRouter } from 'next/navigation';
import { FaSignOutAlt } from 'react-icons/fa';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    
    // Redirect to login page
    router.push('/login');
  };

  return (
    <button 
      className="btn btn-link text-danger text-decoration-none"
      onClick={handleLogout}
    >
      <FaSignOutAlt className="me-2" />
      Logout
    </button>
  );
} 