const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels")
const jwt = require("jsonwebtoken");
const otp = require('../models/otpModel');
const { authService } = require('../services/authService');

//@desc Register the user
//@route POST /api/users/register
//@access public



const register = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    const { token, user } = await authService({ username, email, password });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

// module.exports = { register };

  

//@desc login the user
//@route POST /api/users/login
//@access public

// const loginUser = asyncHandler(async (req,res)=>{
//     const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ msg: 'All fields are mandatory!' });
//   }
//   const user = await User.findOne({ email });
  
//   //compare password with hashedpassword
//   const payload = {
//     user: {
//       username: user.username,
//       email: user.email,
//       id: user.id,
//     },
//   };
//   if (user && (await bcrypt.compare(password, user.password))) {
//     const accessToken = jwt.sign(
//         payload,
//       process.env.ACCESS_TOKEN_SECERT,
//       { expiresIn: "15m" }
//     );
//     res.status(200).json({ accessToken });
//   } else {
//     res.status(401);
//     throw new Error("email or password is not valid");
//   }
// });

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: 'All fields are mandatory!' });
  }
  const user = await User.findOne({ email });
  
  if (!user) {
    res.status(401);
    throw new Error("Email or password is not valid");
  }

  // Compare password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(401);
    throw new Error("Email or password is not valid");
  }

  const payload = {
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  };

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  const demographics = await User.findOne({ userId: user._id });
  const hasDemographics = !!demographics;

  res.json({ token, hasDemographics });

  res.status(200).json({ token });
});

//@desc current  user
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json({message: "current information"})
});

module.exports = {authService,loginUser, currentUser, register};