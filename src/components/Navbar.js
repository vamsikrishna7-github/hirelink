"use client";

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavLinkClick = () => {
    setIsOpen(false);
  };



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-fixed w-100 z-3 top-0">
      <div className="container">
        <Link className="navbar-brand" href="/">
          HireLink
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          {isOpen ? (
            <FaTimes size={24} className="text-primary" />
          ) : (
            <FaBars size={24} className="text-primary" />
          )}
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" href="/jobs" onClick={handleNavLinkClick}>
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/consultancies" onClick={handleNavLinkClick}>
                Consultancies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/cv-database" onClick={handleNavLinkClick}>
                CV Database
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/about" onClick={handleNavLinkClick}>
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <Link href="/login" className="btn btn-outline-primary me-2" onClick={handleNavLinkClick}>
              Login
            </Link>
            <Link href="/register" className="btn btn-primary" onClick={handleNavLinkClick}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 