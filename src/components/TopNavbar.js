"use client";

import { FiMenu } from 'react-icons/fi';
import styles from '../app/dashboard/candidate/page.module.css';

export default function TopNavbar({ isMobile, showSidebar, handleMenuClick }) {
  return (
    <>
    {isMobile &&(
    <div className={styles.topNavbar}>
      <div className={styles.navbarBrand}>
        <h4 style={{ color: '#000000' }}>Zyukthi</h4>
      </div>
      {isMobile && (
        <button
          className={styles.menuToggle}
          onClick={handleMenuClick}
          aria-label="Toggle menu"
        >
          {showSidebar ? '✕' : '☰'}
        </button>
      )}
    </div>
    )}
    </>
  );
} 