import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

export default function EditCourse(){
    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)

    console.log("COURSE DATA", course);

    useEffect(() => {
        const populateCourseDetails = async() => {
            setLoading(true)
            const result  = await getFullDetailsOfCourse(courseId, token);

            if(result?.courseDetails) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.courseDetails))
            }
            setLoading(false)
            console.log("FULL COURSE DETAILS", result);
        }
        populateCourseDetails();
    }, [])

    

  if(loading) {
    return (
        <p>Loading...</p>
    )
  }
  return (
    <div className='w-full pt-10 mx-auto flex flex-col'>
        <h1 className='text-3xl text-richblack-5 font-semibold pb-3 pl-10'>Edit Course</h1>
        <div className='flex justify-center mx-auto w-[55%]'>
            {
                course ? (<RenderSteps/>) : (<p>Courses Not Found</p>)
            }
        </div>
    </div>
  )
}
