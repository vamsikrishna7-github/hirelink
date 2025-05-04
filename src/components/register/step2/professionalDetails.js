"use client";
import styles from './professionalDetails.module.css';
import { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaKey, FaPhone, FaArrowLeft, FaExclamationCircle, FaCheckCircle, FaSpinner, FaBriefcase } from 'react-icons/fa';
import {FiEye, FiEyeOff, FiLink, FiUsers} from 'react-icons/fi';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Link from 'next/link';
import validatePhone from '@/utils/validatePhone';
import validateURL from '@/utils/validateURL';

export default function SignUpPage({ employer, consultancy, candidate, useremail }) {
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    phone: '',
    website_url: '',
  });
  const [formData, setFormData] = useState({
    company_name: '',
    phone: '',
    companySize: '',
    designation: '',
    website_url: '',
  });

  const validateForm = () => {
    // Required fields validation
    if (!formData.company_name) return false;
    if (!formData.phone) return false;
    if (!formData.companySize) return false;
    if (!formData.designation) return false;

    // Phone validation
    const phoneError = validatePhone(formData.phone, selectedCountry);
    if (phoneError) return false;



    return true;
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
    const phoneError = validatePhone(value, selectedCountry);
    setErrors({ ...errors, phone: phoneError });
    setIsPhoneValid(!phoneError);
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const phoneError = validatePhone(formData.phone, country);
    setErrors({ ...errors, phone: phoneError });
    setIsPhoneValid(!phoneError);
  };

  const handleWebsiteChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, website_url: value });
    if (value) {
      const urlError = validateURL(value);
      setErrors({ ...errors, website_url: urlError });
    } else {
      setErrors({ ...errors, website_url: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Add your form submission logic here
      console.log('Form submitted:', formData);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={`card-body p-4 p-md-5 ${styles.cardBody}`}>
          {/* Page Indicator */}
          <div className={`${styles.pageIndicator} mb-4`}>
            <span className={styles.pageIndicatorText}>
              <span className={styles.currentPage}>Step 2</span>
              <span className={styles.totalPages}>/4</span>
            </span>
          </div>
          
          <h1 className={`card-title ${styles.title}`}>Creating Your <span className={styles.userType}>{employer ? 'Employer' : consultancy ? 'Consultancy' : 'Candidate'}</span> Account</h1>
          
          <p className={`text-center mb-4 ${styles.loginPrompt}`}>
              {employer || consultancy ? <span>Please fill professional details to create your account</span> : <span>Please fill additional details to create your account</span>}
          </p>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label className={`form-label ${styles.inputLabel}`}>{employer ? 'COMPANY NAME' : consultancy ? 'CONSULTANCY NAME' : ''}</label>
              <div className={`input-group ${styles.otpGroup}`}>
                  <div className={styles.iconInputWrapper}>
                  <FaBuilding className={styles.inputIcon} />
                  <input 
                      type="text" 
                      className={`form-control rounded-end-0 ${styles.formControl}`}
                      placeholder="Enter company name" 
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      required
                  />
                  </div>
              </div>

            </div>

            <div className="mb-3">
              <label className={`form-label ${styles.inputLabel}`}>PHONE NUMBER</label>
                  <div className={`${styles.phoneInputWrapper} ${errors.phone ? styles.phoneInputError : ''}`}>
                  <PhoneInput
                  international
                  defaultCountry="IN"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onCountryChange={handleCountryChange}
                  className={`${styles.phoneInputContainer}`}
                  inputClassName={`${styles.phoneInputField}`}
                  countrySelectProps={{
                      className: styles.countrySelect,
                  }}
                  />
                  </div>
              {errors.phone && (
                  <div className={styles.errorMessage}>
                      <FaExclamationCircle className="me-2" />
                      {errors.phone}
                  </div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label htmlFor="firstName" className={`form-label ${styles.inputLabel}`}>{employer ? 'COMPANY SIZE' : consultancy ? 'CONSULTANCY SIZE' : ''}</label>
                <div className={styles.iconInputWrapper}>
                  <FiUsers className={styles.inputIcon} />
                  <select 
                      id="companySize"
                      className={`form-select ${styles.formControl}`}
                      value={formData.companySize || ''}
                      onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                  >
                      <option value="" disabled>Select company size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-100">51-100 employees</option>
                      <option value="101-200">101-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <label htmlFor="lastName" className={`form-label ${styles.inputLabel}`}>DESIGNATION</label>
                <div className={styles.iconInputWrapper}>
                  <FaBriefcase className={styles.inputIcon} />
                  <input 
                    type="text" 
                    className={`form-control ${styles.formControl}`} 
                    id="designation" 
                    placeholder="Designation" 
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="website_url" className={`form-label ${styles.inputLabel}`}>Website URL(optional)</label>
              <div className={`${styles.iconInputWrapper}`}>
                <FiLink className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={`form-control ${styles.formControl} ${errors.website_url ? styles.inputError : ''}`}
                  id="website_url" 
                  placeholder="https://www.example.com" 
                  value={formData.website_url}
                  onChange={handleWebsiteChange}
                />
              </div>
              {errors.website_url && (
                  <div className={styles.errorMessage}>
                      <FaExclamationCircle className="me-2" />
                      {errors.website_url}
                  </div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <Link href="/register" type="button" className={`btn ${styles.backButton} d-none`}>
                <FaArrowLeft className="me-2" /> Back
              </Link>
              <button 
                  type="submit" 
                  className={`btn ms-auto ${styles.nextButton}`}
                  disabled={!validateForm() || isLoading}
              >
                  {isLoading ? (
                      <FaSpinner className="fa-spin me-2" />
                  ) : null}
                  Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}