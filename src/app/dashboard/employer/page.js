"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaBriefcase, 
  FaUsers, 
  FaChartLine, 
  FaBell, 
  FaUserCircle,
  FaPlus,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import LogoutButton from '@/app/components/LogoutButton';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link href="/dashboard/employer" className="navbar-brand fw-bold">Employer Dashboard</Link>
          <div className="d-flex align-items-center">
            <button className="btn btn-link me-3">
              <FaBell size={20} />
            </button>
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
                <FaUserCircle size={24} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="dropdown-item" href="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" href="/settings">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <LogoutButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-page">
        <div className="container-fluid">
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
              <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      <FaChartLine className="me-2" />
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'jobs' ? 'active' : ''}`}
                      onClick={() => setActiveTab('jobs')}
                    >
                      <FaBriefcase className="me-2" />
                      Jobs
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'candidates' ? 'active' : ''}`}
                      onClick={() => setActiveTab('candidates')}
                    >
                      <FaUsers className="me-2" />
                      Candidates
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-4">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Dashboard Overview</h1>
                  </div>

                  {/* Stats Cards */}
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Active Jobs</h5>
                          <h2 className="card-text">12</h2>
                          <p className="text-success">+2 from last month</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Applications</h5>
                          <h2 className="card-text">156</h2>
                          <p className="text-success">+15% from last month</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Shortlisted</h5>
                          <h2 className="card-text">24</h2>
                          <p className="text-success">+5 from last week</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="card mt-4">
                    <div className="card-header">
                      <h5 className="mb-0">Recent Activity</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">New application received for Senior Developer position</li>
                        <li className="list-group-item">Candidate John Doe scheduled interview for tomorrow</li>
                        <li className="list-group-item">New job posting &quot;Product Manager&quot; published</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Jobs Tab */}
              {activeTab === 'jobs' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Job Postings</h1>
                    <button className="btn btn-primary">
                      <FaPlus className="me-2" />
                      Post New Job
                    </button>
                  </div>

                  {/* Search and Filter */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaSearch />
                        </span>
                        <input type="text" className="form-control" placeholder="Search jobs..." />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaFilter />
                        </span>
                        <select className="form-select">
                          <option>All Status</option>
                          <option>Active</option>
                          <option>Closed</option>
                          <option>Draft</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Jobs List */}
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Job Title</th>
                          <th>Applications</th>
                          <th>Posted Date</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Senior Frontend Developer</td>
                          <td>24</td>
                          <td>2024-03-15</td>
                          <td><span className="badge bg-success">Active</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">View</button>
                            <button className="btn btn-sm btn-outline-secondary">Edit</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Product Manager</td>
                          <td>18</td>
                          <td>2024-03-10</td>
                          <td><span className="badge bg-success">Active</span></td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">View</button>
                            <button className="btn btn-sm btn-outline-secondary">Edit</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Candidates Tab */}
              {activeTab === 'candidates' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Candidates</h1>
                  </div>

                  {/* Search and Filter */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaSearch />
                        </span>
                        <input type="text" className="form-control" placeholder="Search candidates..." />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <span className="input-group-text">
                          <FaFilter />
                        </span>
                        <select className="form-select">
                          <option>All Candidates</option>
                          <option>Shortlisted</option>
                          <option>Interviewed</option>
                          <option>Rejected</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Candidates List */}
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Position</th>
                          <th>Status</th>
                          <th>Applied Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>John Doe</td>
                          <td>Senior Frontend Developer</td>
                          <td><span className="badge bg-warning">Interview Scheduled</span></td>
                          <td>2024-03-16</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">View</button>
                            <button className="btn btn-sm btn-outline-success">Schedule Interview</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Jane Smith</td>
                          <td>Product Manager</td>
                          <td><span className="badge bg-info">Shortlisted</span></td>
                          <td>2024-03-14</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">View</button>
                            <button className="btn btn-sm btn-outline-success">Schedule Interview</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
} 