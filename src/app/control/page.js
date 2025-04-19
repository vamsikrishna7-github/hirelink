'use client'
import { useEffect } from 'react'

export default function ControlRedirect() {
  useEffect(() => {
    window.location.href = 'https://hirelink-api.onrender.com/control/'
  }, [])

  return <p>Redirecting to Admin Panel...</p>
}
