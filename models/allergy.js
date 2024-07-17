// models/Allergy.js
const mongoose = require('mongoose');
const AllergySchema = new mongoose.Schema({
  allergyName: { type: String, required: true },
  symptoms: { type: String, required: true },
  status: { type: String, required: true },
  onset: { type: Date, required: true },
  reaction: { type: String, required: true },
  severity: { type: String, required: true },
  sourceOfInformation: { type: String, required: true }
});
module.exports = mongoose.model('Allergy', AllergySchema);