"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Settings.module.css';
import { FiSettings, FiLock, FiFile, FiEdit2, FiUser, FiEye, FiShield, FiKey, FiTrash2, FiFileText, FiHelpCircle } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className={`container-fluid py-4 ${styles.containerFluid}`}>
      <div className="row">
        <div className="col-lg-8">
          <div className={`card shadow-sm border-0 ${styles.card}`}>
            <div className={`card-body p-4 ${styles.scrollableContainer}`}>
              <section className="mb-4">
                <h2 className="d-flex align-items-center gap-2 mb-4">
                  <FiSettings className={styles.textPrimary} />
                  <span>Account Settings</span>
                </h2>
                <div className="d-grid gap-3">
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiEdit2 className={styles.textPrimary} />
                    <span>Edit Profile</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiUser className={styles.textPrimary} />
                    <span>Change Profile Picture</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiEye className={styles.textPrimary} />
                    <span>Appearance</span>
                  </button>
                </div>
              </section>

              <section className="mb-4">
                <h2 className="d-flex align-items-center gap-2 mb-4">
                  <FiLock className={styles.textPrimary} />
                  <span>Privacy & Security</span>
                </h2>
                <div className="d-grid gap-3">
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiShield className={styles.textPrimary} />
                    <span>Two-Factor Authentication</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiKey className={styles.textPrimary} />
                    <span>Modify Password</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight} ${styles.btnDanger}`}>
                    <FiTrash2 />
                    <span>Delete Account</span>
                  </button>
                </div>
              </section>

              <section>
                <h2 className="d-flex align-items-center gap-2 mb-4">
                  <FiFile className={styles.textPrimary} />
                  <span>Legal</span>
                </h2>
                <div className="d-grid gap-3">
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiFileText className={styles.textPrimary} />
                    <span>Terms and Conditions</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiFileText className={styles.textPrimary} />
                    <span>Privacy Policy</span>
                  </button>
                  <button className={`btn btn-light ${styles.btnLight}`}>
                    <FiHelpCircle className={styles.textPrimary} />
                    <span>FAQ</span>
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Settings;
