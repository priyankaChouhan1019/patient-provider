// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
} from 'mdb-react-ui-kit';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, hasDemographics } = res.data;
      localStorage.setItem('token', token);

      if (hasDemographics) {
        navigate('/dashboard');
      } else {
        navigate('/patient-demographics');
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className='g-0'>
          
          <MDBCol md='6'>
            <MDBCardBody className='d-flex flex-column'>
              <div className='d-flex flex-row mt-2'>
                <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>
              <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
              <form onSubmit={onSubmit}>
                <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' name="email" value={email} onChange={onChange} size="lg" required/>
                <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' name="password" value={password} onChange={onChange} size="lg" required/>
                <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
              </form>
              <a className="small text-muted" href="#!">Forgot password?</a>
              <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <Link to="/register" style={{color: '#393f81'}}>Register here</Link></p>
              
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default Login;
