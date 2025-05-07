import { useState, useEffect, useRef } from 'react';
import styles from './IdentifyUser.module.css';

export default function AuthModal() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: '', password: '' });
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (form.email && form.password) {
      setStep(2);
    } else {
      alert('Please fill all fields');
    }
  };

  useEffect(() => {
    const launchModal = async () => {
    //   const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
      const modal = new bootstrap.Modal(modalRef.current);
      modal.show();
    };

    launchModal();
  }, []);

  return (
    <div
      className="modal fade"
      id="authModal"
      tabIndex="-1"
      aria-labelledby="authModalLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog">
        <div className={`modal-content ${styles.modalContent}`}>
          <div className="modal-header">
            <h5 className="modal-title" id="authModalLabel">
              {step === 1 ? 'Login Details' : 'Step 2'}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            {step === 1 ? (
              <>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter password"
                  />
                </div>
                <button className="btn btn-primary" onClick={handleNext}>
                  Next
                </button>
              </>
            ) : (
              <p>Welcome to Step 2. Add more fields here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
