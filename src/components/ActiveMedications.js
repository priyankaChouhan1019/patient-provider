
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal } from 'react-bootstrap';

const ActiveMedications = () => {
  const [medications, setMedications] = useState([]);
  const [show, setShow] = useState(false);
  const [currentMedication, setCurrentMedication] = useState({});
  
  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/medication');
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleShow = (medication = {}) => {
    setCurrentMedication(medication);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setCurrentMedication({
      ...currentMedication,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (currentMedication._id) {
      await axios.put(`http://localhost:5000/api/medication/${currentMedication._id}`, currentMedication);
    } else {
      await axios.post('http://localhost:5000/api/medication', currentMedication);
    }
    fetchMedications();
    handleClose();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/medication/${id}`);
    fetchMedications();
  };

  return (
    <div>
      <Button variant="primary" onClick={() => handleShow()}>Add Medication</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Medication Name</th>
            <th>Dose</th>
            <th>Route</th>
            <th>Frequency</th>
            <th>Unit of Measure</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Available Dose</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medications.map((medication) => (
            <tr key={medication._id}>
              <td>{medication.medicationName}</td>
              <td>{medication.dose}</td>
              <td>{medication.route}</td>
              <td>{medication.frequency}</td>
              <td>{medication.unitOfMeasure}</td>
              <td>{medication.startDate}</td>
              <td>{medication.endDate}</td>
              <td>{medication.availableDose}</td>
              <td>{medication.expiryDate}</td>
              <td>
                <Button variant="warning" onClick={() => handleShow(medication)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(medication._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{currentMedication._id ? 'Edit Medication' : 'Add Medication'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="medicationName">
              <Form.Label>Medication Name</Form.Label>
              <Form.Control
                type="text"
                name="medicationName"
                value={currentMedication.medicationName || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="dose">
              <Form.Label>Dose</Form.Label>
              <Form.Control
                type="text"
                name="dose"
                value={currentMedication.dose || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="route">
              <Form.Label>Route</Form.Label>
              <Form.Control
                type="text"
                name="route"
                value={currentMedication.route || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="frequency">
              <Form.Label>Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                value={currentMedication.frequency || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="unitOfMeasure">
              <Form.Label>Unit of Measure</Form.Label>
              <Form.Control
                type="text"
                name="unitOfMeasure"
                value={currentMedication.unitOfMeasure || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={currentMedication.startDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={currentMedication.endDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="availableDose">
              <Form.Label>Available Dose</Form.Label>
              <Form.Control
                type="number"
                name="availableDose"
                value={currentMedication.availableDose || ''}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="expiryDate">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                name="expiryDate"
                value={currentMedication.expiryDate || ''}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentMedication._id ? 'Update Medication' : 'Add Medication'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActiveMedications;
