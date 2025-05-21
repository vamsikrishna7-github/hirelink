"use client";

import React from 'react';
import styles from './Settings.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiSettings, FiLock, FiFile, FiEdit2, FiUser, FiEye, 
  FiShield, FiKey, FiTrash2, FiFileText, FiHelpCircle 
} from 'react-icons/fi';

const SettingsLayout = ({ userType }) => {
  const settingsSections = [
    {
      title: "Account Settings",
      icon: FiSettings,
      items: [
        { icon: FiEdit2, label: "Edit Profile", onClick: () => {} },
        { icon: FiUser, label: "Change Profile Picture", onClick: () => {} },
        { icon: FiEye, label: "Appearance", onClick: () => {} },
      ]
    },
    {
      title: "Privacy & Security",
      icon: FiLock,
      items: [
        { icon: FiShield, label: "Two-Factor Authentication", onClick: () => {} },
        { icon: FiKey, label: "Modify Password", onClick: () => {} },
        { icon: FiTrash2, label: "Delete Account", onClick: () => {}, isDanger: true },
      ]
    },
    {
      title: "Legal",
      icon: FiFile,
      items: [
        { icon: FiFileText, label: "Terms and Conditions", onClick: () => {} },
        { icon: FiFileText, label: "Privacy Policy", onClick: () => {} },
        { icon: FiHelpCircle, label: "FAQ", onClick: () => {} },
      ]
    }
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      x: 4,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.div 
      className={styles.containerFluid}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="row">
        <div className="col-12">
          <motion.div 
            className={styles.card}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className={styles.scrollableContainer}>
              <AnimatePresence>
                {settingsSections.map((section, index) => (
                  <motion.section 
                    key={index} 
                    className="mb-4"
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                  >
                    <h2 className={styles.sectionTitle}>
                      <section.icon className={styles.icon} />
                      <span>{section.title}</span>
                    </h2>
                    <div className="d-grid gap-3">
                      {section.items.map((item, itemIndex) => (
                        <motion.button
                          key={itemIndex}
                          className={`${styles.settingsButton} ${item.isDanger ? styles.danger : ''}`}
                          onClick={item.onClick}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          <item.icon className={styles.icon} />
                          <span>{item.label}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.section>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsLayout;