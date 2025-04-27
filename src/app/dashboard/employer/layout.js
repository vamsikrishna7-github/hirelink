"use client";

import styles from "./page.module.css";
import "./globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiHome, FiBriefcase, FiBookmark, FiSearch, FiFileText, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiCheckCircle, FiXCircle, FiClock, FiCalendar, FiUsers } from 'react-icons/fi';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import TopNavbar from "@/components/employer/TopNavbar";
import DashboardSidebar from "@/components/employer/DashboardSidebar";
import { usePathname } from "next/navigation";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DashboardLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pathname = usePathname();
  
  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", link: "/dashboard/employer", active: pathname === "/dashboard/employer" },
    { icon: <FiBriefcase />, label: "Post a Job", link: "/dashboard/employer/post-job", active: pathname === "/dashboard/employer/post-job" },
    { icon: <FiUsers />, label: "Applicants", link: "/dashboard/employer/applicants", active: pathname === "/dashboard/employer/applicants" },
    { icon: <FiFileText />, label: "Posted Jobs", link: "/dashboard/employer/posted-jobs", active: pathname === "/dashboard/employer/posted-jobs" },
    { icon: <HiOutlineCurrencyDollar  />, label: "Recived Bids", link: "/dashboard/employer/recived-bids", active: pathname === "/dashboard/employer/recived-bids" },
    { icon: <FiUser />, label: "My Profile", link: "/dashboard/employer/my-profile", active: pathname === "/dashboard/employer/my-profile" },
  ];

  const footerItems = [
    { icon: <FiSettings />, label: "Settings", link: "/dashboard/employer/settings", active: pathname === "/dashboard/employer/settings" },
    { icon: <FiHelpCircle />, label: "Help Center", link: "/dashboard/employer/help-center", active: pathname === "/dashboard/employer/help-center" },
    { icon: <FiLogOut />, label: "Log Out", link: "#" },
  ];

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
    if (!showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div className={styles.wrapper}>
      <TopNavbar 
        isMobile={isMobile} 
        showSidebar={showSidebar} 
        handleMenuClick={handleMenuClick} 
      />

      <AnimatePresence>
        {(showSidebar || !isMobile) && (
          <DashboardSidebar 
            isMobile={isMobile}
            showSidebar={showSidebar}
            menuItems={menuItems}
            footerItems={footerItems}
            onCloseSidebar={() => {
              setShowSidebar(false);
              document.body.style.overflow = 'auto';
            }}
          />
        )}
      </AnimatePresence>

      <div className={`${styles.container}`}>
        {children}
      </div>

      
    </div>
  );
} 