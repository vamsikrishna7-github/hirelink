"use client";

import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import styles from './Saved.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Jobs = () => {
  const jobs = [
    {
      company: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    },
    {
      company: "Canon",
      logo: "https://1000logos.net/wp-content/uploads/2016/10/Canon-logo.jpg",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    },
    {
      company: "Razer",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTR0CL18TsZPEpYmfVwb1_SR7ePvkCDmqrXOQ&s",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    }
  ];

  return (
    <div className={styles.jobsContainer}>
      <div className={styles.filterSection}>
        
        <div className={styles.filters}>
          <div className={styles.filterItem}>
            <FaBriefcase />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Experience Level</option>
              <option value="0-1">0-1 Year</option>
              <option value="1-2">1-2 Years</option>
              <option value="2-3">2-3 Years</option>
              <option value="3-5">3-5 Years</option>
              <option value="5+">5+ Years</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaMapMarkerAlt />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Location</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="chennai">Chennai</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaClock />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Posted Date</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="15d">Last 15 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <div className={styles.filterItem}>
            <FaBriefcase />
            <select defaultValue="" className={styles.filterSelect}>
              <option value="" disabled>Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="remote">Remote</option>
            </select>
          </div>
        </div>
        <button className={`${styles.searchButton} rounded-5`}>
            <FaSearch />
          </button>
      </div>

      <h4 className='mb-3'>Saved Jobs : 5</h4>
      <div className={styles.jobsGrid}>
        {jobs.map((job, index) => (
          <div key={index} className={styles.jobCard}>
            <div className={styles.jobHeader}>
              <div className={styles.companyLogo}>
                <Image
                  src={job.logo}
                  alt={`${job.company} logo`}
                  width={40}
                  height={40}
                />
              </div>
              <div className={styles.jobTitle}>
                <h4>{job.title}</h4>
                <p>{job.company}</p>
              </div>
            </div>
            <p className={styles.jobDescription}>{job.description}</p>
            <div className={styles.jobTags}>
              {job.type.map((tag, idx) => (
                <span key={idx} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <div className={styles.jobActions}>
              <button className={styles.saveButton}> <FiBookmark /> Save</button>
              <Link href="/dashboard/candidate/apply-job"><button className={styles.applyButton}>Apply Now</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;