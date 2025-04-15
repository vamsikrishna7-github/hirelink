"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBuilding, FaHandshake, FaUserTie, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
  const [userType, setUserType] = useState('employer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { userType, email, password });
  };

  const getForgotPasswordUrl = () => {
    switch (userType) {
      case 'employer':
        return '/forgot-password/employer';
      case 'consultancy':
        return '/forgot-password/consultancy';
      case 'candidate':
        return '/forgot-password/candidate';
      default:
        return '/forgot-password/employer';
    }
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold">Welcome Back</h1>
                  <p className="text-muted">Sign in to your account</p>
                </div>

                {/* User Type Selection */}
                <div className="d-flex justify-content-center mb-4">
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className={`btn ${userType === 'employer' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('employer')}
                    >
                      <FaBuilding className="me-2" />
                      Employer
                    </button>
                    <button
                      type="button"
                      className={`btn ${userType === 'consultancy' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('consultancy')}
                    >
                      <FaHandshake className="me-2" />
                      Consultancy
                    </button>
                    <button
                      type="button"
                      className={`btn ${userType === 'candidate' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('candidate')}
                    >
                      <FaUserTie className="me-2" />
                      Candidate
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEnvelope />
                      </span>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="remember"
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                    <Link href={getForgotPasswordUrl()} className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 mb-3">
                    Sign In
                  </button>

                  <div className="text-center">
                    <p className="mb-0">
                      Don&apos;t have an account?{' '}
                      <Link href="/register" className="text-primary">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 