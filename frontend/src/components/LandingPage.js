// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDataCollection = () => {
    navigate('/data-collection');
  };

  const handlePrediction = () => {
    navigate('/prediction');
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Our Service</h1>
      <p>Help us with data collection or predict your chances of getting placed.</p>
      <div className="button-group">
        <button className="landing-button" onClick={handleDataCollection}>
          Help Us in Data Collection
        </button>
        <button className="landing-button" onClick={handlePrediction}>
          Predict Your Chances
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
