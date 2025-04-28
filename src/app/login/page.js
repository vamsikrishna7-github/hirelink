"use client";


import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBuilding, FaHandshake, FaUserTie, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './Login.module.css';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';

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
      console.log('Attempting login with API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      // First, authenticate with the backend
      const authResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/jwt/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!authResponse.ok) {
        const errorData = await authResponse.json();
        console.error('Login failed:', errorData);
        throw new Error(errorData.detail || "Authentication failed");
      }

      const authData = await authResponse.json();
      console.log('Login successful, received tokens');

      // Store the tokens
      document.cookie = `access_token=${authData.access}; path=/; max-age=3600`; // 1 hour
      document.cookie = `refresh_token=${authData.refresh}; path=/; max-age=604800`; // 7 days

      // Then, get user profile to verify user type
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/users/me/`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${authData.access}`,
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      if (!profileResponse.ok) {
        const errorData = await profileResponse.json();
        console.error('Profile fetch failed:', errorData);
        throw new Error("Failed to fetch user profile");
      }

      const profileData = await profileResponse.json();
      console.log('Profile fetched successfully:', profileData);

      // Store user type in cookie
      document.cookie = `user_type=${profileData.user_type}; path=/; max-age=3600`; // 1 hour

      // Redirect based on user type
      router.push(`/dashboard/${profileData.user_type}`);
    } catch (err) {
      console.error("Login error:", err);
      if (err.message.includes('Failed to fetch')) {
        setError("Unable to connect to the server. Please check your internet connection and try again.");
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
<div className={`container-fluid ${styles.loginContainer}`}>
    <div className="row justify-content-center align-items-center h-100">
    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="card border-0 p-3 p-sm-4 p-md-5" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '24px'}}>
                <div className="text-center mb-4">
                    <h2 className={`${styles.header} mt-3`}>Sign In</h2>
                </div>
                {error && (
                  <div className="d-inline-flex align-items-center gap-1 ps-2 pe-3 py-1 mb-2 bg-danger-100 text-danger rounded-pill">
                    <span className="bg-danger rounded-circle" style={{width: '6px', height: '6px'}}></span>
                    <small className="fw-medium">{error}</small>
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className={`${styles.label} form-label`}>Email</label>
                        <input 
                            type="email" 
                            className={`${styles.input} form-control rounded-5`} 
                            id="email" 
                            placeholder="Example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className={`${styles.label} form-label`}>Password</label>
                        <div className="position-relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                className={`${styles.input} form-control rounded-5 pe-5`}
                                id="password" 
                                placeholder="*******"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button"
                                className={`btn btn-link position-absolute end-0 top-50 translate-middle-y me-2 `}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ zIndex: 5, color: '#6c757d' }}
                            >
                                <span className={`${styles.passwordToggleIcon} px-1 pb-1 rounded-3`}>{showPassword ? <FiEyeOff size={15} /> : <FiEye size={15} />}</span>
                            </button>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="rememberMe"
                                />
                                <label className={`${styles.secoundarytext} form-check-label ${styles.rememberMe}`} htmlFor="rememberMe">Remember me</label>
                            </div>
                            <Link href="/forgot-password" className={`${styles.forgetPassword} text-decoration-none`}>Forget Password?</Link>
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className={`${styles.submitbtn} btn btn-primary w-100 mb-3 py-2 fw-bold`}>{isLoading ? 'Signing in...' : 'Sign In'}</button>
                    
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <hr className="flex-grow-1" />
                      <span className={`${styles.secoundarytext} px-3`}>or continue with</span>
                      <hr className="flex-grow-1" />
                    </div>
                    
                    <button className={`${styles.socialbtn} btn btn-outline-secondary w-100 mb-3 py-2 rounded-5`}>
                        <Image width={22} height={22} src="/login/google.svg" alt="Google" className="me-3 mb-1" /><span className={`${styles.secoundarytext}`}> Continue with Google</span>
                    </button>
                    
                    <div className="text-center">
                        <span className={`${styles.secoundarytext}`}>Don&apos;t have an account yet? </span>
                        <Link href="/register" className={`${styles.signupLink} text-decoration-none`}>Sign up</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
  );
} 