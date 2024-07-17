// src/components/VerifyOtp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setOtp(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/otp/verify', { email, otp });
      setMessage('Verification successful!');
      navigate('/patient-demographics');
    } catch (err) {
      setMessage('Invalid or expired OTP.');
    }
  };

  const onResend = async () => {
    try {
      await axios.post('/api/otp/resend', { email });
      setMessage('OTP resent!');
    } catch (err) {
      setMessage('Error resending OTP.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Verify OTP</h3>
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">Enter OTP</label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    name="otp"
                    value={otp}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
                <button type="button" className="btn btn-secondary" onClick={onResend}>Resend OTP</button>
              </form>
              {message && <p className="mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
