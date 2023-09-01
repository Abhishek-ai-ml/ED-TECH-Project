import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import { Outlet, useParams } from 'react-router-dom';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);

    const {courseId} = useParams();
    const {token} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async() => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }

        setCourseSpecificDetails();
    }, [])
  return (
    <div>
        <div className='flex w-full gap-x-5 pt-10 relative'>
            <div className='w-[20%] relative'><VideoDetailsSidebar setReviewModal={setReviewModal}/></div>

            <div className='w-[70%] mx-auto pt-5'>
                <Outlet/>
            </div>
        </div>

        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
    </div>
  )
}

export default ViewCourse
