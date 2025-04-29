"use client";
import React, { useState } from "react";
import styles from "./Posted-jobs.module.css";
import { FiSearch, FiPlus, FiEdit2, FiEye, FiChevronLeft, FiChevronRight, FiChevronDown } from "react-icons/fi";
import { BiFilterAlt } from "react-icons/bi";

const initialJobs = [
  {
    id: "01",
    title: "Senior Frontend Developer",
    applications: 24,
    date: "2024-03-15",
    status: "Active",
    level: "Senior"
  },
  {
    id: "02",
    title: "Product Designer",
    applications: 10,
    date: "2024-03-10",
    status: "Active",
    level: "Mid"
  },
  {
    id: "03",
    title: "Product Manager",
    applications: 40,
    date: "2024-02-28",
    status: "Inactive",
    level: "Senior"
  },
  {
    id: "04",
    title: "Python Developer",
    applications: 50,
    date: "2024-03-05",
    status: "Active",
    level: "Mid"
  },
  {
    id: "05",
    title: "Java Developer",
    applications: 11,
    date: "2024-03-12",
    status: "Active",
    level: "Junior"
  },
  {
    id: "06",
    title: "React Developer",
    applications: 13,
    date: "2024-03-18",
    status: "Active",
    level: "Mid"
  },
];

export default function PostedJobsPage() {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    const matchesLevel = levelFilter === "All" || job.level === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleLevelFilter = (level) => {
    setLevelFilter(level);
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`container-fluid min-vh-100 bg-transparent ${styles.wrapper}`}>
      <div className="row justify-content-center pt-2">
        <div className="p-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0 fw-bold">Posted Jobs</h4>
            <button className={`btn btn-primary d-flex align-items-center gap-2 ${styles["btn-modern"]}`}>
              <FiPlus size={18} /> Post New Job
            </button>
          </div>

          {/* Filters and Search */}
          <div className={`${styles.card} card border-0 shadow-sm mb-4`}>
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
                      placeholder="Search jobs..."
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
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("Active")}>Active</button></li>
                      <li><button className="dropdown-item" onClick={() => handleStatusFilter("Inactive")}>Inactive</button></li>
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
          <div className={`${styles.card} card border-0 shadow-sm bg-transparent border-0`}>
            <div className="table-responsive border-0 bg-transparent">
              <table className={`${styles.table} table table-hover mb-0 bg-transparent table-striped`}>
                <thead className="bg-transparent fw-bold">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Job Title</th>
                    <th>Level</th>
                    <th>Applications</th>
                    <th>Posted Date</th>
                    <th>Status</th>
                    <th className="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentJobs.length > 0 ? (
                    currentJobs.map((job) => (
                      <tr key={job.id}>
                        <td className="ps-4 fw-semibold">{job.id}</td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-semibold">{job.title}</span>
                            <small className="text-muted">#{job.id}</small>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            job.level === "Junior" ? "bg-info" :
                            job.level === "Mid" ? "bg-primary" : "bg-warning"
                          }`}>
                            {job.level}
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">{job.applications}</span>
                        </td>
                        <td>{formatDate(job.date)}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            job.status === "Active" 
                              ? "bg-success bg-opacity-10 text-success" 
                              : "bg-danger bg-opacity-10 text-danger"
                          }`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="text-end pe-4">
                          <div className="d-flex justify-content-end gap-2">
                            <button 
                              className={`btn btn-sm btn-outline-secondary d-flex align-items-center ${styles["btn-modern"]}`}
                              title="Edit"
                            >
                              <FiEdit2 size={16} />
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
                        No jobs found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredJobs.length > jobsPerPage && (
              <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center py-3">
                <small className="text-muted">
                  Showing {indexOfFirstJob + 1}-{Math.min(indexOfLastJob, filteredJobs.length)} of {filteredJobs.length} jobs
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