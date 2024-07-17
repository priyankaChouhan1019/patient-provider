// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { MDBContainer, MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';

const Dashboard = ({ isAuthenticated, onLogout }) => {
  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBCardBody>
          <h1>Welcome to Patient Portal</h1>
          {isAuthenticated ? (
            <>
              <MDBBtn color="dark" onClick={onLogout}>Logout</MDBBtn>
              <Link to="/patient-demographics"><MDBBtn color="dark">Patient Demographics</MDBBtn></Link>
              <Link to="/medication-allergies"><MDBBtn color="dark">Medications & Allergies</MDBBtn></Link>
              <Link to="/active-medications"><MDBBtn color="dark">Active Medications</MDBBtn></Link>
            </>
          ) : (
            <>
              <Link to="/login"><MDBBtn color="dark">Login</MDBBtn></Link>
              <Link to="/register"><MDBBtn color="dark">Register</MDBBtn></Link>
            </>
          )}
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Dashboard;
