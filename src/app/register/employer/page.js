"use client";

import RegistrationForm from '@/components/RegistrationForm';

export default function EmployerRegister() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Employer Registration</h2>
              <RegistrationForm userType="employer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 