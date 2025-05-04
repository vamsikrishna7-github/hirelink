'use client'
import React, { useState, useRef } from 'react';
import styles from './Documents-upload.module.css';

const documentFields = [
  { label: 'MSME or Incorpuration certificate', key: 'msme' },
  { label: 'GSTIN Certificate', key: 'gstin' },
  { label: 'PAN Card', key: 'pan' },
  { label: 'POC Document', key: 'poc' },
];

const simulateUpload = (file, onProgress, onComplete) => {
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20 + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      onProgress(progress);
      setTimeout(onComplete, 300); // slight delay for UX
    } else {
      onProgress(progress);
    }
  }, 200);
};

const Confetti = ({ show }) => {
  // Simple confetti effect using emoji
  if (!show) return null;
  return (
    <div className={styles.confetti}>
      {Array.from({ length: 30 }).map((_, i) => (
        <span key={i} style={{ left: `${Math.random() * 100}%`, animationDelay: `${Math.random()}s` }}>
          🎉
        </span>
      ))}
    </div>
  );
};

const DocumentsUpload = () => {
  const [files, setFiles] = useState({});
  const [uploading, setUploading] = useState({});
  const [progress, setProgress] = useState({});
  const [uploaded, setUploaded] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);
  const prevAllUploaded = useRef(false);

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;
    setFiles((prev) => ({ ...prev, [key]: file }));
    setUploading((prev) => ({ ...prev, [key]: true }));
    setProgress((prev) => ({ ...prev, [key]: 0 }));
    setUploaded((prev) => ({ ...prev, [key]: false }));
    simulateUpload(
      file,
      (prog) => setProgress((prev) => ({ ...prev, [key]: prog })),
      () => {
        setUploading((prev) => ({ ...prev, [key]: false }));
        setUploaded((prev) => ({ ...prev, [key]: true }));
      }
    );
  };

  const allUploaded = documentFields.every((field) => uploaded[field.key]);

  React.useEffect(() => {
    if (allUploaded && !prevAllUploaded.current) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
    prevAllUploaded.current = allUploaded;
  }, [allUploaded]);

  return (
    <div className={styles.wrapper} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Confetti show={showConfetti} />
      <div className={styles.container + ' ' + styles.fadeIn}>
        <div className={styles.stepIndicator}>Step 4/4</div>
        <h1 className={styles.title}>Upload below Mentioned Documents</h1>
        <p className={styles.subtitle}>
          Please upload mention document to verify our team
        </p>
        <div className={styles.formSection}>
          {documentFields.map((field) => (
            <div className={styles.row} key={field.key}>
              <span className={styles.label}>{field.label}</span>
              <label
                className={styles.uploadBtn +
                  (uploading[field.key] ? ' ' + styles.uploading : '') +
                  (uploaded[field.key] ? ' ' + styles.uploaded : '')}
                tabIndex={0}
                title="Upload .jpg, .png, .pdf files"
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(e, field.key)}
                  disabled={uploading[field.key]}
                />
                <span className={styles.uploadIcon}>
                  {uploaded[field.key] ? (
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="10" fill="#22c55e"/>
                      <path d="M6 10.5l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 14V6M10 6L6 10M10 6l4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="3" y="14" width="14" height="3" rx="1.5" fill="#fff"/>
                    </svg>
                  )}
                </span>
                {uploading[field.key] ? 'Uploading...' : uploaded[field.key] ? 'Uploaded' : 'Upload'}
              </label>
              {files[field.key] && (
                <span className={styles.fileName}>{files[field.key].name}</span>
              )}
              {uploading[field.key] && (
                <span className={styles.progressBarContainer}>
                  <span
                    className={styles.progressBar}
                    style={{ width: `${progress[field.key] || 0}%` }}
                  />
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.backBtn}>Back</button>
          <button className={styles.nextBtn} disabled={!allUploaded}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default DocumentsUpload; 