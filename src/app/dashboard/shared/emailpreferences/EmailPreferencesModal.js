"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './EmailPreferencesModal.module.css';

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
    maxWidth: "500px",
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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.3
    }
  }
};

const EmailPreferencesModal = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    newsletter: true,
    productUpdates: true,
    marketing: false,
    securityAlerts: true,
    communityUpdates: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    if (isBrowser) {
      Modal.setAppElement(document.body);
    }
  }, [isBrowser]);

  useEffect(() => {
    if (isOpen) {
      // Fetch current preferences when modal opens
      const fetchPreferences = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/email-preferences/`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("access_token")}`,
              },
            }
          );
          setPreferences(response.data.preferences);
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      };
      fetchPreferences();
    }
  }, [isOpen]);

  const handlePreferenceChange = (preference) => {
    setPreferences(prev => ({
      ...prev,
      [preference]: !prev[preference]
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setSuccess(false);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/email-preferences/`,
        { preferences },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );

      toast.success("Email preferences updated successfully!");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isBrowser) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Email Preferences"
      ariaHideApp={isBrowser}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={300}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.modalContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.heading}>Email Preferences</h2>
              <motion.button 
                onClick={onClose} 
                className={styles.closeButton}
                aria-label="Close modal"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </div>

            <p className={styles.description}>
              Choose which emails you&apos;d like to receive from us. You can update these preferences at any time.
            </p>

            <motion.div variants={containerVariants}>
              <div className={styles.preferenceGroup}>
                <h3 className={styles.preferenceTitle}>Account & Security</h3>
                <div className={styles.preferenceItem}>
                  <input
                    type="checkbox"
                    id="securityAlerts"
                    className={styles.checkbox}
                    checked={preferences.securityAlerts}
                    onChange={() => handlePreferenceChange("securityAlerts")}
                  />
                  <label htmlFor="securityAlerts" className={styles.checkboxLabel}>
                    Security alerts
                  </label>
                </div>
                <p className={styles.subtext}>
                  Important notifications about your account security
                </p>
              </div>

              <div className={styles.preferenceGroup}>
                <h3 className={styles.preferenceTitle}>Product Updates</h3>
                <div className={styles.preferenceItem}>
                  <input
                    type="checkbox"
                    id="productUpdates"
                    className={styles.checkbox}
                    checked={preferences.productUpdates}
                    onChange={() => handlePreferenceChange("productUpdates")}
                  />
                  <label htmlFor="productUpdates" className={styles.checkboxLabel}>
                    Product updates and announcements
                  </label>
                </div>
                <div className={styles.preferenceItem}>
                  <input
                    type="checkbox"
                    id="newsletter"
                    className={styles.checkbox}
                    checked={preferences.newsletter}
                    onChange={() => handlePreferenceChange("newsletter")}
                  />
                  <label htmlFor="newsletter" className={styles.checkboxLabel}>
                    Weekly newsletter
                  </label>
                </div>
                <p className={styles.subtext}>
                  Tips, news, and updates about our products
                </p>
              </div>

              <div className={styles.preferenceGroup}>
                <h3 className={styles.preferenceTitle}>Community & Marketing</h3>
                <div className={styles.preferenceItem}>
                  <input
                    type="checkbox"
                    id="communityUpdates"
                    className={styles.checkbox}
                    checked={preferences.communityUpdates}
                    onChange={() => handlePreferenceChange("communityUpdates")}
                  />
                  <label htmlFor="communityUpdates" className={styles.checkboxLabel}>
                    Community updates
                  </label>
                </div>
                <div className={styles.preferenceItem}>
                  <input
                    type="checkbox"
                    id="marketing"
                    className={styles.checkbox}
                    checked={preferences.marketing}
                    onChange={() => handlePreferenceChange("marketing")}
                  />
                  <label htmlFor="marketing" className={styles.checkboxLabel}>
                    Promotional offers
                  </label>
                </div>
                <p className={styles.subtext}>
                  News about events, promotions, and community activities
                </p>
              </div>
            </motion.div>

            {success && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.successMessage}
              >
                Preferences saved successfully!
              </motion.p>
            )}

            <motion.div 
              className={styles.buttonGroup}
              variants={itemVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`${styles.button} ${styles.cancelButton}`}
                disabled={isLoading}
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
                className={`${styles.button} ${styles.saveButton}`}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Preferences"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};

export default EmailPreferencesModal;