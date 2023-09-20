import React, { useEffect, useState } from 'react'
import { getInstructorData } from '../../../../services/operations/profileAPI';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import InstructorChart from './InstructorChart';

const Instructor = () => {

    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    

    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true);
            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if(instructorApiData.length) {
                setInstructorData(instructorApiData);
            }
            if(result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

  return (
    <div className='text-richblack-5 mb-5 w-full'>
        <div className='w-9/12 flex flex-col mx-auto items-start mt-12 mb-5'>
            <h1 className='flex items-center text-2xl font-bold'>Hi {user?.firstName} 👋</h1>
            <p className='text-richblack-200 font-medium mt-3'>Let's Start Something New</p>
        </div>

        {
            loading ? (<div className='flex justify-center items-center mx-auto spinner'></div>) :
             courses.length > 0 ? 
             (<div className='flex flex-col gap-y-3'>
                <div className='lg:pb-0 pb-8'>
                    <div className='lg:flex flex-wrap lg:flex-nowrap w-9/12 mx-auto gap-x-3 lg:h-[450px]'>
                        <InstructorChart courses = {instructorData}/>

                        <div className='w-full lg:w-[25%] bg-richblack-800 p-8 flex flex-col gap-y-5 lg:rounded-md'>
                            <p className='text-lg font-bold'>Statistics</p>
                            <div>
                                <p className='text-lg text-richblack-200'>Total Courses</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{courses.length}</p>
                            </div>

                            <div>
                                <p className='text-lg text-richblack-200'>Total Students</p>
                                <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                            </div>

                            <div>
                                <p className='text-lg text-richblack-200'>Total Income</p>
                                <p className='text-3xl font-semibold text-richblack-50'>Rs. {totalAmount}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-9/12 flex flex-col mx-auto justify-center bg-richblack-800 rounded-lg p-6 gap-y-6'>
                    <div className='flex w-full justify-between'>
                        <p className='text-lg font bold'>Your Courses</p>
                        <Link to="/dashboard/my-courses">
                            <p className='text-xs font-semibold text-yellow-50'>View All</p>
                        </Link>
                    </div>

                    <div className='lg:flex flex-wrap lg:flex-nowrap gap-x-3'>
                        {
                            courses.slice(0, 3).map((course) => (
                                <div className='lg:w-[33%] w-full flex flex-col gap-y-2'>
                                    <img src={course.thumbnail} className='w-full object-cover rounded-lg h-[200px]'/>

                                    <div className='flex flex-col gap-y-2'>
                                        <p className='text-sm font-medium text-richblack-50'>{course.courseName}</p>
                                        <div className='flex gap-x-2'>
                                            <p className='text-xs font-medium text-richblack-300'>{course.studentsEnrolled.length}</p>
                                            <p className='text-xs font-medium text-richblack-300'> |</p>
                                            <p className='text-xs font-medium text-richblack-300'>RS. {course.price}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
             </div>) :

             (<div className='flex flex-col mx-auto items-center bg-richblack-800 w-8/12 p-10 rounded-xl gap-y-10'>
                <p className='text-richblack-200 text-xl font-semibold'>You have not created any courses yet</p>
                <Link to={'/dashboard/add-course'} className='bg-yellow-50 px-4 py-2 text-richblack-900 text-lg rounded-lg font-semibold'>
                    Create a Course
                </Link>
             </div>)
        }
    </div>
  )
}

export default Instructor
