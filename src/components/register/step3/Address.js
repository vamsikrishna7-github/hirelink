"use client";
import styles from './address.module.css';
import { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaKey, FaPhone, FaArrowLeft, FaExclamationCircle, FaCheckCircle, FaSpinner, FaBriefcase, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaMap, FaEnvelope, FaLandmark } from 'react-icons/fa';
import {FiEye, FiEyeOff, FiLink, FiUsers} from 'react-icons/fi';
import { MdPlace } from 'react-icons/md';
import Link from 'next/link';
import validatePhone from '@/utils/validatePhone';
import validateURL from '@/utils/validateURL';

export default function SignUpPage({ employer, consultancy, candidate, useremail }) {
  const [formData, setFormData] = useState({
    street_address: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  
  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={`card-body p-4 p-md-5 ${styles.cardBody}`}>
          {/* Page Indicator */}
          <div className={`${styles.pageIndicator} mb-4`}>
            <span className={styles.pageIndicatorText}>
              <span className={styles.currentPage}>Step 3</span>
              <span className={styles.totalPages}>/4</span>
            </span>
          </div>
          
          <h1 className={`card-title ${styles.title}`}>Creating Your <span className={styles.userType}>{employer ? 'Employer' : consultancy ? 'Consultancy' : 'Candidate'}</span> Account</h1>
          
          <p className={`text-center mb-4 ${styles.loginPrompt}`}>
              {employer || consultancy ? <span>Please fill your company address details to create your account</span> : <span>Please fill your address details to create your account</span>}
          </p>

          <form>

            <div className="mb-3">
              <label className={`form-label ${styles.inputLabel}`}>STREET ADDRESS</label>
              <div className={`input-group ${styles.otpGroup}`}>
                  <div className={styles.iconInputWrapper}>
                  <FaMapMarkerAlt className={styles.inputIcon} />
                  <input 
                      type="text" 
                      className={`form-control rounded-end-0 ${styles.formControl}`}
                      placeholder="Enter street address" 
                      value={formData.street_address}
                      onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
                      required
                  />
                  </div>
              </div>

            </div>


            <div className="mb-3">
              <label className={`form-label ${styles.inputLabel}`}>LOCALITY</label>
              <div className={`input-group ${styles.otpGroup}`}>
                  <div className={styles.iconInputWrapper}>
                  <FaLandmark   className={styles.inputIcon} />
                  <input 
                      type="text" 
                      className={`form-control rounded-end-0 ${styles.formControl}`}
                      placeholder="Enter locality" 
                      value={formData.locality}
                      onChange={(e) => setFormData({ ...formData, locality: e.target.value })}
                      required
                  />
                  </div>
              </div>

            </div>



            <div className="mb-4">
              <label htmlFor="city" className={`form-label ${styles.inputLabel}`}>CITY</label>
              <div className={`${styles.iconInputWrapper}`}>
                <FaCity className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={`form-control ${styles.formControl}`}
                  id="city" 
                  placeholder="City" 
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="state" className={`form-label ${styles.inputLabel}`}>STATE</label>
              <div className={`${styles.iconInputWrapper}`}>
                <FaMap  className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={`form-control ${styles.formControl}`}
                  id="state" 
                  placeholder="State" 
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="firstName" className={`form-label ${styles.inputLabel}`}>COUNTRY</label>
                <div className={styles.iconInputWrapper}>
                  <FaGlobeAmericas   className={styles.inputIcon} />
                  <select 
                      id="country"
                      className={`form-select ${styles.formControl}`}
                      value={formData.country || ''}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                  >
                      <option value="" disabled>Select country</option>
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Kolkata">Kolkata</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className={`form-label ${styles.inputLabel}`}>PINCODE</label>
                <div className={styles.iconInputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input 
                    type="text" 
                    className={`form-control ${styles.formControl}`} 
                    id="pincode" 
                    placeholder="Pincode" 
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>


            <div className="d-flex justify-content-between align-items-center mt-4">
              <Link href="/register" type="button" className={`btn ${styles.backButton} d-none`}>
                <FaArrowLeft className="me-2" /> Back
              </Link>
              <button 
                  type="submit" 
                  className={`btn ms-auto ${styles.nextButton}`}
                  disabled={false}
              >
                  Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}