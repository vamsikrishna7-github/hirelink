"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./page.module.css";
import { FaEye, FaTimes, FaBuilding, FaChevronDown, FaChevronUp, FaHandshake, FaGavel } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
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
    maxWidth: "800px",
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

export default function PostedJobActions({ data }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidData, setBidData] = useState({
    proposal: '',
    fee: ''
  });
  const [status, setStatus] = useState(data.status === 'approved' ? 'approve' : data.status === 'rejected' ? 'reject' : 'pending');
  const router = useRouter();

  useEffect(() => {
    setIsBrowser(true);
    if (isBrowser) {
      Modal.setAppElement(document.body);
    }
  }, [isBrowser]);

  const handleClose = () => {
    setModalIsOpen(false);
    setShowBidForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBidData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      // Validate fee is a positive number
      if (isNaN(bidData.fee) || bidData.fee === '') {
        throw new Error('Fee must be a number');
      }
      if (parseFloat(bidData.fee) <= 0) {
        throw new Error('Fee must be a positive amount');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bids/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        },
        body: JSON.stringify({
          job: data.id,
          proposal: bidData.proposal,
          fee: parseFloat(bidData.fee)
        })
      });

      let responseData;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        try {
          responseData = await response.json();
        } catch (jsonError) {
          console.error('Error parsing JSON response:', jsonError);
          toast.error('Server error occurred. Please try again later.');
          return;
        }
      } else {
        console.error('Server returned non-JSON response');
        toast.error('Server error occurred. Please try again later.');
        return;
      }

      if (!response.ok) {
        // Handle specific validation errors with user-friendly messages
        if (response.status === 400) {
          if (responseData.non_field_errors) {
            const errorMessage = responseData.non_field_errors[0];
            if (errorMessage.includes("3 bids per job")) {
              toast.error("You have reached the maximum limit of 3 bids for this job. Please review your existing bids.");
            } else if (errorMessage.includes("already submitted this proposal")) {
              toast.error("You have already submitted this exact proposal for this job. Please modify your proposal.");
            } else {
              toast.error(errorMessage);
            }
            return;
          }
          if (responseData.proposal) {
            toast.error(responseData.proposal[0]);
            return;
          }
          if (responseData.fee) {
            toast.error(responseData.fee[0]);
            return;
          }
        }
        if (response.status === 403) {
          toast.error("You don't have permission to perform this action.");
          return;
        }
        if (response.status === 401) {
          toast.error("Your session has expired. Please log in again.");
          return;
        }
        if (response.status >= 500) {
          toast.error("Server error occurred. Please try again later.");
          return;
        }
        toast.error(responseData.detail || 'Failed to submit bid. Please try again.');
        return;
      }

      toast.success('Bid submitted successfully! Your proposal has been sent to the employer.');
      setShowBidForm(false);
      setBidData({ proposal: '', fee: '' });
    } catch (error) {
      console.error('Error submitting bid:', error);
      // Handle specific error cases
      if (error.message.includes("3 bids per job")) {
        toast.error("You have reached the maximum limit of 3 bids for this job. Please review your existing bids.");
      } else if (error.message.includes("already submitted this proposal")) {
        toast.error("You have already submitted this exact proposal for this job. Please modify your proposal.");
      } else if (error.message.includes("Failed to fetch")) {
        toast.error("Network error. Please check your internet connection and try again.");
      } else {
        toast.error(error.message || 'Failed to submit bid. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bids/${data.id}/${newStatus}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        }
      });

      if (!response.ok) {
        toast.error('Failed to update bid status');
        throw new Error('Failed to update bid status');
      }

      const responseData = await response.json();
      if (responseData) {
        toast.success(`Bid ${responseData.status} successfully!`);
        setStatus(newStatus);
      }

    } catch (error) {
      console.error('Error updating bid status:', error);
      toast.error('Failed to update bid status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isBrowser) return null;

  return (
    <>
      <div className={styles.actionButtons}>
        <motion.button 
          onClick={() => setModalIsOpen(true)} 
          className={styles.viewButton}
          title="View bid details"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaGavel size={16} />
        </motion.button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Bid Details"
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
                <h2 className={styles.heading}>Bid Details</h2>
                <div className={styles.headerActions}>
                  <div className={styles.statusDropdown}>
                    <select
                      value={status}
                      onChange={(e) => handleStatusUpdate(e.target.value)}
                      className={styles.statusSelect}
                      disabled={isLoading}
                    >
                      <option value="pending" disabled={true}>Pending</option>
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </div>
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
              </div>

              <div className={styles.jobDetails}>
                {/* Consultancy Information */}
                <div className={styles.consultancySection}>
                  <h3 className={styles.sectionTitle}>Consultancy Information</h3>
                  <div className={styles.consultancyInfo}>
                    <div className={styles.infoRow}>
                      <p><strong>Name:</strong> {data.consultancy.consultancy_name}</p>
                      <p><strong>Specialization:</strong> {data.consultancy.specialization}</p>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Size:</strong> {data.consultancy.consultancy_size}</p>
                      <p><strong>Experience:</strong> {data.consultancy.experience_years || 'N/A'} years</p>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Address:</strong> {data.consultancy.office_address}</p>
                      <p><strong>Website:</strong> <a href={data.consultancy.website} target="_blank" rel="noopener noreferrer">{data.consultancy.website}</a></p>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Phone:</strong> {data.consultancy.phone_number}</p>
                      <p><strong>Verified:</strong> <span className={`${styles.statusBadge} ${data.consultancy.application_status === 'approved' ? styles.status_active : styles.status_inactive}`}>
                        {data.consultancy.application_status === 'approved' ? 'Yes' : 'No'}
                      </span></p>
                    </div>
                  </div>
                </div>

                {/* Job Information */}
                <div className={styles.jobSection}>
                  <h3 className={styles.sectionTitle}>Job Information</h3>
                  <div className={styles.companyHeader}>
                    <div className={styles.companyLogo}>
                      {data.company_logo ? (
                        <Image
                          src={data.job.profile_image}
                          alt={`${data.job.company_name} logo`}
                          width={60}
                          height={60}
                          className={styles.logoImage}
                        />
                      ) : (
                        <div className={styles.placeholderLogo}>
                          <FaBuilding />
                        </div>
                      )}
                    </div>
                    <div className={styles.companyInfo}>
                      <h3 className={styles.jobTitle}>{data.job.title}</h3>
                      <p className={styles.companyName}>{data.job.company_name}</p>
                    </div>
                  </div>

                  <div className={styles.jobInfo}>
                    <div className={styles.infoRow}>
                      <p><strong>Location:</strong> {data.job.location} ({data.job.work_mode})</p>
                      <p><strong>Type:</strong> {data.job.job_type}</p>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Experience Level:</strong> {data.job.experience_level}</p>
                      <p><strong>Industry:</strong> {data.job.industry}</p>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Salary:</strong> {data.job.min_salary} - {data.job.max_salary} {data.job.currency} ({data.job.salary_type})</p>
                      <p><strong>Posted Date:</strong> {new Date(data.job.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Bid Information */}
                <div className={styles.bidSection}>
                  <h3 className={styles.sectionTitle}>Bid Information</h3>
                  <div className={styles.bidInfo}>
                    <div className={styles.infoRow}>
                      <p><strong>Proposal:</strong></p>
                      <div className={styles.proposalText}>
                        {data.proposal}
                      </div>
                    </div>
                    <div className={styles.infoRow}>
                      <p><strong>Fee:</strong> ₹{data.fee}</p>
                      <p><strong>Submitted On:</strong> {new Date(data.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal>
    </>
  );
}