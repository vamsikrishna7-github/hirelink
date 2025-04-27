import './globals.css';
import Link from 'next/link';

export default function EmployerLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link href="/dashboard/employer" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/employer/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/employer/applications" className="nav-link">
                  Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/dashboard/employer/candidates" className="nav-link">
                  Candidates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {children}
        </main>
      </div>
    </div>
  );
}