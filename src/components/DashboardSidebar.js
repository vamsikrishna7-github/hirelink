"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from '../app/dashboard/candidate/page.module.css';
import { logout } from '@/utils/logout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardSidebar({ 
  isMobile, 
  showSidebar, 
  menuItems, 
  footerItems 
}) {
  const sidebarVariants = {
    hidden: { x: -280, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
const router = useRouter();

  return (
    <motion.div
      className={`${styles.sidebar} ${isMobile ? styles.sidebarMobile : ''} ${showSidebar ? styles.show : ''} vh-100`}
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.sidebarContent}>
        {!isMobile && <h4 className="mb-4" style={{ color: '#000000' }}>Zyukthi</h4>}
        <ul className="list-unstyled">
          {menuItems.map((item, index) => (
            <Link href={`${item.link}`} className='text-decoration-none' key={index}>
            <li key={index} className={item.active ? styles.active : ''}>
              {item.icon}
              <span>{item.label}</span>
            </li>
            </Link>
          ))}
        </ul>
      </div>
      
      <div className={styles.sidebarFooter}>
        <ul className="list-unstyled">
          {footerItems.map((item, index) => {
            if (item.label === "Log Out") {
              return (
                <li key={index}
                  onClick={()=>{logout(router);}}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </li>
              );
            }

            return (
              <Link href={`${item.link}`} className='text-decoration-none' key={index}>
              <li key={index} className={item.active ? styles.active : ''}>
                {item.icon}
                <span>{item.label}</span>
              </li>
              </Link>
            );
          })}
        </ul>
        <Link href="/dashboard/candidate/my-profile" className='text-decoration-none text-dark'>
        <div className={styles.userProfile}>
          <Image 
            src="/My_profile.webp" 
            alt="Profile" 
            className={styles.avatar}
            width={45}
            height={45}
          />
          <div>
            <p className="mb-0">Yeddala Sukumar</p>
            <small>yeddala.sukumar@gmail.com</small>
          </div>
        </div>
        </Link>
      </div>
    </motion.div>
  );
} 