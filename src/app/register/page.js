"use client";

import { useState } from 'react';
import Link from 'next/link';
import { FaBuilding, FaHandshake, FaUserTie } from 'react-icons/fa';

export default function Register() {
  const [selectedType, setSelectedType] = useState('');

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold">Create Your Account</h1>
              <p className="lead text-muted">Choose your account type to get started</p>
            </div>

            <div className="row g-4">
              {/* Employer Card */}
              <div className="col-md-4">
                <div 
                  className={`card h-100 cursor-pointer ${selectedType === 'employer' ? 'border-primary' : ''}`}
                  onClick={() => setSelectedType('employer')}
                >
                  <div className="card-body text-center p-4">
                    <div className="icon-container mb-3">
                      <FaBuilding size={40} className="text-primary" />
                    </div>
                    <h3 className="h4">Employer</h3>
                    <p className="text-muted">Post jobs and find candidates</p>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Post unlimited jobs</li>
                      <li className="mb-2">✓ Access CV database</li>
                      <li className="mb-2">✓ Manage applications</li>
                    </ul>
                    <Link 
                      href="/register/employer" 
                      className={`btn ${selectedType === 'employer' ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                    >
                      Continue as Employer
                    </Link>
                  </div>
                </div>
              </div>

              {/* Consultancy Card */}
              <div className="col-md-4">
                <div 
                  className={`card h-100 cursor-pointer ${selectedType === 'consultancy' ? 'border-primary' : ''}`}
                  onClick={() => setSelectedType('consultancy')}
                >
                  <div className="card-body text-center p-4">
                    <div className="icon-container mb-3">
                      <FaHandshake size={40} className="text-primary" />
                    </div>
                    <h3 className="h4">Consultancy</h3>
                    <p className="text-muted">Bid on jobs and find clients</p>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Bid on projects</li>
                      <li className="mb-2">✓ Manage candidates</li>
                      <li className="mb-2">✓ Track progress</li>
                    </ul>
                    <Link 
                      href="/register/consultancy" 
                      className={`btn ${selectedType === 'consultancy' ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                    >
                      Continue as Consultancy
                    </Link>
                  </div>
                </div>
              </div>

              {/* Candidate Card */}
              <div className="col-md-4">
                <div 
                  className={`card h-100 cursor-pointer ${selectedType === 'candidate' ? 'border-primary' : ''}`}
                  onClick={() => setSelectedType('candidate')}
                >
                  <div className="card-body text-center p-4">
                    <div className="icon-container mb-3">
                      <FaUserTie size={40} className="text-primary" />
                    </div>
                    <h3 className="h4">Candidate</h3>
                    <p className="text-muted">Find jobs and get hired</p>
                    <ul className="list-unstyled text-start">
                      <li className="mb-2">✓ Browse jobs</li>
                      <li className="mb-2">✓ Upload CV</li>
                      <li className="mb-2">✓ Track applications</li>
                    </ul>
                    <Link 
                      href="/register/candidate" 
                      className={`btn ${selectedType === 'candidate' ? 'btn-primary' : 'btn-outline-primary'} w-100`}
                    >
                      Continue as Candidate
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="mb-0">
                Already have an account? <Link href="/login" className="text-primary">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 