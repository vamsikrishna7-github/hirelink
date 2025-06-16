'use client';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styles from './page.module.css';
import { FiX } from 'react-icons/fi';
import Cookies from 'js-cookie';
import { Spinner } from 'react-bootstrap';

const Transaction = ({ isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchTransactions();
    }
  }, [isOpen]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/history/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('access_token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount, currency) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return styles.completed;
      case 'created':
        return styles.pending;
      case 'failed':
        return styles.failed;
      default:
        return styles.pending;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Billing History</h2>
          <button onClick={onClose} className={styles.closeButton}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          {loading ? (
            <div className={styles.loading}>
                <Spinner animation="border" role="status" className={`${['text-primary', 'text-white', 'text-success', 'text-danger', 'text-warning', 'text-info'][Math.floor(Math.random() * 6)]}`} />
            </div>
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : transactions.length === 0 ? (
            <div className={styles.noTransactions}>No transactions found</div>
          ) : (
            <div className={`${styles.tableContainer} table-responsive`}>
              <table className={`${styles.table} table table-bordered table-striped`}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{formatDate(transaction.created_at)}</td>
                      <td>{transaction.order_id || 'N/A'}</td>
                      <td>{formatAmount(transaction.amount, transaction.currency)}</td>
                      <td>
                        <span className={`${styles.status} ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Transaction;
