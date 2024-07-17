import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientDemographics = () => {
  const [formData, setFormData] = useState({
    familyName: '',
    givenName: '',
    gender: '',
    dob: '',
    address1: '',
    address2: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    phoneNumber: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { familyName, givenName, gender, dob, address1, address2, country, state, city, zip, phoneNumber } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patient-demographics', formData);
      setMessage('Demographics saved successfully!');
      setFormData({
        familyName: '',
        givenName: '',
        gender: '',
        dob: '',
        address1: '',
        address2: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        phoneNumber: '',
      });
      navigate('/medication-allergies');
    } catch (err) {
      setMessage('Error saving demographics.');
      console.error(err.response.data);
    }
  };

  const fetchAddressDetails = async (zip) => {
    try {
      const res = await axios.get(`http://api.zippopotam.us/us/${zip}`);
      const place = res.data.places[0];
      setFormData({
        ...formData,
        city: place['place name'],
        state: place['state abbreviation'],
        country: res.data.country,
      });
    } catch (err) {
      console.error('Error fetching address details', err);
      setMessage('Error fetching address details.');
    }
  };

  const onZipChange = (e) => {
    const zipValue = e.target.value;
    setFormData({ ...formData, zip: zipValue });

    if (zipValue.length === 5) {
      fetchAddressDetails(zipValue);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Patient Demographics</h3>
              <form onSubmit={onSubmit}>
                {/* Family Name */}
                <div className="mb-3">
                  <label htmlFor="familyName" className="form-label">Family Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="familyName"
                    name="familyName"
                    value={familyName}
                    onChange={onChange}
                    required
                  />
                </div>
                {/* Given Name */}
                <div className="mb-3">
                  <label htmlFor="givenName" className="form-label">Given Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="givenName"
                    name="givenName"
                    value={givenName}
                    onChange={onChange}
                    required
                  />
                </div>
                {/* Gender */}
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label">Gender *</label>
                  <select
                    className="form-control"
                    id="gender"
                    name="gender"
                    value={gender}
                    onChange={onChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Date of Birth */}
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={onChange}
                    required
                  />
                </div>
                {/* Address Line 1 */}
                <div className="mb-3">
                  <label htmlFor="address1" className="form-label">Address Line 1 (Not Mandatory)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address1"
                    name="address1"
                    value={address1}
                    onChange={onChange}
                  />
                </div>
                {/* Address Line 2 */}
                <div className="mb-3">
                  <label htmlFor="address2" className="form-label">Address Line 2</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    name="address2"
                    value={address2}
                    onChange={onChange}
                  />
                </div>
                {/* Country */}
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">Country *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={country}
                    onChange={onChange}
                    required
                    readOnly
                  />
                </div>
                {/* State */}
                <div className="mb-3">
                  <label htmlFor="state" className="form-label">State/Province/Region *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={state}
                    onChange={onChange}
                    required
                    readOnly
                  />
                </div>
                {/* City */}
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={city}
                    onChange={onChange}
                    required
                    readOnly
                  />
                </div>
                {/* ZIP */}
                <div className="mb-3">
                  <label htmlFor="zip" className="form-label">ZIP/Postal Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={zip}
                    onChange={onZipChange}
                    required
                  />
                </div>
                {/* Phone Number */}
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="reset" className="btn btn-secondary ms-2">Reset</button>
              </form>
              {message && <p className="mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDemographics;