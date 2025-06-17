import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './page.module.css';
import { 
  FiX, 
  FiStar, 
  FiCheck, 
  FiCreditCard, 
  FiDollarSign,
  FiPackage,
  FiAward,
  FiTrendingUp,
  FiUsers,
  FiDatabase,
  FiHeadphones,
  FiUserCheck,
  FiBarChart2,
  FiTarget,
  FiClock
} from 'react-icons/fi';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';



// Set the app element to the root div
if (typeof window !== 'undefined') {
  Modal.setAppElement('body');
}

const Plans = ({ isOpen, onClose, userType, currentPlanId }) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [processingPlanId, setProcessingPlanId] = useState(null);
  const [userSubscription, setUserSubscription] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/`);
        const filteredPlans = response.data.filter(plan => plan.user_type === userType);
        setPlans(filteredPlans);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load plans. Please try again later.');
        setError('Failed to load plans. Please try again later.');
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPlans();
    }
  }, [isOpen, userType]);

  useEffect(() => {
    const fetchUserSubscription = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe/`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('access_token')}`
            }
          }
        );
        if (response.data.has_subscription) {
          setUserSubscription(response.data);
        } else {
          setUserSubscription(null);
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
        setUserSubscription(null);
      }
    };
    fetchUserSubscription();
  }, []);

  const handleSelectPlan = async (planId) => {
    try {
      setProcessing(true);
      setProcessingPlanId(planId);
      setError(null);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe/create/`,
        { plan: planId },
        {
          headers: {
            'Authorization': `Bearer ${Cookies.get('access_token')}`
          }
        }
      );
      
      if (response.data) {
        // Fetch the updated subscription
        const subscriptionResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe/`,
          {
            headers: {
              'Authorization': `Bearer ${Cookies.get('access_token')}`
            }
          }
        );
        setUserSubscription(subscriptionResponse.data);
        toast.success('Subscription updated successfully');
        onClose();
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to create subscription. Please try again.';
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setProcessing(false);
      setProcessingPlanId(null);
    }
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getPlanIcon = (planName) => {
    switch (planName.toLowerCase()) {
      case 'starter':
        return <FiPackage className={styles.planIcon} />;
      case 'growth':
        return <FiTrendingUp className={styles.planIcon} />;
      case 'enterprise':
        return <FiAward className={styles.planIcon} />;
      case 'basic':
        return <FiPackage className={styles.planIcon} />;
      case 'pro':
        return <FiTrendingUp className={styles.planIcon} />;
      case 'elite':
        return <FiAward className={styles.planIcon} />;
      default:
        return <FiPackage className={styles.planIcon} />;
    }
  };

  const getFeatureIcon = (feature) => {
    switch (feature.toLowerCase()) {
      case 'job_posts':
        return <FiUsers />;
      case 'consultancy_bids':
      case 'bids':
        return <FiTarget />;
      case 'cv_database_access':
        return <FiDatabase />;
      case 'priority_support':
        return <FiHeadphones />;
      case 'dedicated_account_manager':
        return <FiUserCheck />;
      case 'candidate_management_dashboard':
        return <FiBarChart2 />;
      case 'analytics_access':
        return <FiBarChart2 />;
      case 'priority_matching':
        return <FiTarget />;
      default:
        return <FiCheck />;
    }
  };

  const renderDescriptionItems = (description) => {
    return Object.entries(description).map(([key, value]) => {
      const formattedKey = key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      let displayValue = value;
      if (typeof value === 'boolean') {
        displayValue = value ? 'Yes' : 'No';
      } else if (value === 'unlimited') {
        displayValue = 'Unlimited';
      }

      return (
        <li key={key} className={styles.descriptionItem}>
          <span className={styles.descriptionIcon}>
            {getFeatureIcon(key)}
          </span>
          {formattedKey}: {displayValue}
        </li>
      );
    });
  };

  const isPopularPlan = (plan) => {
    // Define which plan should be highlighted as popular
    return plan.name.toLowerCase() === 'growth' || plan.name.toLowerCase() === 'pro';
  };

  if (loading) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <div className="text-center text-danger py-4">
          <p className="mb-0">{error}</p>
          <button 
            className="btn btn-link mt-3" 
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modalContent}
      overlayClassName={styles.modalOverlay}
      closeTimeoutMS={200}
    >
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <FiX />
      </button>
      
      <h2 className={styles.modalTitle}>
        <FiCreditCard className={styles.titleIcon} />
        {userSubscription?.has_subscription ? 'Upgrade Your Plan' : 'Choose Your Plan'}
      </h2>
      <div className={styles.plansContainer}>
        {plans.map((plan) => {
          const isCurrentPlan = userSubscription?.has_subscription && userSubscription.plan === plan.id;
          const isUpgrade = userSubscription?.has_subscription && plan.price > plans.find(p => p.id === userSubscription.plan)?.price;
          const isProcessing = processingPlanId === plan.id;
          
          return (
            <div
              key={plan.id}
              className={`${styles.planCard} ${
                isCurrentPlan ? styles.currentPlan : ''
              } ${isPopularPlan(plan) ? styles.popularPlan : ''}`}
            >
              {isPopularPlan(plan) && (
                <div className={styles.popularBadge}>
                  <FiStar />
                  Most Popular
                </div>
              )}
              <h3 className={styles.planName}>
                {getPlanIcon(plan.name)}
                {plan.name}
              </h3>
              <div className={styles.planPrice}>
                {formatPrice(plan.price, plan.currency)}
                <span className={styles.pricePeriod}>/month</span>
              </div>
              <ul className={styles.planDescription}>
                {renderDescriptionItems(plan.description)}
              </ul>
              <button
                className={styles.selectButton}
                onClick={() => handleSelectPlan(plan.id)}
                disabled={isCurrentPlan || processing}
              >
                {isProcessing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    {plan.currency === 'INR' ? "₹ " : <FiDollarSign />}
                    {isCurrentPlan 
                      ? 'Current Plan' 
                      : isUpgrade 
                        ? 'Upgrade Plan' 
                        : 'Select Plan'
                    }
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
      {error && (
        <div className="text-center text-danger mt-3">
          <p className="mb-0">{error}</p>
          <button 
            className="btn btn-link mt-2" 
            onClick={() => setError(null)}
          >
            Try Again
          </button>
        </div>
      )}
    </Modal>
  );
};

export default Plans;
