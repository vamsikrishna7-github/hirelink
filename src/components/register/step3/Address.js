"use client";
import styles from './address.module.css';
import { useState, useEffect } from 'react';
import { FaUser, FaBuilding, FaKey, FaPhone, FaArrowLeft, FaExclamationCircle, FaCheckCircle, FaSpinner, FaBriefcase, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaMap, FaEnvelope, FaLandmark } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function SignUpPage({ employer, consultancy, candidate, useremail }) {
  const router = useRouter();
  const registrationData = typeof window !== 'undefined' && Cookies.get('registrationData') ? JSON.parse(Cookies.get('registrationData')) : null;

  const [formData, setFormData] = useState({
    street_address: '',
    locality: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    return Object.values(formData).every(val => val.trim() !== '');
  };

  useEffect(() => {
    if (!registrationData) {
      console.error("registrationData not found");
    } else {
      console.log("registrationData /address cookies:", registrationData);
    }
  }, [registrationData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = `${key.replace('_', ' ')} is required`;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (!registrationData) throw new Error('Registration data not available');

      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: registrationData.email,
          password: registrationData.password
        })
      });

      if (!loginResponse.ok) throw new Error('Authentication failed');

      const { access } = await loginResponse.json();

      const fullAddress = `${formData.street_address}, ${formData.locality}, ${formData.city}, ${formData.state}, ${formData.country} - ${formData.pincode}`;

      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${registrationData.user_type}/profile/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${access}`
        },
        body: JSON.stringify({ company_address: fullAddress })
      });

      if (!profileResponse.ok) throw new Error('Failed to update profile');

      registrationData.reg_step = 5;
      Cookies.set('registrationData', JSON.stringify(registrationData), {
        expires: 0.0208,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
      });

      router.push(`/register/${registrationData.user_type}/documents-upload`);
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({ ...prev, serverError: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        <div className={`card-body p-4 p-md-5 ${styles.cardBody}`}>
          <div className={`${styles.pageIndicator} mb-4`}>
            <span className={styles.pageIndicatorText}>
              <span className={styles.currentPage}>Step 3</span>
              <span className={styles.totalPages}>/4</span>
            </span>
          </div>

          <h1 className={`card-title ${styles.title}`}>
            Creating Your <span className={styles.userType}>
              {registrationData?.user_type || ''}
            </span> Account
          </h1>

          <p className={`text-center mb-4 ${styles.loginPrompt}`}>
            {employer || consultancy ?
              <span>Please fill your company address details to create your account</span> :
              <span>Please fill your address details to create your account</span>}
          </p>

          <form onSubmit={handleSubmit}>
            {['street_address', 'locality', 'city', 'state', 'country', 'pincode'].map((field, i) => (
              <div className="mb-3" key={field}>
                <label className={`form-label ${styles.inputLabel}`}>{field.replace('_', ' ').toUpperCase()}</label>
                <div className={`input-group ${styles.otpGroup}`}>
                  <div className={styles.iconInputWrapper}>
                    <input
                      type="text"
                      className={`form-control ${styles.formControl}`}
                      placeholder={`Enter ${field.replace('_', ' ')}`}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      required
                    />
                  </div>
                </div>
                {errors[field] && <div className="text-danger">{errors[field]}</div>}
              </div>
            ))}

            {errors.serverError && <div className="text-danger mb-3">{errors.serverError}</div>}

            <div className="d-grid gap-2">
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                {isLoading ? <FaSpinner className="spinner-border spinner-border-sm" /> : 'Continue'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}