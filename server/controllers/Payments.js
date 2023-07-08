const {instance} = require('../config/razorpay');

const User = require('../models/User');
const Course = require('../models/Course');
const {mailSender} = require('../utils/mailSender');
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require('mongoose');


exports.capturePayment = async(req, res) => {
    const {courses} = req.body;
    const userId = req.user.id;

    if(courses.length === 0) {
        return res.json({
            success:false,
            message:"Please provide Course Id"
        })
    }

    let totalAmount = 0;

    for(const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if(!course) {
                return res.json({
                    success:false,
                    message:"Could not find the course"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.json({
                    success:false,
                    message:"User already Enrolled",
                })
            }

            totalAmount += course.price;
        }catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency : "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success:true,
            message:paymentResponse,
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could Not Initiate Order",
        })
    }
}

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(200).json({
            success:false,
            message:"Payment Failed",
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if(expectedSignature === razorpay_signature) {
        //enroll students
        await enrollStudents(courses, userId, res);
        //return response
        return res.status(200).json({
            success:true,
            message:"Payment Verified",
        })
    }

    return res.status(200).json({
        success:"false",
        message:"Payment Failed",
    })
}

const enrollStudents = async(courses, userId, res) => {
    if(!courses || !userId) {
        return res.status(400).json({
            success:false,
            message: "Please provide course and user details",
        })
    }

    for(const courseId of courses) {
        try {
            const enrolledCourses = await Course.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )
    
            if(!enrolledCourses) {
                return res.status(500).json({
                    success:false,
                    message:"Course not found",
                })
            }
    
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{courses: courseId}},
                {new:true})
    
            //send mail to student
            const mailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourses.courseName}`,
                courseEnrollmentEmail(enrolledCourses.courseName, `${enrolledStudent.firstName}`)
            )
    
            console.log("Email sent successfully", mailResponse.response);
        }catch(error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
}

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;
    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success:false,
            message:"Please provide all the fields",
        })
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Could not send email",
        })
    }
}

// //Capture the payment and initiate razorpay order
// exports.capturePayment = async(req, res) => {
//     try {
//         //get courseId and userId
//         const {course_id} = req.body;
//         const userId = req.user.id;

//         //validation
//         //valid courseId
//         if(!course_id) {
//             return res.status(400).json({
//                 success:false,
//                 message:"Please Provide Valid Course ID",
//             });
//         }

//         //valid courseDetails
//         let course;
//         try {
//             course = await Course.findById(course_id);
//             if(!course) {
//                 return res.status(400).json({
//                     success:false,
//                     message:"Course Details Not Found",
//                 });
//             }

//             //check if user already pay for the same course
//             const uid = new mongoose.Types.ObjectId(userId);
//             if(course.studentsEnrolled.includes(uid)) {
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student already enrolled in this course",
//                 });
//             }

//         }catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
    
//         //order create 
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes:{
//                 courseId:course_id,
//                 userId,
//             }
//         }

//         try {
//             //initiate payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount,
//             })
//         }catch(error) {
//             console.log(error);
//             return res.json({
//                 success:false,
//                 message:"Could not initiate order",
//             });
//         }
//         //return response
//     }catch(error) {

//     }
// }

// //verify Signature of razorpay and server
// exports.verifySignature = async(req, res) => {
//     const webHookSecret = "12345678";

//     const signature = req.headers("x-razorpay-signature");
//     const shasum = crypto.createHmac('sha256', webHookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     //compare signature and digest
//     if(signature === digest) {
//         console.log("Payment is Authorized");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true});

//             if(!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found",
//                 });
//             }

//             console.log(enrolledCourse);

//             //find the student and add course in its courses list
//             const enrolledStudent = await User.findByIdAndUpdate({_id:userId}, {$push:{courses:courseId}}, {new:true});
//             console.log(enrolledStudent);

//             //send confirmation mail
//             const emailResponse = await mailSender(enrolledStudent.email, "Congratulation for new Course", "You buy a new course from StudyTech");
//             console.log(emailResponse);

//             //return response
//             return res.stauts(200).json({
//                 success:true,
//                 message:"Signature Verified And Course Added",
//             });
//         }catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }

//     else {
//         return res.status(500).json({
//             success:false,
//             message:"Invalid Signature",
//         });
//     }
// }

