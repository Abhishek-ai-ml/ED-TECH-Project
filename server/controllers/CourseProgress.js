const { default: mongoose } = require('mongoose');
const CourseProgress = require('../models/CourseProgress')
const SubSection = require('../models/SubSection')


exports.updateCourseProgress = async(req, res) => {
    
    const {CourseId, subsectionId} = req.body;
    console.log(CourseId);
    const userId = req.user.id;
    const UserId = new mongoose.Types.ObjectId(userId);
    console.log("USER ID -------", typeof(UserId))
    
    try {
        //check if subsection is valid or not
        const subSection = await SubSection.findById(subsectionId);
        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:"Invalid Subsection",
            })
        }

        //check for old entry
        let courseProgress = await CourseProgress.findOne({courseID: CourseId,userId:userId});
        console.log("Course progress-----", courseProgress);
        if(!courseProgress) {
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist",
            })
        }
        else {
            //check for re-completng video/subsection
            if(courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(400).json({
                    success:false,
                    message:"Subsection already completed"
                })
            }

            //push into completed videos
            courseProgress.completedVideos.push(subsectionId);
        }
        await courseProgress.save();
        return res.status(200).json({
            success:true,
            message:"Coures Progress Updated Successfully",
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Interal Server Error",
        }
        )
    }
}