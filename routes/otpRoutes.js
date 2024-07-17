const express = require('express');
const { verifyOtpController, resendOtpController } = require('../controllers/otpController');

const router = express.Router();

router.post('/verify', verifyOtpController);
router.post('/resend', resendOtpController);

module.exports = router;
