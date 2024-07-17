const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please enter the user name"]
    },

    email:{
        type: String,
        require:[true, "Please enter email address"],
        unique:[true, "Email address already taken"]
    },

    password:{
        type: String,
        require:[true, "Please enter password"]
    },
    confirmPassword:{
        type: String,
        require:[true, "Please enter password"]
    },

    otp: {
         type: String
         },
    otpExpires: {
         type: Date
         }
    
},
{
    timestamps:true
})

module.exports = mongoose.model("user",userSchema)