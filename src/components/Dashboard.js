// src/components/Dashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token or perform any necessary logout logic
    localStorage.removeItem('token'); // Remove token from localStorage or clear session
    navigate('/login'); // Redirect to login page after logout
  };

  // const handleClick = () => {
  //   navigate('/patient-demographics');
  // };
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
      <MDBCardBody>
        <h1>Welcome to Patient Portal</h1>
        <MDBBtn color="dark" onClick={handleLogout}>Logout</MDBBtn>
        <button onClick={() => handleClick('/patient-demographics')}>Patient Demographics</button>
        <button onClick={() => handleClick('/medication-allergies')}>Medications & Allergies</button>
        <button onClick={() => handleClick('/active-medications')}>Active Medications</button>
      </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Dashboard;
