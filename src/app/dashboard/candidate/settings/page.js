"use client";

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import styles from './Settings.module.css';
import { FiSettings, FiLock, FiFile } from 'react-icons/fi';

const Settings = () => {
  return (
    <Container fluid className={styles.settingsContainer}>
      <Row>
        <Col md={7}>
          <div className={styles.settingsContent}>
            <section className={styles.settingSection}>
              <h2><FiSettings /> Account Setting</h2>
              <div className={styles.settingOptions}>
                <button className={styles.settingButton}>Edit Profile</button>
                <button className={styles.settingButton}>Change Profile</button>
                <button className={styles.settingButton}>Appearance</button>
              </div>
            </section>

            <section className={styles.settingSection}>
              <h2><FiLock /> Privacy & Security</h2>
              <div className={styles.settingOptions}>
                <button className={styles.settingButton}>Two-Factor Authentication</button>
                <button className={styles.settingButton}>Modify Password</button>
                <button className={styles.settingButton}>Delete Account</button>
              </div>
            </section>

            <section className={styles.settingSection}>
              <h2><FiFile /> Legal</h2>
              <div className={styles.settingOptions}>
                <button className={styles.settingButton}>Terms and Conditions</button>
                <button className={styles.settingButton}>Privacy policy</button>
                <button className={styles.settingButton}>FAQ</button>
              </div>
            </section>
          </div>
        </Col>
        <Col md={5} className={styles.illustrationContainer}>
          <div className={styles.illustration}>
            <Image
              src="/settings_image.png"
              alt="Settings Illustration"
              width={400}
              height={400}
              priority
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
