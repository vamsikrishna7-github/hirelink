"use client";

import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaClock, FaBriefcase } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import Image from 'next/image';
import styles from './Find-Jobs.module.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

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
      company: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
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
      company: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    },
    {
      company: "Razer",
      logo: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c51f.png",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    },
    {
      company: "Salesforce",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
      title: "UI/UX Designer",
      description: "uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in volu jkdnjn......",
      type: ["Full Time", "Remote", "Any Level"]
    }
  ];

  return (
    <Container fluid className={styles.jobsContainer}>
      <div className={styles.filterSection}>
        <Row className="w-100">
          <Col xs={12} lg={11}>
            <div className={styles.filters}>
              <div className={styles.filterItem}>
                <FaBriefcase />
                <Form.Select className={styles.filterSelect} defaultValue="na">
                  <option value="na" disabled>Experience Level</option>
                  <option value="any">Any Level</option>
                  <option value="entry">Entry Level</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="senior">Senior</option>
                </Form.Select>
              </div>

              <div className={styles.filterItem}>
                <FaMapMarkerAlt />
                <Form.Select className={styles.filterSelect} defaultValue="na">
                  <option value="na" disabled>Location</option>
                  <option value="remote">Remote</option>
                  <option value="onsite">On Site</option>
                  <option value="hybrid">Hybrid</option>
                </Form.Select>
              </div>

              <div className={styles.filterItem}>
                <FaClock />
                <Form.Select className={styles.filterSelect} defaultValue="na">
                  <option value="na" disabled>Posted Date</option>
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                </Form.Select>
              </div>

              <div className={styles.filterItem}>
                <FaBriefcase />
                <Form.Select className={styles.filterSelect} defaultValue="na">
                  <option value="na" disabled>Job Type</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </Form.Select>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={1} className="d-flex align-items-center justify-content-end">
            <Button className={styles.searchButton}>
              <FaSearch />
            </Button>
          </Col>
        </Row>
      </div>

      <div className={styles.jobsGrid}>
        {jobs.map((job, index) => (
          <Card key={index} className={styles.jobCard}>
            <Card.Body>
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
                <Button variant="outline-primary" className={styles.saveButton}> <FiBookmark /> Save</Button>
                <Button variant="primary" className={styles.applyButton}>Apply Now</Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Jobs;