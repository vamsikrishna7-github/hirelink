"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function EmployerForgotPassword() {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetToken, setResetToken] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle sending reset email logic here
    console.log('Sending reset email to:', email);
    setIsEmailSent(true);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Resetting password with token:', resetToken);
  };

  return (
    <div className="forgot-password-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold">Reset Your Password</h1>
                  <p className="text-muted">Enter your email to receive a password reset link</p>
                </div>

                {!isEmailSent ? (
                  <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                      <label htmlFor="email" className="form-label">Email Address</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaEnvelope />
                        </span>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Send Reset Link
                      </button>
                      <Link href="/login" className="btn btn-outline-secondary">
                        Back to Login
                      </Link>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleResetSubmit}>
                    <div className="mb-4">
                      <label htmlFor="resetToken" className="form-label">Reset Token</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          id="resetToken"
                          value={resetToken}
                          onChange={(e) => setResetToken(e.target.value)}
                          required
                        />
                      </div>
                      <small className="text-muted">Check your email for the reset token</small>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirmPassword"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="d-grid gap-2">
                      <button type="submit" className="btn btn-primary">
                        Reset Password
                      </button>
                      <Link href="/login" className="btn btn-outline-secondary">
                        Back to Login
                      </Link>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 