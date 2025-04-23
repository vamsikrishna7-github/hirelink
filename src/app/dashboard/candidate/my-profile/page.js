'use client';
import styles from './Profile.module.css';
import { useState } from 'react';
import Image from 'next/image';

export default function Profile() {
  const [skills, setSkills] = useState(['Figma', 'Penpot', 'Wire Frames', 'UI Testing']);
  
  const profileData = {
    name: 'Yeddala Sukumar',
    location: 'Chennai',
    roles: ['UI Designer', 'Front End Developer', 'jr. Penetration Tester', 'Security Analyst'],
    about: `I'm a UI/UX Designer, Front-End Developer, and Security Analyst, blending creativity, technical expertise, and cybersecurity knowledge to craft high-quality digital experiences. My skills in UI/UX design enable me to create visually appealing, user-friendly interfaces that enhance engagement and accessibility. As a front-end developer, I specialize in building responsive and interactive web applications using modern technologies like HTML, CSS, JavaScript, and frameworks to ensure seamless performance across devices. Additionally, I'm proficiency in security analysis allows me to assess vulnerabilities, implement secure coding practices, and conduct penetration testing to safeguard applications from potential cyber threats.With a strong foundation in both design and development.`,
    experience: [
      {
        company: 'Mc Donalads',
        role: 'UI Designer',
        period: '20/09/2024 - Present',
        logo: 'https://w7.pngwing.com/pngs/873/995/png-transparent-mcdonald-s-logo-oldest-mcdonald-s-restaurant-ronald-mcdonald-logo-golden-arches-mcdonalds-miscellaneous-angle-food-thumbnail.png'
      }
    ],
    education: [
      {
        institution: 'Sree Vidyaniketan College',
        degree: 'Cyber Security',
        type: 'Btech / B.com',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpECSc-LbOLOpfLrqWHm5bSdkAjzBVQT2PQ&s'
      }
    ]
  };

  return (
    <div className="container pb-5">
      {/* Profile Header */}
      <div className={`${styles.profileHeader} position-relative mb-5`}>
        <div className={styles.coverImage}></div>
        <div className={styles.profileImageWrapper}>
          <div className={styles.profileImage}>
            <Image src="/My_profile.webp" alt="Profile" className="rounded-circle" width={100} height={100} />
          </div>
        </div>
        <div className={`${styles.profileInfo} text-center`}>
          <h1 className="h2 mb-2">{profileData.name}</h1>
          <div className="text-muted mb-2">
            {profileData.roles.join(' | ')}
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <i className="bi bi-geo-alt me-2"></i>
            <span>{profileData.location}</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="bg-white rounded-4 p-4 mb-4">
        <h2 className="h4 mb-3">About</h2>
        <p className={styles.aboutText}>{profileData.about}</p>
      </div>

      {/* Experience and Education Row */}
      <div className="row g-4 mb-4">
        {/* Experience Section */}
        <div className="col-md-6">
          <div className="bg-white rounded-4 p-4 h-100">
            <h2 className="h4 mb-3">Experience</h2>
            {profileData.experience.map((exp, index) => (
              <div key={index} className="d-flex mb-3">
                <div className={styles.companyLogo}>
                  <Image src={exp.logo} alt={exp.company} width={50} height={50} />
                </div>
                <div className="ms-3">
                  <h3 className="h5 mb-1">{exp.role}</h3>
                  <div className="text-muted">{exp.company}</div>
                  <div className="text-muted small">{exp.period}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="col-md-6">
          <div className="bg-white rounded-4 p-4 h-100">
            <h2 className="h4 mb-3">Qualification</h2>
            {profileData.education.map((edu, index) => (
              <div key={index} className="d-flex mb-3">
                <div className={styles.institutionLogo}>
                  <Image src={edu.logo} alt={edu.institution} width={50} height={50} />
                </div>
                <div className="ms-3">
                  <h3 className="h5 mb-1">{edu.degree}</h3>
                  <div className="text-muted">{edu.institution}</div>
                  <div className="text-muted small">{edu.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 mb-0">Skills</h2>
          <button className={styles.addSkillButton}>+ Add Skills</button>
        </div>
        <div className={styles.skillsContainer}>
          {skills.map((skill, index) => (
            <span key={index} className={styles.skillBadge}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Floating Edit Button */}
      <button className={styles.floatingEditButton}>
        <span>Edit</span>
        <i className="bi bi-pencil-square ms-2"></i>
      </button>
    </div>
  );
} 