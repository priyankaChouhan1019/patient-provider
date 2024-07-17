const { verifyOtp, resendOtp } = require('../services/otpService');

const verifyOtpController = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const result = await verifyOtp(email, otp);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const resendOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    const result = await resendOtp(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

module.exports = { verifyOtpController, resendOtpController };
