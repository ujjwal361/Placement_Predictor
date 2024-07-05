import React, { useState } from 'react';
import './DataCollectionForm.css';
import axios from 'axios';

function DataCollectionForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    branch: '',
    cgpa: '',
    internships: '',
    backlogs: '',
    gender: '',
    placed: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Dynamic validation
    const validationErrors = { ...errors };
    switch (name) {
      case 'branch':
        if (value) delete validationErrors.branch;
        break;
      case 'cgpa':
        if (value && !isNaN(value) && value >= 0 && value <= 10) delete validationErrors.cgpa;
        break;
      case 'internships':
        if (value && !isNaN(value) && value >= 0) delete validationErrors.internships;
        break;
      case 'backlogs':
        if (value && !isNaN(value) && value >= 0 && value <= 3) delete validationErrors.backlogs;
        break;
      case 'gender':
        if (value) delete validationErrors.gender;
        break;
      case 'placed':
        if (value) delete validationErrors.placed;
        break;
      default:
        break;
    }
    setErrors(validationErrors);
  };

  const validate = () => {
    const errors = {};
    if (step === 1 && !formData.branch) errors.branch = 'Branch is required';
    if (step === 2) {
      if (!formData.cgpa) errors.cgpa = 'CGPA is required';
      else if (isNaN(formData.cgpa) || formData.cgpa < 0 || formData.cgpa > 10)
        errors.cgpa = 'CGPA must be a number between 0 and 10';
    }
    if (step === 3) {
      if (!formData.internships) errors.internships = 'Number of internships is required';
      else if (isNaN(formData.internships) || formData.internships < 0)
        errors.internships = 'Internships must be a non-negative number';
    }
    if (step === 4) {
      if (!formData.backlogs) errors.backlogs = 'Number of backlogs is required';
      else if (isNaN(formData.backlogs) || formData.backlogs < 0 || formData.backlogs > 3)
        errors.backlogs = 'Backlogs must be a number between 0 and 3';
    }
    if (step === 5 && !formData.gender) errors.gender = 'Gender is required';
    if (step === 6 && !formData.placed) errors.placed = 'Placement status is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      if (step === 6) {
        setLoading(true); // Show loader
        setMessage('We are storing your data...');
        try {
          const response = await axios.post('http://localhost:5000/data', formData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setMessage('Data collected successfully!');
          // Handle successful submission
        } catch (error) {
          setMessage('There was an error collecting the data!');
          console.error('There was an error collecting the data!', error);
        } finally {
          setLoading(false); // Hide loader
        }
      } else {
        setStep(step + 1);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="data-collection-form-container">
      {!message && <h1>Data Collection Form</h1>}
      {loading ? (
        <p className="message">{message}</p> // Show loading or final message
      ) : message ? (
        <p className="message">{message}</p> // Show success/error message
      ) : (
        <form className="data-collection-form" onSubmit={handleSubmit}>
          {step === 1 && (
            <div className={`form-field ${step === 1 ? 'visible' : ''}`}>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="input-field"
              >
                <option value="" className="placeholder-option">Select branch</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electronics And Communication">Electronics And Communication</option>
                <option value="Electrical">Electrical</option>
                <option value="Civil">Civil</option>
                <option value="Computer Science">Computer Science</option>
              </select>
              {errors.branch && <div className="error-message">{errors.branch}</div>}
            </div>
          )}
          {step === 2 && (
            <div className={`form-field ${step === 2 ? 'visible' : ''}`}>
              <input
                type="text"
                name="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                placeholder="Enter CGPA"
                className="input-field"
              />
              {errors.cgpa && <div className="error-message">{errors.cgpa}</div>}
            </div>
          )}
          {step === 3 && (
            <div className={`form-field ${step === 3 ? 'visible' : ''}`}>
              <input
                type="text"
                name="internships"
                value={formData.internships}
                onChange={handleChange}
                placeholder="Enter number of previous internships"
                className="input-field"
              />
              {errors.internships && <div className="error-message">{errors.internships}</div>}
            </div>
          )}
          {step === 4 && (
            <div className={`form-field ${step === 4 ? 'visible' : ''}`}>
              <input
                type="text"
                name="backlogs"
                value={formData.backlogs}
                onChange={handleChange}
                placeholder="Enter number of backlogs"
                className="input-field"
              />
              {errors.backlogs && <div className="error-message">{errors.backlogs}</div>}
            </div>
          )}
          {step === 5 && (
            <div className={`form-field ${step === 5 ? 'visible' : ''}`}>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="" className="placeholder-option">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>
          )}
          {step === 6 && (
            <div className={`form-field ${step === 6 ? 'visible' : ''}`}>
              <select
                name="placed"
                value={formData.placed}
                onChange={handleChange}
                className="input-field"
              >
                <option value="" className="placeholder-option">Did you get placed?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.placed && <div className="error-message">{errors.placed}</div>}
            </div>
          )}
          <div className="button-container">
            {step > 1 && <button type="button" onClick={handleBack} className="back-button">Back</button>}
            <button type="submit" className="submit-button">
              {step === 6 ? 'Submit' : 'Next'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default DataCollectionForm;
