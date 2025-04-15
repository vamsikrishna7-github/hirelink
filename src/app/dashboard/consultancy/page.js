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
  FaFilter,
  FaHandshake,
  FaFileAlt
} from 'react-icons/fa';

export default function ConsultancyDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="dashboard-page">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold">HireLink</Link>
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
                <li><Link className="dropdown-item" href="/logout">Logout</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

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
                    className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                  >
                    <FaBriefcase className="me-2" />
                    Projects
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
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'clients' ? 'active' : ''}`}
                    onClick={() => setActiveTab('clients')}
                  >
                    <FaHandshake className="me-2" />
                    Clients
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
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Active Projects</h5>
                        <h2 className="card-text">8</h2>
                        <p className="text-success">+2 from last month</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Active Candidates</h5>
                        <h2 className="card-text">45</h2>
                        <p className="text-success">+10% from last month</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Active Clients</h5>
                        <h2 className="card-text">12</h2>
                        <p className="text-success">+3 from last quarter</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Revenue</h5>
                        <h2 className="card-text">$45K</h2>
                        <p className="text-success">+15% from last month</p>
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
                      <li className="list-group-item">New project request from TechCorp</li>
                      <li className="list-group-item">Candidate John Doe completed technical assessment</li>
                      <li className="list-group-item">New client onboarding scheduled for tomorrow</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Projects</h1>
                  <button className="btn btn-primary">
                    <FaPlus className="me-2" />
                    New Project
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                      <input type="text" className="form-control" placeholder="Search projects..." />
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
                        <option>Completed</option>
                        <option>On Hold</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Projects List */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Project Name</th>
                        <th>Client</th>
                        <th>Start Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Tech Team Expansion</td>
                        <td>TechCorp</td>
                        <td>2024-03-01</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-secondary">Edit</button>
                        </td>
                      </tr>
                      <tr>
                        <td>HR System Implementation</td>
                        <td>Global Inc</td>
                        <td>2024-02-15</td>
                        <td><span className="badge bg-warning">In Progress</span></td>
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
                  <button className="btn btn-primary">
                    <FaPlus className="me-2" />
                    Add Candidate
                  </button>
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
                        <option>All Status</option>
                        <option>Available</option>
                        <option>Placed</option>
                        <option>In Process</option>
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
                        <th>Skills</th>
                        <th>Status</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>React, Node.js, AWS</td>
                        <td><span className="badge bg-success">Available</span></td>
                        <td>2024-03-16</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-success">Assign to Project</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>Python, Data Science, ML</td>
                        <td><span className="badge bg-info">In Process</span></td>
                        <td>2024-03-14</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-success">Assign to Project</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Clients</h1>
                  <button className="btn btn-primary">
                    <FaPlus className="me-2" />
                    Add Client
                  </button>
                </div>

                {/* Search and Filter */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                      <input type="text" className="form-control" placeholder="Search clients..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaFilter />
                      </span>
                      <select className="form-select">
                        <option>All Clients</option>
                        <option>Active</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Clients List */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Company Name</th>
                        <th>Contact Person</th>
                        <th>Projects</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>TechCorp</td>
                        <td>Sarah Johnson</td>
                        <td>3 Active</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-secondary">Edit</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Global Inc</td>
                        <td>Michael Brown</td>
                        <td>2 Active</td>
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
          </main>
        </div>
      </div>
    </div>
  );
} 