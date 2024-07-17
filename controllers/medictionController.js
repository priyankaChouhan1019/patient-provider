// controllers/medicationController.js
const Medication = require('../models/medication');

const addMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error adding medication' });
  }
};

const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.json(medications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(medication);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteMedication = async (req, res) => {
  try {
    await Medication.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getMedications,
  addMedication,
  updateMedication,
  deleteMedication,
};
