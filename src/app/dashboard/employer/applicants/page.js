"use client";
import React, { useState } from "react";
import styles from "./Posted-jobs.module.css";
import { FiSearch, FiPlus, FiEdit2, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown, FiPhone } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

const initialApplications = [
  {
    id: "01",
    name: "Vamsi",
    position: "Senior Frontend Developer",
    date: "2024-03-15",
    status: "Pending",
    level: "Junior"
  },
  {
    id: "02",
    name: "Sukumar",
    position: "UI/UX Designer",
    date: "2024-02-15",
    status: "Pending",
    level: "Mid"
  },
  {
    id: "03",
    name: "Kiran",
    position: "Backend Developer",
    date: "2024-01-15",
    status: "Rejected",
    level: "Junior"
  },
  {
    id: "04",
    name: "Hema",
    position: "Software Engineer",
    date: "2024-01-25",
    status: "Shortlisted",
    level: "Senior"
  },
  {
    id: "05",
    name: "Kavya",
    position: "Full Stack Developer",
    date: "2024-02-10",
    status: "Pending",
    level: "Senior"
  },
  {
    id: "06",
    name: "Sai",
    position: "React Developer",
    date: "2024-03-18",
    status: "Shortlisted",
    level: "Mid"
  },
];

export default function PostedJobsPage() {
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5;

  // Filter jobs based on search and filters
  const filteredApplications = applications.filter(application => {
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || application.status === statusFilter;
    const matchesLevel = levelFilter === "All" || application.level === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  // Pagination logic
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleLevelFilter = (level) => {
    setLevelFilter(level);
    setCurrentPage(1);
  };

  return (
    <div className={`container-fluid min-vh-100 bg-transparent ${styles.wrapper}`}>
      <div className="row justify-content-center pt-2">
        <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold">Received Applications</h4>
            <button className={`btn btn-primary d-flex align-items-center gap-2 ${styles["btn-modern"]}`}>
              <FiPlus size={18} /> Post New Job
            </button>
          </div>

          {/* Filters and Search */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3">
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <FiSearch className="text-muted" />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <span>
                        <BiFilterAlt className="me-2" />
                        {statusFilter === "All" ? "Status" : statusFilter}
                      </span>
                      <FiChevronDown className="text-muted" />
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("All")}>All Status</button></li>
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("Shortlisted")}>Shortlisted</button></li>
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("Pending")}>Pending</button></li>
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("Rejected")}>Rejected</button></li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-secondary w-100 d-flex justify-content-between align-items-center"
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <span>
                        <BiFilterAlt className="me-2" />
                        {levelFilter === "All" ? "Level" : levelFilter}
                      </span>
                      <FiChevronDown className="text-muted" />
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li><button className="dropdown-item" onClick={() => handleLevelFilter("All")}>All Levels</button></li>
                      <li><button className="dropdown-item" onClick={() => handleLevelFilter("Junior")}>Junior</button></li>
                      <li><button className="dropdown-item" onClick={() => handleLevelFilter("Mid")}>Mid</button></li>
                      <li><button className="dropdown-item" onClick={() => handleLevelFilter("Senior")}>Senior</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs Table */}
          <div className="card border-0 shadow-sm">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Candidates</th>
                    <th>Level</th>
                    <th>Positions</th>
                    <th>Applied date</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentApplications.length > 0 ? (
                    currentApplications.map((app) => (
                      <tr key={app.id}>
                        <td className="ps-4 fw-semibold">{app.id}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">{app.name}</span>
                            <small className="text-muted">#{app.id}</small>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            app.level === "Junior" ? "bg-info" :
                            app.level === "Mid" ? "bg-primary" : "bg-warning"
                          }`}>
                            {app.level}
                          </span>
                        </td>
                        <td>
                          <span>
                            {app.position}
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">{app.date}</span>
                        </td>
                        <td>
                          <span className={`badge rounded-pill ${
                            app.status === "Shortlisted" 
                              ? "bg-success bg-opacity-10 text-success" 
                              : app.status === "Pending"
                                ? "bg-warning bg-opacity-10 text-warning"
                                : "bg-danger bg-opacity-10 text-danger"
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end gap-2">
                            <button 
                              className={`btn btn-sm btn-outline-secondary d-flex align-items-center ${styles["btn-modern"]}`}
                              title="Call"
                            >
                              <FiPhone size={16} />
                            </button>
                            <button 
                              className={`btn btn-sm btn-primary d-flex align-items-center ${styles["btn-modern"]}`}
                              title="View"
                            >
                              <FiEye size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No applications found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredApplications.length > applicationsPerPage && (
              <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center py-3">
                <small className="text-muted">
                  Showing {indexOfFirstApplication + 1}-{Math.min(indexOfLastApplication, filteredApplications.length)} of {filteredApplications.length} applications
                </small>
                <nav>
                  <ul className="pagination mb-0">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      >
                        <FiChevronLeft />
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      >
                        <FiChevronRight />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}