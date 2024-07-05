// src/App.js
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import DataCollectionForm from './components/DataCollectionForm';
import PredictionForm from './components/PredictionForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/data-collection" element={<DataCollectionForm />} />
          <Route path="/prediction" element={<PredictionForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
