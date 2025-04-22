"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiBriefcase, FiBookmark, FiSearch, FiFileText, FiUser, FiSettings, FiHelpCircle, FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TopNavbar from "@/components/TopNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { logout } from '../../../utils/logout';
import Jobs from "./Jobs";
import Saved from "./Saved";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

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

  const stats = [
    { label: "Rejected", value: 105, color: "#e53e3e", bgColor: "#fff5f5", bgColorDark: "#fed7d7" },
    { label: "Pending", value: 40, color: "#FFD166", bgColor: "#ebf8ff", bgColorDark: "#FFD166" },
    { label: "Scheduled", value: 30, color: "#48bb78", bgColor: "#f0fff4", bgColorDark: "#c6f6d5" },
    { label: "All Applications", value: 250, color: "#2d3748", bgColor: "#f7fafc", bgColorDark: "#edf2f7" },
  ];

  const recent = [
    { company: "Chameleon LTD", status: "Pending", date: "2024-03-15" },
    { company: "Sushi Inc", status: "Rejected", date: "2024-03-14" },
    { company: "LoveClip App", status: "Rejected", date: "2024-03-13" },
    { company: "OB Solutions", status: "Scheduled", date: "2024-03-12" },
  ];

  const menuItems = [
    { icon: <FiHome />, label: "Dashboard", active: true },
    { icon: <FiBriefcase />, label: "Jobs" },
    { icon: <FiBookmark />, label: "Saved" },
    { icon: <FiSearch />, label: "Find Jobs" },
    { icon: <FiFileText />, label: "My Applications" },
    { icon: <FiUser />, label: "My Profile" },
  ];

  const footerItems = [
    { icon: <FiSettings />, label: "Settings" },
    { icon: <FiHelpCircle />, label: "Help Center" },
    { icon: <FiLogOut />, label: "Log Out" },
  ];

  const handleMenuClick = () => {
    setShowSidebar(!showSidebar);
    if (!showSidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Chart data
  const chartData = {
    labels: ['Rejected', 'Pending', 'Scheduled', 'Other'],
    datasets: [
      {
        data: [105, 40, 30, 75],
        backgroundColor: [
          '#e53e3e',
          '#FFC107',
          '#48bb78',
          '#a0aec0',
        ],
        borderColor: [
          '#c53030',
          '#FFD166',
          '#38a169',
          '#718096',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%',
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
          />
        )}
      </AnimatePresence>

      <div className={`${styles.container}`}>
        <div className="row">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.header}
          >
            <h2>Hello Sukumar</h2>
            <p>Let&apos;s find a good fitted job here</p>
          </motion.div>

          <div className="d-flex flex-wrap gap-3 mt-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className={styles.statCard}
                style={{
                  '--bg-color': stat.bgColor,
                  '--bg-color-dark': stat.bgColorDark,
                  '--color': stat.color,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="row w-100 mt-5 g-4">
            <div className="col-md-6">
              <Card className={styles.analyticsCard}>
                <Card.Body>
                  <h5>Analytics</h5>
                  <div className={styles.donutChart}>
                    <Doughnut data={chartData} options={chartOptions} />
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-6">
              <Card className={styles.recentCard}>
                <Card.Body>
                  <h5>Recently Applied</h5>
                  <ul className="list-unstyled">
                    {recent.map((item, i) => (
                      <motion.li
                        key={i}
                        className={styles.recentItem}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                      >
                        <div>
                          <span>{item.company}</span>
                          <small className="d-block text-muted">{item.date}</small>
                        </div>
                        <span
                          className={
                            item.status === "Rejected"
                              ? styles.rejected
                              : item.status === "Pending"
                              ? styles.pending
                              : styles.scheduled
                          }
                        >
                          {item.status}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                  <button className="btn btn-primary mt-3">View All</button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
        <div className="row d-none">
          <Jobs />
        </div>
        <div className="row d-none">
          <Saved />
        </div>
      </div>

      
    </div>
  );
} 