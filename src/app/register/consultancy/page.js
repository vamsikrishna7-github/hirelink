"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBuilding, FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

export default function ConsultancyRegister() {
  const [formData, setFormData] = useState({
    consultancyName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    specialization: '',
    yearsOfExperience: '',
    services: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Consultancy registration:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
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
                  <h1 className="h3 fw-bold">Consultancy Registration</h1>
                  <p className="text-muted">Create your consultancy account</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Consultancy Information */}
                  <div className="mb-4">
                    <h4 className="mb-3">Consultancy Information</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="consultancyName" className="form-label">Consultancy Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaBuilding />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="consultancyName"
                            name="consultancyName"
                            value={formData.consultancyName}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="specialization" className="form-label">Specialization</label>
                        <select
                          className="form-select"
                          id="specialization"
                          name="specialization"
                          value={formData.specialization}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Specialization</option>
                          <option value="it">IT Consulting</option>
                          <option value="management">Management Consulting</option>
                          <option value="hr">HR Consulting</option>
                          <option value="finance">Financial Consulting</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="yearsOfExperience" className="form-label">Years of Experience</label>
                        <select
                          className="form-select"
                          id="yearsOfExperience"
                          name="yearsOfExperience"
                          value={formData.yearsOfExperience}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Experience</option>
                          <option value="1-3">1-3 years</option>
                          <option value="4-7">4-7 years</option>
                          <option value="8-15">8-15 years</option>
                          <option value="15+">15+ years</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Office Address</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaMapMarkerAlt />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="mb-4">
                    <h4 className="mb-3">Services Offered</h4>
                    <div className="row g-3">
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="recruitment"
                            value="recruitment"
                            checked={formData.services.includes('recruitment')}
                            onChange={handleServiceChange}
                          />
                          <label className="form-check-label" htmlFor="recruitment">
                            Recruitment Services
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="training"
                            value="training"
                            checked={formData.services.includes('training')}
                            onChange={handleServiceChange}
                          />
                          <label className="form-check-label" htmlFor="training">
                            Training & Development
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="outsourcing"
                            value="outsourcing"
                            checked={formData.services.includes('outsourcing')}
                            onChange={handleServiceChange}
                          />
                          <label className="form-check-label" htmlFor="outsourcing">
                            Staff Outsourcing
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="consulting"
                            value="consulting"
                            checked={formData.services.includes('consulting')}
                            onChange={handleServiceChange}
                          />
                          <label className="form-check-label" htmlFor="consulting">
                            HR Consulting
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="mb-4">
                    <h4 className="mb-3">Contact Information</h4>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="fullName" className="form-label">Full Name</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <FaUser />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
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