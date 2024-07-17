// routes/medicationRoutes.js
const express = require('express');
const router = express.Router();
const {  
    getMedications,
    addMedication,
    updateMedication,
    deleteMedication,
 } = require('../controllers/medictionController');


router.get('/', getMedications);
router.post('/', addMedication);
router.put('/:id', updateMedication);
router.delete('/:id', deleteMedication);


module.exports = router;
