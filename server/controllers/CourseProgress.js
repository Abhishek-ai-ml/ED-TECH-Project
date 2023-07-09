const CourseProgress = require('../models/CourseProgress')
const SubSection = require('../models/SubSection')


exports.updateCourseProgress = async(req, res) => {
    
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;
    
    try {
        //check if subsection is valid or not
        const subSection = await SubSection.findById(subSectionId);

        if(!subSection) {
            return res.status(404).json({
                success:false,
                message:"Invalid Subsection",
            })
        }

        //check for old entry
        let courseProgress = await CourseProgress.findOne({courseID: courseId,userId:userId});

        if(!courseProgress) {
            return res.status(404).json({
                success:false,
                message:"Course Progress does not exist",
            })
        }
        else {
            //check for re-completng video/subsection
            if(courseProgress.completedVideos.includes(subSectionId)) {
                return res.status(400).json({
                    success:false,
                    message:"Subsection already completed"
                })
            }

            //push into completed videos
            courseProgress.completedVideos.push(subSectionId);
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