"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaGraduationCap, FaBriefcase, FaFileUpload } from 'react-icons/fa';

export default function CandidateRegister() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    education: '',
    experience: '',
    skills: [],
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Candidate registration:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      skills: checked
        ? [...prev.skills, value]
        : prev.skills.filter(skill => skill !== value)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      resume: file
    }));
  };

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <h1 className="h3 fw-bold">Candidate Registration</h1>
                  <p className="text-muted">Create your candidate account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Personal Information */}
                  <div className="mb-4">
                    <h4 className="mb-3">Personal Information</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaEnvelope />
                          </span>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaPhone />
                          </span>
                          <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Information */}
                  <div className="mb-4">
                    <h4 className="mb-3">Professional Information</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="education" className="form-label">Highest Education</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaGraduationCap />
                          </span>
                          <select
                            className="form-select"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Education Level</option>
                            <option value="high_school">High School</option>
                            <option value="bachelors">Bachelor&apos;s Degree</option>
                            <option value="masters">Master&apos;s Degree</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="experience" className="form-label">Years of Experience</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaBriefcase />
                          </span>
                          <select
                            className="form-select"
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select Experience</option>
                            <option value="0">No Experience</option>
                            <option value="1-2">1-2 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="6-10">6-10 years</option>
                            <option value="10+">10+ years</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <h4 className="mb-3">Skills</h4>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="javascript"
                            value="javascript"
                            checked={formData.skills.includes('javascript')}
                            onChange={handleSkillChange}
                          />
                          <label className="form-check-label" htmlFor="javascript">
                            JavaScript
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="react"
                            value="react"
                            checked={formData.skills.includes('react')}
                            onChange={handleSkillChange}
                          />
                          <label className="form-check-label" htmlFor="react">
                            React
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="node"
                            value="node"
                            checked={formData.skills.includes('node')}
                            onChange={handleSkillChange}
                          />
                          <label className="form-check-label" htmlFor="node">
                            Node.js
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="python"
                            value="python"
                            checked={formData.skills.includes('python')}
                            onChange={handleSkillChange}
                          />
                          <label className="form-check-label" htmlFor="python">
                            Python
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Resume Upload */}
                  <div className="mb-4">
                    <h4 className="mb-3">Resume</h4>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaFileUpload />
                          </span>
                          <input
                            type="file"
                            className="form-control"
                            id="resume"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            required
                          />
                        </div>
                        <small className="text-muted">Accepted formats: PDF, DOC, DOCX</small>
                      </div>
                    </div>
                  </div>

                  {/* Account Security */}
                  <div className="mb-4">
                    <h4 className="mb-3">Account Security</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaLock />
                          </span>
                          <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary">
                      Create Account
                    </button>
                    <Link href="/register" className="btn btn-outline-secondary">
                      Back to Registration Options
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 