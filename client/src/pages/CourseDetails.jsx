import React, { useEffect, useState } from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import {BiInfoCircle} from 'react-icons/bi'
import {HiOutlineGlobeAlt} from 'react-icons/hi'
import {FaCaretRight} from 'react-icons/fa'
import CourseAccordianBar from '../components/core/Course/CourseAccordianBar';
import { addToCart } from '../slices/cartSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import { toast } from 'react-hot-toast';


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
                console.log("RESPONSE INISDE COURSE DETAILS", result)
                
            }catch(error) {
                console.log("Could not fetch course Details");
            }
        }
        getCourseFullDetails();
    }, [courseId])

    console.log('COURSE DATA INSIDE COURSE DETAILS', courseData);
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [courseData])

    const [isActive, setIsActive]  = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(!isActive.includes(id) ? isActive.concat([id]) : isActive.filter((e) => e != id))
    }

    useEffect(() => {
        let lectures = 0;
        courseData?.data?.courseContent?.forEach((sec) => {
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

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Your are an Instructor, You can't buy course")
            return;
        }
        if(token) {
            dispatch(addToCart(courseData?.data))
            return;
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add to cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate('/login'),
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

    console.log("THIS IS COURSEDATA.DATA", courseData.data);
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
    } = courseData.data;

  return (
    <div className='w-full text-richblack-5 pb-12'>
        
        {/* Section 1 */}
        <section className='w-full pt-24 bg-richblack-800'>
            <div className='lg:flex flex-wrap lg:flex-nowrap justify-between max-w-maxContent w-10/12 mx-auto pb-28 relative'>
                <div className='flex flex-col py-5 gap-4 my-5 justify-center pb-10 lg:w-[50%] w-full'>
                    <h1 className='text-richblack-5 text-4xl font-bold'>{courseName}</h1>
                    
                    <div className='text-richblack-200 text-lg'>{courseDescription}</div>

                    {/* Rating part */}
                    <div></div>

                    <div className='flex gap-x-2 text-lg'>
                        <p>Created By </p>
                        <p>{instructor.firstName} {instructor.lastName}</p>
                    </div>

                    <div className='flex items-center gap-x-3 text-lg'>
                        <div className='flex gap-x-2 items-center'>
                            <BiInfoCircle/>
                            <div className='lg:flex flex-wrap lg:flex-nowrap gap-x-2'>
                                <p>Created at</p>
                                <p>{createdAt.split(':')[0].substr(0, 10)} |</p>
                                <p>{createdAt.split('T')[1].substr(0, 5)}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-x-2'>
                            <HiOutlineGlobeAlt/>
                            <p>English</p>
                        </div>
                    </div>
                </div>

                <div className='lg:w-[35%] w-full p-6 bg-richblack-700 rounded-lg flex flex-col gap-y-4 absolute lg:right-0 left-0'>
                    <div className='w-full'>
                        <img src={thumbnail} className='rounded-lg'/>
                    </div>

                    <p className='text-3xl font-semibold'>Rs. {price}</p>

                    <div className='flex flex-col gap-y-4'>
                        <button className='bg-yellow-50 text-richblack-900 font-semibold text-base py-2 rounded-lg' onClick={handleBuyCourse}> Buy Now</button>

                        <button className='bg-richblack-900 text-richblack-5 font-semibold text-base py-2 rounded-lg' onClick={handleAddToCart}>Add To Cart</button>
                    </div>

                    <div className='text-center text-sm text-richblack-100'>30-Day Money-Back Guarantee</div>

                    <div className='flex flex-col gap-y-2'>
                        <h2 className='text-xl font-semibold'>This Course Includes : </h2>
                        <div>
                            {
                                courseData.data.tag.map((t, index) => (<div className='flex gap-x-2 gap-y-3 items-center text-sm text-caribbeangreen-200 font-semibold'>
                                    <FaCaretRight/>
                                    <p key={index}>{t}</p>
                                </div>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2 */}
        <section className='w-10/12 max-w-maxContent mx-auto lg:pt-5 pt-[450px]'>
            <div className='lg:w-[60%] w-full p-6 flex flex-col gap-y-3 border-[1px] border-richblack-700'>
                <h2 className='text-3xl font-semibold'>What you'll learn</h2>
                <p className='text-base'>{whatYouWillLearn}</p>
            </div>
        </section>
        
        {/* Section 3 */}
        <section className='w-10/12 max-w-maxContent mx-auto pt-12 flex flex-col gap-y-5'>
            <h2 className='text-3xl font-semibold'>Course Content</h2>

            <div className='flex lg:w-[60%] w-full justify-between'>
                <div className='lg:flex flex-wrap lg:flex-nowrap gap-x-3'>
                    <p>{courseContent.length} section(s)</p>
                    <p>{totalNoOfLectures} lecture(s)</p>
                </div>

                <div className='text-yellow-25'>
                    <button onClick={() => setIsActive([])}>
                        Collapse all sections
                    </button>
                </div>
            </div>

            <div className='lg:w-[60%] w-full'>
                {
                    courseContent?.map((course, index) => (
                        <CourseAccordianBar
                            course={course}
                            key={index}
                            isActive={isActive}
                            handleActive={handleActive}
                        />
                    ))
                }
            </div>

            <div className='flex flex-col gap-y-3 pt-6'>
                <div className='text-3xl font-semibold'>Author</div>

                <div className='flex gap-x-3 items-center'>
                    <div className='w-[50px] h-[50px]'>
                        <img src={instructor.image} className='rounded-full w-full h-full object-cover object-center'/>
                    </div>

                    <p>{instructor.firstName} {instructor.lastName}</p>
                </div>

                <div></div>
            </div>
        </section>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails
