const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//Auth middleware

exports.auth = async(req, res, next) => {
    try {
        //extract token
        const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");

        //check token return res if missing
        if(!token) {
            return res.status(401).json({
                success:false,
                message:"Token is missing",
            })
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }catch(error) {
            //verification issue
            return res.status(401).json({
                success:false,
                message:"Token is invalid",
            });
        }

        next();
    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"Something went wrong while validating the token",
        });
    }
}


//Middleware for checking Student

exports.isStudent = async(req, res, next) => {
    try{
        const userDetails = await User.findOne({email: req.user.email});
        if(userDetails.accountType !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Students only",
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        });
    }
}

//Middleware for checking Student

exports.isInstructor = async(req, res, next) => {
    try{
        const userDetails = await User.findOne({email: req.user.email});

        if(userDetails.accountType !== "Instructor") {
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor",
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        });
    }
}


//Middleware for checking Admin

exports.isAdmin = async(req, res, next) => {
    try{
        const userDetails = await User.findOne({email: req.user.email});
        if(userDetails.accountType !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin",
            });
        }
        next();
    }catch(error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified, please try again",
        })
    }
}