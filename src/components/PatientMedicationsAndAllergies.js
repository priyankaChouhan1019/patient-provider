import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './PatientMedicationsAndAllergies.css'; 
import { useNavigate } from 'react-router-dom';

const PatientMedicationsAndAllergies = () => {
  const [medications, setMedications] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [medication, setMedication] = useState({
    medicationName: '',
    dose: '',
    route: '',
    frequency: '',
    unitOfMeasure: '',
    status: '',
    startDate: '',
    endDate: '',
    availableDose: '',
    expiryDate: '',
    note: ''
  });
  const [allergy, setAllergy] = useState({
    allergyName: '',
    symptoms: '',
    status: '',
    onset: '',
    reaction: '',
    severity: '',
    sourceOfInformation: ''
  });

  const [consent, setConsent] = useState(false);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already submitted the information
    const checkSubmissionStatus = async () => {
      try {

        const userId = localStorage.getItem('userId'); // Retrieve user ID from localStorage
        if (!userId) {
          navigate('/login'); // Redirect to login if user ID is not found
          return;
        }
       // const userId = 'YOUR_USER_ID'; // Replace with actual user ID
        const res = await axios.get(`http://localhost:5000/api/users/${userId}/status`);
        if (res.data.submissionStatus === 'completed') {
          navigate('/dashboard');
        }
      } catch (err) {
        console.error('Error checking submission status', err);
      }
    };

    checkSubmissionStatus();
  }, [navigate]);

  const handleMedicationChange = (e) => {
    setMedication({ ...medication, [e.target.name]: e.target.value });
  };

  const handleAllergyChange = (e) => {
    setAllergy({ ...allergy, [e.target.name]: e.target.value });
  };

  const handleConsentChange = (e) => {
    setConsent(e.target.checked);
  };

  const addMedication = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/medication', medication);
      setMedications([...medications, res.data]);
      setMedication({
        medicationName: '',
        dose: '',
        route: '',
        frequency: '',
        unitOfMeasure: '',
        status: '',
        startDate: '',
        endDate: '',
        availableDose: '',
        expiryDate: '',
        note: ''
      });
      setFeedback('Medication added successfully');
    } catch (err) {
      setFeedback(err.response ? err.response.data.message : 'Error adding medication');
    }
  };

  const addAllergy = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/allergy', allergy);
      setAllergies([...allergies, res.data]);
      setAllergy({
        allergyName: '',
        symptoms: '',
        status: '',
        onset: '',
        reaction: '',
        severity: '',
        sourceOfInformation: ''
      });
      setFeedback('Allergy added successfully');
    } catch (err) {
      setFeedback(err.response ? err.response.data.message : 'Error adding allergy');
    }
  };

  const handleSubmit = async () => {

    if (!consent) {
      setFeedback('Consent is required.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/submit', { medications, allergies,consent });
      alert('Submission successful');
      navigate('/dashboard');
    } catch (err) {
      setFeedback('Error submitting data');
    }
  };

  return (
    <div className="patient-form">
      <h2>Record Patient Medication</h2>
      <form>
        <input type="text" name="medicationName" value={medication.medicationName} onChange={handleMedicationChange} placeholder="Medication Name" required />
        <input type="text" name="dose" value={medication.dose} onChange={handleMedicationChange} placeholder="Dose" required />
        <input type="text" name="route" value={medication.route} onChange={handleMedicationChange} placeholder="Route" required />
        <input type="text" name="frequency" value={medication.frequency} onChange={handleMedicationChange} placeholder="Frequency" required />
        <input type="text" name="unitOfMeasure" value={medication.unitOfMeasure} onChange={handleMedicationChange} placeholder="Unit of Measure" required />
        <input type="text" name="status" value={medication.status} onChange={handleMedicationChange} placeholder="Status" required />
        <input type="date" name="startDate" value={medication.startDate} onChange={handleMedicationChange} placeholder="Start Date" required />
        <input type="date" name="endDate" value={medication.endDate} onChange={handleMedicationChange} placeholder="End Date" />
        <input type="number" name="availableDose" value={medication.availableDose} onChange={handleMedicationChange} placeholder="Available Dose" />
        <input type="date" name="expiryDate" value={medication.expiryDate} onChange={handleMedicationChange} placeholder="Expiry Date" />
        <textarea name="note" value={medication.note} onChange={handleMedicationChange} placeholder="Note"></textarea>
        <button type="button" onClick={addMedication}>Add Medication</button>
      </form>

      <h2>Record Patient Allergy</h2>
      <form>
        <input type="text" name="allergyName" value={allergy.allergyName} onChange={handleAllergyChange} placeholder="Allergy Name" required />
        <input type="text" name="symptoms" value={allergy.symptoms} onChange={handleAllergyChange} placeholder="Symptoms" required />
        <input type="text" name="status" value={allergy.status} onChange={handleAllergyChange} placeholder="Status" required />
        <input type="date" name="onset" value={allergy.onset} onChange={handleAllergyChange} placeholder="Onset" required />
        <input type="text" name="reaction" value={allergy.reaction} onChange={handleAllergyChange} placeholder="Reaction" required />
        <input type="text" name="severity" value={allergy.severity} onChange={handleAllergyChange} placeholder="Severity" required />
        <input type="text" name="sourceOfInformation" value={allergy.sourceOfInformation} onChange={handleAllergyChange} placeholder="Source of Information" required />
        <button type="button" onClick={addAllergy}>Add Allergy</button>
      </form>

      <h2>Consent</h2>
      <form>
      <input type="checkbox" name="consent" checked={consent} onChange={handleConsentChange} required />
        <label>I consent to the capture of this information.</label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default PatientMedicationsAndAllergies;
