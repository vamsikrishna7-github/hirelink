"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FaBriefcase, 
  FaUser, 
  FaChartLine, 
  FaBell, 
  FaUserCircle,
  FaSearch,
  FaFilter,
  FaFileAlt,
  FaBookmark,
  FaEnvelope
} from 'react-icons/fa';

export default function CandidateDashboard() {
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
                    className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
                    onClick={() => setActiveTab('applications')}
                  >
                    <FaBriefcase className="me-2" />
                    Applications
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <FaUser className="me-2" />
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button 
                    className={`nav-link ${activeTab === 'saved' ? 'active' : ''}`}
                    onClick={() => setActiveTab('saved')}
                  >
                    <FaBookmark className="me-2" />
                    Saved Jobs
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
                        <h5 className="card-title">Active Applications</h5>
                        <h2 className="card-text">5</h2>
                        <p className="text-success">+2 from last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Interviews</h5>
                        <h2 className="card-text">3</h2>
                        <p className="text-success">+1 scheduled</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Profile Views</h5>
                        <h2 className="card-text">24</h2>
                        <p className="text-success">+5 from last week</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 mb-4">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">Saved Jobs</h5>
                        <h2 className="card-text">8</h2>
                        <p className="text-success">+3 new opportunities</p>
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
                      <li className="list-group-item">Interview scheduled with TechCorp for Senior Developer position</li>
                      <li className="list-group-item">Application submitted for Product Manager role at Global Inc</li>
                      <li className="list-group-item">Profile viewed by 3 recruiters</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Job Applications</h1>
                </div>

                {/* Search and Filter */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                      <input type="text" className="form-control" placeholder="Search applications..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaFilter />
                      </span>
                      <select className="form-select">
                        <option>All Status</option>
                        <option>Applied</option>
                        <option>Interview</option>
                        <option>Offered</option>
                        <option>Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Applications List */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Applied Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Senior Frontend Developer</td>
                        <td>TechCorp</td>
                        <td>2024-03-15</td>
                        <td><span className="badge bg-warning">Interview Scheduled</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-success">Schedule Interview</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Product Manager</td>
                        <td>Global Inc</td>
                        <td>2024-03-10</td>
                        <td><span className="badge bg-info">Under Review</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-secondary">Withdraw</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Profile Management</h1>
                  <button className="btn btn-primary">
                    <FaFileAlt className="me-2" />
                    Update Profile
                  </button>
                </div>

                {/* Profile Sections */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Personal Information</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Full Name</label>
                          <input type="text" className="form-control" value="John Doe" readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" value="john.doe@example.com" readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Phone</label>
                          <input type="tel" className="form-control" value="+1 234 567 8900" readOnly />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6 mb-4">
                    <div className="card">
                      <div className="card-header">
                        <h5 className="mb-0">Professional Information</h5>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label">Current Position</label>
                          <input type="text" className="form-control" value="Senior Frontend Developer" readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Experience</label>
                          <input type="text" className="form-control" value="5 years" readOnly />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Skills</label>
                          <input type="text" className="form-control" value="React, Node.js, TypeScript, AWS" readOnly />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Documents Section */}
                <div className="card mb-4">
                  <div className="card-header">
                    <h5 className="mb-0">Documents</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <FaFileAlt className="me-2" />
                        <span>Resume.pdf</span>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">Update</button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <FaFileAlt className="me-2" />
                        <span>Cover Letter.pdf</span>
                      </div>
                      <button className="btn btn-sm btn-outline-primary">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && (
              <div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                  <h1 className="h2">Saved Jobs</h1>
                </div>

                {/* Search and Filter */}
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaSearch />
                      </span>
                      <input type="text" className="form-control" placeholder="Search saved jobs..." />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaFilter />
                      </span>
                      <select className="form-select">
                        <option>All Jobs</option>
                        <option>Recently Added</option>
                        <option>Expiring Soon</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Saved Jobs List */}
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Location</th>
                        <th>Posted Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Full Stack Developer</td>
                        <td>TechStart</td>
                        <td>Remote</td>
                        <td>2024-03-14</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-success">Apply</button>
                        </td>
                      </tr>
                      <tr>
                        <td>UI/UX Designer</td>
                        <td>DesignCo</td>
                        <td>New York</td>
                        <td>2024-03-12</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-2">View</button>
                          <button className="btn btn-sm btn-outline-success">Apply</button>
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