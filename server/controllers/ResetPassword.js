const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
//Reset Password Token
exports.resetPasswordToken = async(req, res) => {
    try{
        //get email from request body
        const email = req.body.email;

        //check user for email, validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"Your Email is not Registered",
            });
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");
        
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email: email}, {token: token, resetPasswordExpires: Date.now() + 5*60*1000}, {new:true});

        //create URL
        const url = `https://localhost:3000/update-password/${token}`;

        //Send mail containing the URL
        await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);

        //return response
        return res.status(200).json({
            success:true,
            message:"Email sent successfully, Check your mail to reset Password",
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while sending reset password email",
        });
    }
}

//Reset Password

exports.resetPassword = async(req, res) => {
    try{
        // data fetch
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:"Password not matches",
            });
        }

        //get userDetails from DB using token
        const userDetails = await User.findOne({token: token});

        //if user's entry not found-> invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:"Invaild token",
            });
        }

        //token time check
        if(userDetails.resetPasswordExpires > Date.now()) {
            return res.status(401).json({
                success:false,
                message:"Token is expired ,Please try again",
            });
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //password update
        await User.findOneAndUpdate({token: token}, {password: hashedPassword}, {new:true});

        //return response
        return res.status(200).json({
            success:true,
            message:"Password reset successfully",
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while reset password",
        })
    }
}