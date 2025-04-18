"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaHandshake, FaUserTie, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [userType, setUserType] = useState('employer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // First, authenticate with the backend
      const authResponse = await fetch("http://127.0.0.1:8000/api/auth/jwt/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const authData = await authResponse.json();

      if (!authResponse.ok) {
        throw new Error(authData.detail || "Authentication failed");
      }

      // Store the tokens
      document.cookie = `access_token=${authData.access}; path=/; max-age=3600`; // 1 hour
      document.cookie = `refresh_token=${authData.refresh}; path=/; max-age=604800`; // 7 days

      // Then, get user profile to verify user type
      const profileResponse = await fetch("http://127.0.0.1:8000/api/auth/users/me/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authData.access}`,
          "Content-Type": "application/json",
        },
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch user profile");
      }

      // Store user type in cookie
      document.cookie = `user_type=${profileData.user_type}; path=/; max-age=3600`; // 1 hour

      // Redirect based on user type
      router.push(`/dashboard/${profileData.user_type}`);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
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

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

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
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="btn border-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash className="text-secondary" /> : <FaEye className="text-secondary" />}
                      </button>
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
                    <Link href="/forgot-password" className="text-primary">
                      Forgot password?
                    </Link>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
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