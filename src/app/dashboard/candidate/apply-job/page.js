import styles from './Apply-job.module.css';
import Image from 'next/image';
import { FiBookmark } from 'react-icons/fi';

export default function ApplyJobPage() {
  return (
    <div className={`container py-5 ${styles.applyJobBg}`}>
      {/* Job Card */}
      <div className={`card mb-4 shadow-sm border-0 rounded-4 ${styles.jobCard}`}>
        <div className="row g-0 align-items-center p-4">
          <div className="col-md-2 d-flex justify-content-center align-items-center">
            <div className="bg-light rounded-3 d-flex justify-content-center align-items-center" style={{width: 70, height: 70}}>
              <Image src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Company Logo" width={50} height={50} />
            </div>
          </div>
          <div className="col-md-7">
            <h5 className="mb-1 fw-bold">UI/UX Designer</h5>
            <div className="text-muted mb-2">Microsoft</div>
            <div className="d-flex flex-wrap gap-3 align-items-center small text-secondary">
              <span><i className="bi bi-geo-alt me-1"></i>Chennai</span>
              <span><i className="bi bi-briefcase me-1"></i>0-1 Years</span>
              <span><i className="bi bi-calendar me-1"></i>Posted 3 Days ago</span>
              <span><i className="bi bi-people me-1"></i>130 Applicants Applied</span>
            </div>
          </div>
          <div className={`${styles.buttonContainer} col-md-3 d-flex flex-column align-items-end gap-2`}>
            <button className="btn btn-primary px-4 mb-2">Apply Now</button>
            <button className="btn btn-outline-secondary px-4"> <FiBookmark /> Save</button>
          </div>
        </div>
      </div>

      {/* Requirements & About Job */}
      <div className={`card p-4 mb-4 border-0 rounded-4 ${styles.sectionCard}`}>
        <h5 className="fw-bold mb-3">Requirements</h5>
        <p className="text-secondary mb-0" style={{textAlign: 'justify'}}>
          Posted 3 Days ago...nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
      <div className={`card p-4 border-0 rounded-4 ${styles.sectionCard}`}>
        <h5 className="fw-bold mb-3">About Job</h5>
        <p className="text-secondary mb-0" style={{textAlign: 'justify'}}>
          Posted 3 Days ago...nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  );
}
