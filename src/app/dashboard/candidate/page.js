"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiBriefcase, FiBookmark, FiSearch, FiFileText, FiUser, FiSettings, FiHelpCircle, FiLogOut, FiCheckCircle, FiXCircle, FiClock, FiCalendar } from 'react-icons/fi';
import Image from 'next/image';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import TopNavbar from "@/components/TopNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import Jobs from "./Jobs";
import Saved from "./Saved";
import MyApplications from "./My-applications";
import FindJobs from "./Find-Jobs";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
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
    { 
      label: "Applied Jobs", 
      value: 250, 
      color: "#2BA4FA", 
      bgColor: "#f0f9ff", 
      bgColorDark: "#bae6fd",
      icon: <FiCheckCircle size={24} />,
      companies: [
        { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
        { name: "Canon", logo: "https://1000logos.net/wp-content/uploads/2016/10/Canon-logo.jpg" },
        { name: "Razer", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0CL18TsZPEpYmfVwb1_SR7ePvkCDmqrXOQ&s" }
      ]
    },
    { 
      label: "Rejected", 
      value: 105, 
      color: "#e53e3e", 
      bgColor: "#fff5f5", 
      bgColorDark: "#fed7d7",
      icon: <FiXCircle size={24} />
    },
    { 
      label: "Pending", 
      value: 40, 
      color: "#FFD166", 
      bgColor: "#ebf8ff", 
      bgColorDark: "#FFD166",
      icon: <FiClock size={24} />
    },
    { 
      label: "Scheduled", 
      value: 30, 
      color: "#48bb78", 
      bgColor: "#f0fff4", 
      bgColorDark: "#c6f6d5",
      icon: <FiCalendar size={24} />
    }
  ];

  const recent = [
    { 
      company: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      position: "UI/UX Designer",
      status: "Pending", 
      date: "2024-03-15" 
    },
    { 
      company: "Canon",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Canon-logo.jpg",
      position: "UI/UX Designer",
      status: "Rejected", 
      date: "2024-03-14" 
    },
    { 
      company: "Razer",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0CL18TsZPEpYmfVwb1_SR7ePvkCDmqrXOQ&s",
      position: "UI/UX Designer",
      status: "Scheduled", 
      date: "2024-03-13" 
    }
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
    labels: ['Rejected', 'Pending', 'Scheduled'],
    datasets: [
      {
        data: [105, 40, 30],
        backgroundColor: [
          '#e53e3e',
          '#FFC107',
          '#48bb78',
        ],
        borderColor: [
          '#c53030',
          '#FFD166',
          '#38a169',
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

      <div className={`${styles.container} border`}>
        <div className="row d-none">
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
                <div className="d-flex align-items-center gap-2 mb-2">
                  {stat.icon}
                  <h3>{stat.value}</h3>
                </div>
                <p>{stat.label}</p>
                {stat.companies && (
                  <div className={styles.companyLogos}>
                    {stat.companies.map((company, i) => (
                      <div key={i} className={styles.companyLogoWrapper} title={company.name}>
                        <Image
                          src={company.logo}
                          alt={company.name}
                          width={24}
                          height={24}
                          className={styles.companyLogo}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
                  <div className={styles.recentTable}>
                    {recent.map((item, i) => (
                      <motion.div
                        key={i}
                        className={styles.recentRow}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 * i }}
                      >
                        <div className={styles.companyInfo}>
                          <div className={styles.companyLogoWrapper}>
                            <Image
                              src={item.logo}
                              alt={item.company}
                              width={32}
                              height={32}
                              className={styles.companyLogo}
                            />
                          </div>
                          <div>
                            <h6 className="mb-0">{item.company}</h6>
                            <small className="text-muted">{item.position}</small>
                          </div>
                        </div>
                        <div className={styles.applicationInfo}>
                        <small className="text-muted">{item.date}</small>
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
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  <button className={`${styles.viewall} btn btn-primary border-0 text-center rounded-5 mt-3`}>View All</button>
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
        <div className="row d-none">
          <MyApplications />
        </div>
        <div className="row">
          <FindJobs />
        </div>
      </div>

      
    </div>
  );
} 