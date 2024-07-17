// controllers/medicationController.js
const Medication = require('../models/medication');

exports.addMedication = async (req, res) => {
  try {
    const medication = new Medication(req.body);
    await medication.save();
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: 'Error adding medication' });
  }
};
