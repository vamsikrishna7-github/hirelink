"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./page.module.css";
import { FaTimes, FaFileAlt, FaDownload, FaSpinner, FaUsers } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

// Custom modal styles
const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "1000px",
    width: "90%",
    maxHeight: "90vh",
    overflow: "auto",
    padding: 0,
    border: "none",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
    background: "white",
  },
};

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'shortlisted', label: 'Shortlisted' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'phone_screen', label: 'Phone Screen' },
  { value: 'interview', label: 'Interview Scheduled' },
  { value: 'technical_interview', label: 'Technical Interview' },
  { value: 'hr_interview', label: 'HR Interview' },
  { value: 'reference_check', label: 'Reference Check' },
  { value: 'background_check', label: 'Background Check' },
  { value: 'offer_pending', label: 'Offer Pending' },
  { value: 'offer_extended', label: 'Offer Extended' },
  { value: 'offer_accepted', label: 'Offer Accepted' },
  { value: 'offer_declined', label: 'Offer Declined' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'hired', label: 'Hired' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'withdrawn', label: 'Withdrawn' },
  { value: 'on_hold', label: 'On Hold' },
];

export default function ReviewCandidates({ data }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    setIsBrowser(true);
    if (isBrowser) {
      Modal.setAppElement(document.body);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (modalIsOpen && data.id) {
      fetchSubmissions();
    }
  }, [modalIsOpen, data.id]);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const fetchSubmissions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/candidate-submissions-by-employer/${data.id}/`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch submissions');
      }

      const responseData = await response.json();
      setSubmissions(responseData);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast.error('Failed to load candidate submissions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (submissionId, resumeId, newStatus) => {
    try {
      setUpdatingStatus(resumeId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/update-candidate-submission/${submissionId}/${resumeId}/`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          },
          body: JSON.stringify({ status: newStatus })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setSubmissions(prevSubmissions => 
        prevSubmissions.map(submission => {
          if (submission.id === submissionId) {
            return {
              ...submission,
              resumes: submission.resumes.map(resume => 
                resume.id === resumeId 
                  ? { ...resume, status: newStatus }
                  : resume
              )
            };
          }
          return submission;
        })
      );

      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDownload = (resumeUrl) => {
    window.open(resumeUrl, '_blank');
  };

  if (!isBrowser) return null;

  return (
    <>
      <div className={styles.actionButtons}>
        <motion.button 
          onClick={() => setModalIsOpen(true)} 
          className={styles.viewButton}
          title="Review candidates"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUsers size={16} />
        </motion.button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Review Candidates"
        ariaHideApp={isBrowser}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        closeTimeoutMS={300}
      >
        <AnimatePresence>
          {modalIsOpen && (
            <motion.div 
              className={styles.modalContainer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.modalHeader}>
                <h2 className={styles.heading}>Review Candidates</h2>
                <motion.button 
                  onClick={handleClose} 
                  className={styles.closeButton}
                  aria-label="Close modal"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>

              <div className={styles.content}>
                {isLoading ? (
                  <div className={styles.loadingState}>
                    <FaSpinner className={styles.spinner} />
                    <p>Loading candidates...</p>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className={styles.emptyState}>
                    <FaFileAlt size={48} />
                    <p>No candidates submitted yet</p>
                  </div>
                ) : (
                  <div className={styles.submissionsList}>
                    {submissions.map((submission) => (
                      <div key={submission.id} className={styles.submissionGroup}>
                        <div className={styles.submissionHeader}>
                          <h3>Submission Date: {new Date(submission.created_at).toLocaleDateString()}</h3>
                        </div>
                        <div className={styles.resumesGrid}>
                          {submission.resumes.map((resume) => (
                            <motion.div
                              key={resume.id}
                              className={styles.resumeCard}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className={styles.resumeHeader}>
                                <h4>{resume.name}</h4>
                                <span className={`${styles.statusBadge} ${styles[`status_${resume.status}`]}`}>
                                  {resume.status.replace('_', ' ')}
                                </span>
                              </div>
                              <div className={styles.resumeActions}>
                                <select
                                  value={resume.status}
                                  onChange={(e) => handleStatusUpdate(submission.id, resume.id, e.target.value)}
                                  className={styles.statusSelect}
                                  disabled={updatingStatus === resume.id}
                                >
                                  {STATUS_OPTIONS.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                                <motion.button
                                  onClick={() => handleDownload(resume.resume)}
                                  className={styles.downloadButton}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  <FaDownload />
                                  View Resume
                                </motion.button>
                              </div>
                              {updatingStatus === resume.id && (
                                <div className={styles.updatingStatus}>
                                  <FaSpinner className={styles.spinner} />
                                  <span>Updating status...</span>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}
