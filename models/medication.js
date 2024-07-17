// models/Medication.js
const mongoose = require('mongoose');
const MedicationSchema = new mongoose.Schema({
  medicationName: { type: String, required: true },
  dose: { type: String, required: true },
  route: { type: String, required: true },
  frequency: { type: String, required: true },
  unitOfMeasure: { type: String, required: true },
  status: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  availableDose: { type: Number },
  expiryDate: { type: Date },
  note: { type: String }
});
module.exports = mongoose.model('Medication', MedicationSchema);
