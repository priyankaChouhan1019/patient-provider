const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const {sendOtpEmail} = require('./emailService')

const authService = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
  const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

  const user = new User({
    username,
    email,
    password: hashedPassword,
    otp,
    otpExpires
  });

  await user.save();
  sendOtpEmail(email, otp)

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token, user: { username, email } };
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
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  sendOtpEmail(email, otp);

  return { email: user.email, message: 'OTP resent' };
};

module.exports = { authService, verifyOtp, resendOtp };
