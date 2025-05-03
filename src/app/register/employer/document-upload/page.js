'use client';
import Link from 'next/link';
import { useState } from 'react';
import styles from './page.module.css';

export default function DocumentUpload() {
  const [files, setFiles] = useState({
    msme: null,
    gstin: null,
    pan: null,
    poc: null
  });

  const handleFileUpload = (type, file) => {
    setFiles(prev => ({
      ...prev,
      [type]: file
    }));
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={`card ${styles['document-card']}`}>
            <div className="card-body p-4">
              {/* Progress Steps */}
              <div className={`d-flex justify-content-center mb-4 ${styles['progress-steps']}`}>
                <div className="d-flex align-items-center">
                  <div className="bg-primary text-white rounded-circle p-2">✓</div>
                  <div className="px-3">Register</div>
                  <div className="bg-primary text-white rounded-circle p-2">2</div>
                  <div className="px-3">Upload Documents</div>
                  <div className="bg-secondary text-white rounded-circle p-2">3</div>
                  <div className="px-3">Verify</div>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="text-center mb-4">
                <span className={styles['step-badge']}>Step 2/3</span>
              </div>

              {/* Title */}
              <h2 className="text-center mb-4">Upload below Mentioned Documents</h2>
              <p className="text-center text-muted mb-4">Please upload mention document to verify our team</p>

              {/* Upload Form */}
              <div className={styles['upload-form']}>
                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label className={styles['file-label']}>MSME or Incorporation certificate</label>
                  <button 
                    className={`btn btn-primary ${styles['upload-button']}`}
                    onClick={() => document.getElementById('msme-upload').click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    id="msme-upload"
                    hidden
                    onChange={(e) => handleFileUpload('msme', e.target.files[0])}
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label className={styles['file-label']}>GSTIN Certificate</label>
                  <button 
                    className={`btn btn-primary ${styles['upload-button']}`}
                    onClick={() => document.getElementById('gstin-upload').click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    id="gstin-upload"
                    hidden
                    onChange={(e) => handleFileUpload('gstin', e.target.files[0])}
                  />
                </div>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <label className={styles['file-label']}>PAN Card</label>
                  <button 
                    className={`btn btn-primary ${styles['upload-button']}`}
                    onClick={() => document.getElementById('pan-upload').click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    id="pan-upload"
                    hidden
                    onChange={(e) => handleFileUpload('pan', e.target.files[0])}
                  />
                </div>

                <div className="mb-4 d-flex justify-content-between align-items-center">
                  <label className={styles['file-label']}>POC Document</label>
                  <button 
                    className={`btn btn-primary ${styles['upload-button']}`}
                    onClick={() => document.getElementById('poc-upload').click()}
                  >
                    Upload
                  </button>
                  <input
                    type="file"
                    id="poc-upload"
                    hidden
                    onChange={(e) => handleFileUpload('poc', e.target.files[0])}
                  />
                </div>

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-5">
                  <Link href="/register/employer" className="btn btn-outline-primary">
                    Prev
                  </Link>
                  <Link href="/register/employer/verify" className="btn btn-primary">
                    Next
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
