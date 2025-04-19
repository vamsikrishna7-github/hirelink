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
  FaFileAlt,
  FaGraduationCap
} from 'react-icons/fa';
import LogoutButton from '@/app/components/LogoutButton';

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container-fluid">
          <Link href="/dashboard/candidate" className="navbar-brand fw-bold">Candidate Dashboard</Link>
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
                      className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
                      onClick={() => setActiveTab('applications')}
                    >
                      <FaFileAlt className="me-2" />
                      Applications
                    </button>
                  </li>
                  <li className="nav-item">
                    <button 
                      className={`nav-link ${activeTab === 'skills' ? 'active' : ''}`}
                      onClick={() => setActiveTab('skills')}
                    >
                      <FaGraduationCap className="me-2" />
                      Skills
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
                          <h5 className="card-title">Active Applications</h5>
                          <h2 className="card-text">5</h2>
                          <p className="text-success">+2 this week</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Interviews</h5>
                          <h2 className="card-text">3</h2>
                          <p className="text-success">+1 scheduled</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Skills</h5>
                          <h2 className="card-text">12</h2>
                          <p className="text-success">+3 this month</p>
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
                        <li className="list-group-item">Interview scheduled with TechCorp for tomorrow</li>
                        <li className="list-group-item">Application submitted for Senior Developer position</li>
                        <li className="list-group-item">New skill added: React Native</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Jobs Tab */}
              {activeTab === 'jobs' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">Available Jobs</h1>
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
                          <option>All Categories</option>
                          <option>Full-time</option>
                          <option>Part-time</option>
                          <option>Remote</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Jobs List */}
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Company</th>
                          <th>Location</th>
                          <th>Posted</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Senior Frontend Developer</td>
                          <td>TechCorp</td>
                          <td>Remote</td>
                          <td>2 days ago</td>
                          <td>
                            <button className="btn btn-sm btn-primary">Apply</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Product Manager</td>
                          <td>Global Inc</td>
                          <td>New York</td>
                          <td>1 week ago</td>
                          <td>
                            <button className="btn btn-sm btn-primary">Apply</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Applications Tab */}
              {activeTab === 'applications' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">My Applications</h1>
                  </div>

                  {/* Applications List */}
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>Position</th>
                          <th>Company</th>
                          <th>Status</th>
                          <th>Applied Date</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Senior Frontend Developer</td>
                          <td>TechCorp</td>
                          <td><span className="badge bg-warning">In Review</span></td>
                          <td>2024-03-15</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">View</button>
                          </td>
                        </tr>
                        <tr>
                          <td>Product Manager</td>
                          <td>Global Inc</td>
                          <td><span className="badge bg-success">Interview Scheduled</span></td>
                          <td>2024-03-10</td>
                          <td>
                            <button className="btn btn-sm btn-outline-primary">View</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div>
                  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
                    <h1 className="h2">My Skills</h1>
                    <button className="btn btn-primary">
                      <FaPlus className="me-2" />
                      Add Skill
                    </button>
                  </div>

                  {/* Skills Grid */}
                  <div className="row">
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">React</h5>
                          <div className="progress mb-2">
                            <div className="progress-bar" role="progressbar" style={{width: '90%'}}>90%</div>
                          </div>
                          <p className="card-text">Advanced</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Node.js</h5>
                          <div className="progress mb-2">
                            <div className="progress-bar" role="progressbar" style={{width: '80%'}}>80%</div>
                          </div>
                          <p className="card-text">Advanced</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Python</h5>
                          <div className="progress mb-2">
                            <div className="progress-bar" role="progressbar" style={{width: '70%'}}>70%</div>
                          </div>
                          <p className="card-text">Intermediate</p>
                        </div>
                      </div>
                    </div>
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