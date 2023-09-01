import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import IconBtn from '../../../../common/IconBtn';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourse = () => {

    const {register, handleSubmit, setValue, getValues} = useForm();
    const dispatch = useDispatch();
    const {course} = useSelector((state) => state.course);
    const {token} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        if(course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public", true)
        }
    }, [])

    const goBack = () => {
        dispatch(setStep(2));
    }

    const goToCourses = () => {
        dispatch(resetCourseState());
        //navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async() => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true || (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus);

        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if(result) {
            goToCourses();
        }

        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }
  return (
    <div className='text-richblack-200 flex w-[75%] mx-auto justify-center flex-col bg-richblack-800 p-6 rounded-md'>
        <p className='text-xl text-richblack-200 font-semibold'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)} className=''>
            <div>
                <label>
                    <input
                        type='checkbox'
                        id='public'
                        {...register("public")}
                    />
                    <span>Make this Course as Public</span>
                </label>
            </div>

            <div className='flex justify-between items-center mt-5'>
                <button disabled={loading} type='button' onClick={goBack} className='px-6 py-2 bg-richblack-700 rounded-lg'>
                    Back
                </button>

                <IconBtn disabled={loading} text="Save Changes"/>
            </div>
        </form>
    </div>
  )
}

export default PublishCourse
