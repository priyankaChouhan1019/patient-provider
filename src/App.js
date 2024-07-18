// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';
import ActiveMedications from './components/ActiveMedications';
import Dashboard from './components/Dashboard';
import PatientMedicationsAndAllergies from './components/PatientMedicationsAndAllergies';
import PatientDemographics from './components/patientDemographics';

const App = () => {

  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if token exists, false otherwise
  };

  const handleLogout = () => {
    // Clear token or perform any necessary logout logic
    localStorage.removeItem('token'); // Remove token from localStorage or clear session
  };

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route
          path="/patient-demographics"
          element={isAuthenticated() ? <PatientDemographics /> : <Navigate to="/login" />}
        />
        <Route
          path="/medication-allergies"
          element={isAuthenticated() ? <PatientMedicationsAndAllergies /> : <Navigate to="/login" />}
        />
        <Route
          path="/active-medications"
          element={isAuthenticated() ? <ActiveMedications /> : <Navigate to="/login" />}
        />
      </Routes>
  </Router>
  );
};

export default App;
