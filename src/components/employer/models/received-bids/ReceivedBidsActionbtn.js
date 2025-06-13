"use client";
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import styles from "./page.module.css";
import { FaEye, FaTimes, FaBuilding, FaChevronDown, FaChevronUp, FaHandshake, FaGavel, FaPencil } from "react-icons/fa";
import { FiEye, FiPencil } from "react-icons/fi";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { ReceivedBidsContext } from "@/context/employer/Receivedbids";
import { initializeRazorpay } from "@/utils/razorpay";

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
  const { bids, setBids } = useContext(ReceivedBidsContext);
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
  const [isAgreed, setIsAgreed] = useState(false);
  const [showAgreement, setShowAgreement] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(false);
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
    setPaymentDetails(null);
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
    if (newStatus === 'approve' || newStatus === 'reject') {
      setStatus(newStatus);
      setShowAgreement(true);
      return;
    }
  };

  const initializePayment = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-order/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        },
        body: JSON.stringify({
          bid_id: data.id
        })
      });
      const orderData = await response.json();

      if (!response.ok) {
        toast.error(orderData.error);
        throw new Error('Failed to create payment order');
      }

      setPaymentDetails(orderData);

      // Initialize Razorpay
      const Razorpay = await initializeRazorpay();
      if (!Razorpay) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'HireLink',
        description: 'Payment for Bid Approval',
        order_id: orderData.order_id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/verify-payment/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('access_token')}`
              },
              body: JSON.stringify({
                payment_id: orderData.payment_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              toast.error(verifyData.error);
              throw new Error('Payment verification failed');
            }

            // If payment is successful, proceed with bid approval
            console.log('verifyData= ', verifyData);  
            if (verifyData.status === 'success') {
              console.log('Payment successful= ', verifyData.status); 
              setPaymentStatus(true);
            }

            await handleConfirmStatus();
            toast.success('Payment successful! Bid has been approved.');
          } catch (error) {
            console.error('Payment verification failed:', error);
            toast.error('Payment verification failed. Please try again.');
          }
        },
        prefill: {
          name: data.consultancy.consultancy_name,
          email: data.consultancy.email,
          contact: data.consultancy.phone_number
        },
        theme: {
          color: '#2563eb'
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error initializing payment:', error);
      toast.error(error.message || 'Failed to initialize payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmStatus = async () => {
    if (!isAgreed) {
      toast.error('Please agree to the terms before proceeding');
      return;
    }

    try {
      setIsLoading(true);
      
      if (status === 'approve' && !paymentStatus) {
        // Initialize payment for approval
        console.log('Initializing payment= ', paymentStatus);
        await initializePayment();
        return;
      }

      // For rejection, proceed normally
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bids/${data.id}/${status}/`, {
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
        toast.success(`Bid ${responseData.status} successfully! You will receive a confirmation email shortly.`);
        setStatus(status);
        setBids(bids.map(bid => bid.id === data.id ? { ...bid, status: responseData.status } : bid));
        setShowAgreement(false);
        setIsAgreed(false);
      }

    } catch (error) {
      console.error('Error updating bid status:', error);
      toast.error('Failed to update bid status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getFeePercentage = () => {
    const fee = parseFloat(data.fee);
    if (isNaN(fee) || !data.job?.min_salary || !data.job?.max_salary) return null;
    const avgSalary = (parseFloat(data.job.min_salary) + parseFloat(data.job.max_salary)) / 2;
    if (avgSalary === 0) return null;
    return ((fee / avgSalary) * 100).toFixed(2);
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
          <FiEye size={16} />
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

              {showAgreement && (
                <div className={styles.agreementSection}>
                  <div className={styles.agreementContent}>
                    <h3>Confirmation Required</h3>
                    <p>By proceeding with this action, you agree to:</p>
                    <ul>
                      <li>Confirm your decision to {status === 'approve' ? 'approve' : 'reject'} this bid</li>
                      {status === 'approve' && (
                        <li>Make a payment of ₹{data.fee} to approve this bid</li>
                      )}
                      <li>Receive a confirmation email with the agreement details</li>
                      <li>This action cannot be undone</li>
                    </ul>
                    <div className={styles.agreementCheckbox}>
                      <input
                        type="checkbox"
                        id="agreement"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                      />
                      <label htmlFor="agreement">
                        I understand and agree to the terms above
                      </label>
                    </div>
                    <div className={styles.agreementActions}>
                      <button
                        onClick={() => {
                          setShowAgreement(false);
                          setIsAgreed(false);
                          setStatus('pending');
                        }}
                        className={styles.cancelButton}
                        disabled={isLoading}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleConfirmStatus}
                        className={styles.confirmButton}
                        disabled={isLoading || !isAgreed}
                      >
                        {isLoading ? 'Processing...' : status === 'approve' ? 'Proceed to Payment' : 'Confirm'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

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
                      <p className={styles.percentageInfo} style={{ marginTop: 8, color: '#888', fontSize: 13 }}>
                        <strong>Fee:</strong> <strong className="text-primary" >₹{data.fee}</strong><br/>
                          <><strong className="text-primary">{(data.fee/data.job.bid_budget*100).toFixed(2)}%</strong> of the ₹&nbsp;{(data.job.bid_budget).toLocaleString()}</>
                      </p>
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