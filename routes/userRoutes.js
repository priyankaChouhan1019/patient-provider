const express = require("express");

const router = express.Router();

const {register,loginUser,currentUser,} = require("../controllers/userController")
const {sendOTP}= require("../controllers/otpController")

router.post("/register",register)

router.post("/login",loginUser)

router.get("/current", currentUser)

router.post('/send-otp', sendOTP);

module.exports = router;