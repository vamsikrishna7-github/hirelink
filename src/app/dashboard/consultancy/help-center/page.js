'use client';
import styles from './Help-center.module.css';
import { useState } from 'react';

export default function HelpCenter() {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "What is Pixel Bloom",
      answer: "Pixel Bloom is a cutting-edge digital platform that combines innovative technology with creative solutions. We specialize in providing comprehensive digital services tailored to modern business needs."
    },
    {
      id: 2,
      question: "How can I benefit from Pixel Bloom's services?",
      answer: "Our AI models can enhance your business operations by automating tasks, improving accuracy, and providing data-driven insights."
    },
    {
      id: 3,
      question: "How do I get started with Pixel Bloom?",
      answer: "Getting started is simple! Sign up for an account, choose your preferred service package, and our team will guide you through the onboarding process. We provide comprehensive support to ensure a smooth start."
    },
    {
      id: 4,
      question: "Are your AI models customizable?",
      answer: "Yes, our AI models are fully customizable to meet your specific business needs. We work closely with clients to ensure the solutions align perfectly with their requirements."
    },
    {
      id: 5,
      question: "How is data privacy handled?",
      answer: "We take data privacy very seriously. All data is encrypted, stored securely, and handled in compliance with global privacy standards. We implement strict security measures to protect your information."
    }
  ];

  const toggleQuestion = (id) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="container py-5">
      <div className={styles.helpCenterHeader}>
        <h1>Frequently Asked</h1>
        <h1 className={styles.questionsText}>Questions</h1>
        <p className="text-muted mt-4">Still have a questions in mind?</p>
        <button className={`${styles.contactButton} mt-3`}>
          Contact Us
        </button>
      </div>

      <div className={styles.faqContainer}>
        {faqData.map((faq) => (
          <div 
            key={faq.id} 
            className={`${styles.faqItem} ${openQuestion === faq.id ? styles.active : ''}`}
            onClick={() => toggleQuestion(faq.id)}
          >
            <div className={styles.faqHeader}>
              <h3>{faq.question}</h3>
              <span className={styles.toggleIcon}>
                {openQuestion === faq.id ? '−' : '+'}
              </span>
            </div>
            <div className={`${styles.faqAnswer} ${openQuestion === faq.id ? styles.show : ''}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 