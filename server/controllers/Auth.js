const User = require('../models/User');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require('dotenv').config();



//send OTP handler
exports.sendOTP = async(req, res) => {
    try{
        const {email} = req.body;

        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User already registered",
            });
        }

        //generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        console.log("Otp generated :", otp);

        //check unique otp or not
        let result = await OTP.findOne({otp: otp});

        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp};

        const otpBody = await OTP.create(otpPayload);
        console.log("Otp Body", otpBody);

        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

exports.signUp = async (req, res) => {
	try {
		// Destructure fields from the request body
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;
		// Check if All Details are there or not
		if (
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			!confirmPassword ||
			!otp
		) {
			return res.status(403).send({
				success: false,
				message: "All Fields are required",
			});
		}
		// Check if password and confirm password match
		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not match. Please try again.",
			});
		}

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists. Please sign in to continue.",
			});
		}

		// Find the most recent OTP for the email
		const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		console.log(response);
		if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user
		let approved = "";
		approved === "Instructor" ? (approved = false) : (approved = true);

		// Create the Additional Profile For User
		const profileDetails = await Profile.create({
			gender: null,
			dateOfBirth: null,
			about: null,
			contactNumber: null,
		});
		const user = await User.create({
			firstName,
			lastName,
			email,
			contactNumber,
			password: hashedPassword,
			accountType: accountType,
			approved: approved,
			additionalDetails: profileDetails._id,
			image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
		});

		return res.status(200).json({
			success: true,
			user,
			message: "User registered successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered. Please try again.",
		});
	}
};

//Login handler

exports.login = async(req, res) => {
    try{
        //get data from request body
        const {email, password} = req.body;

        //validate data
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory, Try Again",
            });
        }

        //check user already exists or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User not exists, Please SignUp first",
            });
        }

        //match password and generate JWT
        if(await bcrypt.compare(password, user.password)) {
            const payload ={
                email:user.email,
                id:user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h',
            });
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expiresIn: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie('token', token, options).status(200).json({
                success:true,
                user,
                token,
                message:"User LoggedIn Successfully",
            })
        }

        else {
            return res.status(401).json({
                success:false,
                message:"Incorrect Password",
            })
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, Please Try Again",
        })
    }
}


//Change Password

exports.changePassword = async(req, res) => {
    try{
        //get user data from req.user
        const userDetails = await User.findById(req.user.id);

        //get old pass, new pass, and conform password from request body
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //Validate old Password
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);

        if(!isPasswordMatch) {
            return res.status(401).json({
                success:false,
                message:"The password is incorrect",
            });
        }

        //match new password and confirm new password
        if(newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success:false,
                message:"The password and confirm password fields not matches",
            });
        }

        //Update password
        const encryptPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, {password: encryptPassword}, {new:true});

        //Send notification mail
        try {
            const emailResponse = await mailSender(updatedUserDetails.email, passwordUpdated(updatedUserDetails.email, `Password updated successfullly for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`));
            console.log("Email sent successfully: ", emailResponse.response);
        }catch(error) {
            console.log("Error Occurred while sending email:", error);
            return res.status(500).json({
                success:false,
                error:error.message,
                message:"Error occurred while sending mail",
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Password updated successfully",
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Error occurred while updating password",
        });
    }
};