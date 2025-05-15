// Enhanced version of MyApplications component
"use client";

import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase, FaCheckCircle, FaFilter } from 'react-icons/fa';
import styles from './My-applications.module.css';
import Image from 'next/image';
import { Table } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

const MyApplications = () => {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applications/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch applications");

      const jobsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${Cookies.get("access_token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!jobsRes.ok) throw new Error("Failed to fetch jobs");

      const jobsData = await jobsRes.json();
      const data = await response.json();

      const applications = data.map((app) => {
        const job = jobsData.find((job) => job.id === app.job);
        return { application: app, job };
      });
      setApplications(applications);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const applyFilters = (app) => {
    const statusMatch = !statusFilter || app.application.status.toLowerCase() === statusFilter;

    const dateMatch = (() => {
      if (!dateFilter) return true;
      const appliedDate = new Date(app.application.applied_at);
      const now = new Date();
      const diffTime = now - appliedDate;
      const days = diffTime / (1000 * 60 * 60 * 24);
      if (dateFilter === '24h') return days <= 1;
      if (dateFilter === '7d') return days <= 7;
      if (dateFilter === '15d') return days <= 15;
      if (dateFilter === '30d') return days <= 30;
      return true;
    })();

    const searchMatch = app.job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return statusMatch && dateMatch && searchMatch;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <div className="text-center">
          <ClipLoader color="#0d6efd" size={50} />
          <p className="mt-3 text-black">Fetching content, please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-danger mb-3">Error</h2>
        <p>{error}</p>
        <button onClick={() => router.push('/login')} className="btn btn-danger mt-3">Go to Login</button>
      </div>
    );
  }

  return (
    <div className={styles.applicationsContainer}>
      <div className={styles.filterSection}>
        <button
          className="d-md-none btn btn-outline-primary mb-3"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter className="me-2" /> Filter
        </button>

        <div className={`${styles.filters} ${!showFilters ? 'd-none d-md-flex' : 'd-flex'} flex-wrap`}>
          <div className={styles.filterItem}>
            <FaCheckCircle />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className={styles.filterSelect}>
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaClock />
            <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className={styles.filterSelect}>
              <option value="">Applied Date</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="15d">Last 15 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaSearch />
            <input
              type="text"
              placeholder="Search by title..."
              className="form-control border-0 shadow-none"
              style={{ background: 'transparent' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
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
            {applications.filter(app => applyFilters(app)).map((app, index) => (
              <tr key={index} className={styles.tableRow}>
                <td>
                  <div className={styles.companyCell}>
                    <div className={styles.companyLogo}>
                      <Image
                        src={app.job.company_logo || '/Dashboards/default_company.svg'}
                        alt={`${app.job.company_name} logo`}
                        width={40}
                        height={40}
                      />
                    </div>
                    <span className={styles.companyName}>{app.job.company_name}</span>
                  </div>
                </td>
                <td>{app.job.title}</td>
                <td>{formatDate(app.application.applied_at)}</td>
                <td>
                  <span
                    className={`${styles.statusBadge} ${
                      app.application.status.toLowerCase() === "rejected"
                        ? styles.rejected
                        : app.application.status.toLowerCase() === "pending"
                        ? styles.pending
                        : styles.scheduled
                    }`}
                  >
                    {app.application.status}
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