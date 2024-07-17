const express = require("express");

const router = express.Router();

const {register,loginUser,currentUser,} = require("../controllers/userController")

router.post("/register",register)

router.post("/login",loginUser)

router.get("/current", currentUser)



module.exports = router;