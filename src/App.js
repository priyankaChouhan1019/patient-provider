import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/patient-dashboard" element={role === 'patient' ? <PatientDashboard /> : <Navigate to="/login" />} />
        <Route path="/physician-dashboard" element={role === 'physician' ? <PhysicianDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
