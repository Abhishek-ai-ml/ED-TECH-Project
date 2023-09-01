import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../slices/courseSlice';
import IconBtn from '../../common/IconBtn';
import CoursesTable from './InstructorCourses/CoursesTable';

const MyCourses = () => {
    const {token} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);

    useEffect( () => {
        const fetchCourses = async() => {
            const result  = await fetchInstructorCourses(token);

            if(result) {
                setCourses(result);
            }
        }
        fetchCourses();
    }, [])
  return (
    <div className='w-full flex flex-col items-center mx-auto mt-12'>
        <div className='text-richblack-5 w-9/12 flex justify-between'>
            <h1 className='text-3xl font-semibold'>My Courses</h1>
            <IconBtn
                text="Add Course"
                onclick={() => navigate("/dashboard/add-course")}
            />
        </div>
        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
  )
}

export default MyCourses
