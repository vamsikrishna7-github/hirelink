'use client'

import { useEffect, useState } from 'react'
import styles from './Status.module.css'
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaExclamationCircle, FaClock } from 'react-icons/fa'
import Link from 'next/link'

export default function StatusPage() {
  const [status, setStatus] = useState('verifying') // 'verifying', 'approved', 'rejected'

  useEffect(() => {
    // Simulate status fetch
    const timer = setTimeout(() => {
      const result = Math.random() > 0.4 ? 'approved' : 'rejected' // randomize for demo
      setStatus(result)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === 'verifying' && (
          <div className="text-center animate__animated animate__fadeIn">
            <div className={styles.loader}></div>
            <h4 className="mt-4 fw-semibold">Verifying Your Documents</h4>
            <p className="text-muted">Verification may take longer than usual. Once it&apos;s completed, you will receive an update via email.</p>
          </div>
        )}

        {status === 'approved' && (
            <div className="text-center animate__animated animate__fadeInUp">
            <FaCheckCircle className={`text-success ${styles.icon}`} />
            <h3 className="mt-3 fw-bold">Verification Successful</h3>
            <p className="text-muted">
                Your application has been verified successfully.
                <br />
                <FaCheckCircle className={`text-success`} /> You can now proceed to login and access your account.
                <br />
                <FaEnvelope className={`text-success`} /> Check your email for confirmation.
            </p>
            <Link href="/login" className="btn btn-success mt-3 px-4">
                Login Now
            </Link>
            </div>
        )}

        {status === 'rejected' && (
            <div className="text-center animate__animated animate__fadeInUp">
            <FaTimesCircle className={`text-danger ${styles.icon}`} />
            <h3 className="mt-3 fw-bold text-danger">Verification Rejected</h3>
            <p className="text-muted">
                Your submitted documents could not be verified.
                <br />
                <FaExclamationCircle className={`text-danger`} /> Check your email for the reason and further instructions.
                <br />
                <FaClock className={`text-danger`} /> You can re-apply after 12 to 24 hours.
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3">
                <a href="/support" className="btn btn-outline-danger px-4">Contact Support</a>
                <a href="/register/employer" className="btn btn-danger px-4">Re-Apply</a>
            </div>
            </div>
        )}
      </div>
    </div>
  )
}
