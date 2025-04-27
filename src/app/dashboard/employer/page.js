'use client';
import styles from './page.module.css';
import SemiCrircleChart from '@/components/employer/SemiCrircleChart';

export default function EmployerDashboard() {
  return (
    <div className={styles.dashboard}>
      <h1 className="mb-4">Dashboard</h1>
      <SemiCrircleChart />
    </div>
  );
}