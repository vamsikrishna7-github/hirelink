import { FiBriefcase, FiMapPin, FiClock, FiAward, FiFileText, FiUserCheck, FiDollarSign } from 'react-icons/fi';
import styles from './page.module.css';

export default function PostJob() {
  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <form className={`${styles.card} shadow-sm p-4 p-md-5`}>
            <div className="mb-4">
              <h2 className={`${styles.heading} fw-bold mb-0`}>Post a Job</h2>
              <div className={`${styles.subheading} mt-2`}>Yeddala Sukumar • Microsoft</div>
            </div>

            {/* Job Title & Location */}
            <div className="row gx-3">
               <div className="col-md-6 mb-4">
                    <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                    <FiBriefcase /> Job Title
                    </label>
                    <input 
                    type="text" 
                    className={`${styles.input} form-control`} 
                    placeholder="UI UX Designer" 
                    defaultValue="UI UX Designer"
                    />
              </div>
              <div className="col-md-6 mb-4">
                <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                    <FiMapPin /> Location
                </label>
                <select className={`${styles.input} form-select`} defaultValue="Chennai">
                  <option>Chennai</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                  <option>Hyderabad</option>
                  <option>Kolkata</option>
                  <option>Pune</option>
                  <option>Jaipur</option>
                  <option>Ahmedabad</option>
                  <option>Surat</option>
                  <option>Lucknow</option>
                  <option>Kanpur</option>
                  <option>Indore</option>
                  <option>Bhopal</option>
                  <option>Gurgaon</option>
                  <option>Noida</option>
                  <option>Ghaziabad</option>
                  <option>Faridhabad</option>
                  <option>Nashik</option>
                  <option>Bhubaneswar</option>
                  <option>Visakhapatnam</option>
                  <option>Bhopal</option>
                  
                </select>
              </div>
            </div>

            {/* Job Type & Qualification Row */}
            <div className="row gx-3">
              <div className="col-md-6 mb-4">
                <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                  <FiClock /> Job Type
                </label>
                <select className={`${styles.input} form-select`} defaultValue="Full Time">
                  <option>Full Time</option>
                  <option>Part Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div className="col-md-6 mb-4">
                <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                  <FiAward /> Required Qualification
                </label>
                <input 
                  type="text" 
                  className={`${styles.input} form-control`} 
                  placeholder="B.E/B.Tech" 
                  defaultValue="B.E/B.Tech"
                />
              </div>
            </div>

            {/* Responsibilities Section */}
            <div className="mb-4">
              <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                <FiFileText /> Responsibilities
              </label>
              <textarea 
                className={`${styles.textarea} form-control`} 
                rows={5}
                defaultValue={`• Create user-centered designs by understanding business requirements and user feedback
• Design UI elements, such as input controls, navigational components, and informational components
• Collaborate with developers, product managers, and other stakeholders
• Conduct usability testing and gather feedback
• Maintain consistency of designs across different platforms`}
              ></textarea>
            </div>

            {/* Requirements Section */}
            <div className="mb-4">
              <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                <FiUserCheck /> Requirements
              </label>
              <textarea 
                className={`${styles.textarea} form-control`} 
                rows={5}
                defaultValue={`• Basic knowledge of Figma (or other UI/UX design tools)
• Good understanding of UX principles
• Strong communication and collaboration skills
• A portfolio of previous design projects (college projects acceptable)`}
              ></textarea>
            </div>

            {/* Benefits Section */}
            <div className="mb-4">
              <label className={`${styles.label} form-label d-flex align-items-center gap-2`}>
                <FiDollarSign /> Benefits
              </label>
              <textarea 
                className={`${styles.textarea} form-control`} 
                rows={3}
                defaultValue={`• Flexible working hours
• Career growth opportunities
• Collaborative and supportive team environment`}
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="d-grid gap-2 mt-5">
              <button type="submit" className={`${styles.submitbtn} btn rounded-3 py-3 fw-bold`}>
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}