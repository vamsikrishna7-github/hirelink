'use client';
import { FiMail, FiBell } from 'react-icons/fi';
import { MdMessage } from 'react-icons/md';
import { HiOutlineMail, HiOutlineUserCircle } from 'react-icons/hi';
import styles from './page.module.css';
import SemiCircleChart from '@/components/employer/SemiCrircleChart';
import Image from 'next/image';

const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: 'https://img.icons8.com/color/480/google-logo.png',
  location: 'New York, NY',
  bio: 'Software engineer passionate about building scalable systems.',
  stats: {
    applications: 24,
    messages: 5,
    notifications: 3
  }
};

export default function EmployerDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 mb-0 fw-bold">Dashboard</h1>
        <div className="d-flex gap-3">
          <button className="btn btn-light position-relative p-2">
            <HiOutlineMail size={24} />
            {user.stats.messages > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {user.stats.messages}
              </span>
            )}
          </button>
          <button className="btn btn-light position-relative p-2">
            <FiBell size={22} />
            {user.stats.notifications > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {user.stats.notifications}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Welcome Card */}
      <div className="card shadow-sm mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h2 className="h5 card-title">Welcome back, {user.name}!</h2>
            <p className="card-text text-muted mb-2">{user.bio}</p>
            <div className="d-flex align-items-center gap-2">
              <FiMail size={16} className="text-muted" />
              <small className="text-muted">{user.email}</small>
            </div>
          </div>
          <div className={`${styles.profile} d-flex flex-column align-items-center `}>
            <Image 
              width={80} 
              height={80} 
              src={user.profilePicture} 
              alt="Profile" 
              className="rounded-circle object-fit-cover border"
              style={{ width: '80px', height: '80px' }}
            />
            <div className="mt-2 text-center">
              <p className="mb-0 fw-medium">{user.name}</p>
              <small className="text-muted">
                <HiOutlineUserCircle size={14} className="me-1" />
                {user.location}
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <SemiCircleChart />
        </div>
      </div>
    </div>
  );
}