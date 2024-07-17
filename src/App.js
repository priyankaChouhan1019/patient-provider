import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PatientDemographics from './components/patientDemographics';
import PatientMedicationsAndAllergies from './components/PatientMedicationsAndAllergies';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-demographics" element={<PatientDemographics/>} />
        <Route path="/PatientMedicationsAndAllergies" element={<PatientMedicationsAndAllergies/>} />
      </Routes>
    </Router>
  );
}

export default App;
