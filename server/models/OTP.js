const mongoose = require('mongoose');
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification email form StudyTech", emailTemplate(otp));
        console.log("Email sent successfully", mailResponse);
    }catch(error) {
        console.log("Error occur while sending verification email", error);
    }
}

OTPSchema.pre("save", async function(next) {

    if(this.isNew)
        await sendVerificationEmail(this.email, this.otp);
    
    next();
});

module.exports = mongoose.model('OTP', OTPSchema);