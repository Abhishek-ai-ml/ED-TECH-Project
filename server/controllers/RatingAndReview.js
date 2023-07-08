const mongoose = require('mongoose');
const Course = require('../models/Course');
const RatingAndReview = require('../models/RatingAndReview');

//create Rating
exports.createRating = async(req, res) => {
    try {
        //get user id
        const userId = req.user.id;

        //get data from req body
        const {rating, review, courseId} = req.body;

        //check user is enrolled or not
        const courseDetails = await Course.findOne({_id:courseId, studentsEnrolled: {$elemMatch : {$eq: userId}}});

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:"Student not enrolled in the coures",
            });
        }

        //check if user already review the course
        const alreadyReview = await RatingAndReview.findOne({user:userId, course:courseId});

        if(alreadyReview) {
            return res.status(403).json({
                success:false,
                message:"User already review for this course",
            });
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            user:userId,
            course:courseId,
        });

        //update courese with this rating and review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId}, {$push:{ratingAndReviews: ratingReview._id}}, {new:true});


        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created successfully",
            ratingReview,
        });
    }catch(error) {
        console.log(error);
        return res.status.json({
            success:false,
            message:error.message,
        })
    }
}

//get all ratings
exports.getAllRating = async(req, res) => {
    try {
        const allReviews = await RatingAndReview.find({}).sort({rating:'desc'})
                                    .populate({
                                        path:"user",
                                        select:"firstName, lastName, email, image",
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName",
                                    })
                                    .exec();
        
        return res.status(200).json({
            success:true,
            message:"All reviews fetch successfully",
            data:allReviews,
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

//get average rating
exports.getAverageRating = async(req, res) => {
    try {
        //get course id
        const courseId = req.body.courseId;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])

        //return rating
        if(result.length > 0 ) {
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating or review exist
        return res.status(200).json({
            success:true,
            message:"Average Rating is 0, No Rating given till now",
            averageRating:0
        });
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}