"use client";

import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import styles from './My-applications.module.css';
import Image from 'next/image';
import { Table } from 'react-bootstrap';

const MyApplications = () => {
  const applications = [
    {
      company: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      title: "UI/UX Designer",
      appliedDate: "2024-03-15",
      status: "Pending"
    },
    {
      company: "Canon",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Canon-logo.jpg",
      title: "UI/UX Designer",
      appliedDate: "2024-03-14",
      status: "Rejected"
    },
    {
      company: "Razer",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0CL18TsZPEpYmfVwb1_SR7ePvkCDmqrXOQ&s",
      title: "UI/UX Designer",
      appliedDate: "2024-03-13",
      status: "Scheduled"
    }
  ];

  return (
    <div className={styles.applicationsContainer}>
      <div className={styles.filterSection}>
        <div className={styles.filters}>
          <div className={styles.filterItem}>
            <FaCheckCircle />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Status</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaClock />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Applied Date</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="15d">Last 15 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
        <button className={`${styles.searchButton} rounded-5`}>
          <FaSearch />
        </button>
      </div>

      <div className={styles.tableContainer}>
        <Table hover responsive className={styles.applicationsTable}>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Applied Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>
                  <div className={styles.companyCell}>
                    <div className={styles.companyLogo}>
                      <Image
                        src={app.logo}
                        alt={`${app.company} logo`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className={styles.companyName}>{app.company}</span>
                  </div>
                </td>
                <td>{app.title}</td>
                <td>{app.appliedDate}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      app.status === "Rejected"
                        ? styles.rejected
                        : app.status === "Pending"
                        ? styles.pending
                        : styles.scheduled
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  <button className={styles.viewButton}>View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyApplications;