// routes/allergyRoutes.js
const express = require('express');
const router = express.Router();
const { addAllergy } = require('../controllers/allergyController');
router.post('/', addAllergy);
module.exports = router;
