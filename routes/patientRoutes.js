const express = require('express');
const router = express.Router();
const { savePatientDemographics } = require('../controllers/PatientDemographycsController');

router.post('/patient-demographics', savePatientDemographics);

module.exports = router;
