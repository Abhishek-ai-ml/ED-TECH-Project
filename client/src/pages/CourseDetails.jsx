import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';

const CourseDetails = () => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state) => state.course);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {courseId} = useParams();

    const [courseData, setCourseData] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async() => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result);
            }catch(error) {
                console.log("Could not fetch course Details");
            }
        }
        getCourseFullDetails();
    }, [courseId])

    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData])

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures +=sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);
    }, [courseData])

    const handleBuyCourse = () => {
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"You are not Logged In",
            text2:"Please Login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if(loading || !courseData) {
        return (
            <div>Loading...</div>
        )
    }

    if(!courseData.success) {
        return (
            <div>
                <Error/>
            </div>
        )
    }

    const {
        _id: course_id,
        courseName,
        courseDescription,
        price,
        thumbnail,
        courseContent,
        whatYouWillLearn,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt
    } = courseData.data?.courseDetails;

  return (
    <div>
        

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
