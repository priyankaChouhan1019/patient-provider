import React, { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBInput,
    MDBIcon,
    MDBCheckbox,
  } from "mdb-react-ui-kit";


const Register = () => {
    const [formData, setFormData] = useState({
       username:'',
       email: '',
       password:'',
       confirmPassword: '',
      });

      const [showOtp, setShowOtp] = useState(false);
      const [registeredEmail, setRegisteredEmail] = useState('');

      const { username, email, password, confirmPassword } = formData;
      
    
      const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
      
      const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('Passwords do not match');
        } else {
          try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            setRegisteredEmail(email);
        setShowOtp(true);
            console.log(res.data);
          } catch (err) {
            console.error(err.response.data);
          }
        }
      };

  return (
    <div className="container">
      {!showOtp?(
         <div className="row justify-content-center mt-5">
         <div className="col-md-6">
           <div className="card">
             <div className="card-body">
               <h3 className="card-title text-center mb-4">Register</h3>
               <form onSubmit={onSubmit}>
                 <div className="mb-3">
                   <label htmlFor="username" className="form-label">Username</label>
                   <input
                     type="text"
                     className="form-control"
                     id="username"
                     name="username"
                     value={username}
                     onChange={onChange}
                     required
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="email" className="form-label">Email</label>
                   <input
                     type="email"
                     className="form-control"
                     id="email"
                     name="email"
                     value={email}
                     onChange={onChange}
                     required
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="password" className="form-label">Password</label>
                   <input
                     type="password"
                     className="form-control"
                     id="password"
                     name="password"
                     value={password}
                     onChange={onChange}
                     required
                   />
                 </div>
                 <div className="mb-3">
                   <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                   <input
                     type="password"
                     className="form-control"
                     id="confirmPassword"
                     name="confirmPassword"
                     value={confirmPassword}
                     onChange={onChange}
                     required
                   />
                 </div>
                 <button type="submit" className="btn btn-primary">Register</button>
               </form>
             </div>
           </div>
         </div>
       </div>
      ):(<VerifyOtp email={registeredEmail}/>)}
     
    </div>
  );
};

export default Register;
