// routes/medicationRoutes.js
const express = require('express');
const router = express.Router();
const { addMedication } = require('../controllers/medictionController');
router.post('/', addMedication);
module.exports = router;
