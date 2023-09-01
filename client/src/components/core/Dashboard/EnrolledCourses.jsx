import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';


const EnrolledCourses = () => {

  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrolledCourses = async() => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    }catch(error) {
      console.log("Unable to Fetch Enrolled Courses")
    }
  }

  useEffect( () => {
    getEnrolledCourses();
  }, []);

  return (
    <div className='flex flex-col w-10/12 max-w-maxContent mx-auto pt-20 text-white'>
        <div className='text-3xl text-richblack-5 font-semibold'>Enrolled Courses</div> 

        {
          !enrolledCourses ? (<div>Loading...</div>)
           : 
           !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) : 
           (
            <div className='flex flex-col w-full'>
              <div className='flex justify-between p-4 bg-richblack-700 text-richblack-100 rounded-t-lg w-full text-center'>
                <p className='flex place-content-start w-[50%]'>Course Name</p>
                <p className='w-[20%]'>Duration</p>
                <p className='w-[30%]'>Progress</p>
              </div>

              {/* Cards Start */}
              {
                enrolledCourses.map( (course, index) => (
                  <div className='flex justify-between p-5 border-[2px] border-richblack-800 rounded-lg w-full '>
                      <div className='flex w-[50%] gap-x-5 place-content-start hover:cursor-pointer'
                        onClick={() => {
                          navigate(
                            `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                          )
                        }}  
                      >
                        <img src={course.thumbnail} className='w-[25%] rounded-lg'/>
                        <div className='flex flex-col place-content-start'>
                          <p>{course.courseName}</p>
                          <p className='text-richblack-200 text-sm'>{course.courseDescription}</p>
                        </div>
                      </div>

                      <div className='w-[20%] text-center'>
                        {course?.totalDuration}
                      </div>

                      <div className='w-[30%] text-center flex flex-col gap-y-2'>
                        <p className='flex place-content-start'>Progress: {course.progressPercentage || 0}%</p>
                        <ProgressBar 
                          completed={course.progressPercentage || 0}
                          height='10px'
                          width='80%'
                          isLabelVisible={false}
                        />
                      </div>
                  </div>
                ))
              }
            </div>
           )
        }     
    </div>
  )
}

export default EnrolledCourses
