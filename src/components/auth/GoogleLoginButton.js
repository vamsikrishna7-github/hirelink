'use client';

import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import styles from '@/app/login/Login.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const userInfo = await response.json();
        // console.log("google login user info: ",userInfo);


        // Now send ID token or email to your backend
        const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google-login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }), // Using access_token to match backend
        });

        const data = await backendRes.json();
        // console.log("google login data response: ",data);

        

        if (backendRes.ok) {
          document.cookie = `access_token=${data.access}; path=/; max-age=3600`;
          document.cookie = `refresh_token=${data.refresh}; path=/; max-age=604800`;
          document.cookie = `user_type=${data.user_type}; path=/; max-age=3600`;
          router.push(`/dashboard/${data.user_type}`);

        }else{
          setError(data.error);
          if(data.error === "User not found"){
            sessionStorage.setItem('registrationData', JSON.stringify(data));
            router.push("/register");
          }
          // console.log("google login error: ",data);
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.log('Google Login Failed');
    },
    scope: 'openid email profile',
  });

  return (
    <button
      onClick={() => login()}
      className={`${styles.socialbtn} btn btn-outline-secondary w-100 mb-2 py-2 rounded-4`}
      style={{ height: '42px', fontSize: '14px' }}
    >
      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          <span className={`${styles.secoundarytext}`}>Continue with Google</span>
                        </>
                      ) : (
                        <>
                        <Image width={18} height={18} src="/login/google.svg" alt="Google" className="me-2 mb-1" />
                        <span className={`${styles.secoundarytext}`}>Continue with Google</span>
                        </>
                  )}
    </button>
  );
}
