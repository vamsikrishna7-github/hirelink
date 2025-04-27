import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { FaPlay } from 'react-icons/fa';

ChartJS.register(ArcElement, Tooltip, Legend);

const ApplicantDistributionChart = () => {
  const data = {
    labels: ['Entry Level', 'Intermediate', 'Senior'],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ['#36a2eb', '#ffce56', '#ff6384'],
        borderWidth: 0,
        // Remove `circumference` and `rotation` for full circle
      },
    ],
  };

  const options = {
    cutout: '60%', // Adjust for desired doughnut thickness
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const value = context.raw;
            const percentage = Math.round((value / total) * 100);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="container-fluid bg-white">
      <div className="row shadow-sm border p-4">
        <div className="col">
          <div className="card border-0 text-center">
            <h5 className="card-title mb-4">Applicant Distribution</h5>
            <div className="d-flex justify-content-center" style={{ height: '350px' }}>
              <Doughnut data={data} options={options} />
            </div>
          </div>
        </div>

        <div className="col">
          <ul className="list-unstyled">
            <li className="mb-3 d-flex justify-content-between align-items-center py-2 px-3 border rounded">
              <span className="fw-semibold">Entry Level Applicants</span>
              <span className="d-flex align-items-center">
                70
                <FaPlay className="ms-2" size={14} />
              </span>
            </li>
            <li className="mb-3 d-flex justify-content-between align-items-center py-2 px-3 border rounded bg-warning bg-opacity-10">
              <span className="fw-semibold">Intermediate Level Applicants</span>
              <span className="d-flex align-items-center">
                20
                <FaPlay className="ms-2" size={14} />
              </span>
            </li>
            <li className="mb-3 d-flex justify-content-between align-items-center py-2 px-3 border rounded bg-danger bg-opacity-10">
              <span className="fw-semibold">Senior Level Applicants</span>
              <span className="d-flex align-items-center">
                10
                <FaPlay className="ms-2" size={14} />
              </span>
            </li>
            <li className="mb-3 d-flex justify-content-between align-items-center py-2 px-3 border rounded bg-secondary bg-opacity-10">
              <span className="fw-semibold">Total Applications</span>
              <span className="d-flex align-items-center">
                100
                <FaPlay className="ms-2" size={14} />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDistributionChart;