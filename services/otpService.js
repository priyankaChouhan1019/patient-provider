const User = require('../models/userModels');
const { sendOtpEmail } = require('./emailService');

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOtp = async (email) => {
  const otp = generateOtp();
  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

  await User.findOneAndUpdate(
    { email },
    { otp, otpExpires },
    { new: true }
  );

  sendOtpEmail(email, otp);
};

const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    throw new Error('Invalid or expired OTP');
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  await user.save();

  return { email: user.email, verified: true };
};

const resendOtp = async (email) => {
  await sendOtp(email);
  return { email, message: 'OTP resent' };
};

module.exports = { sendOtp, verifyOtp, resendOtp };
