import React from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import CourseInformationForm from './CourseInformation/CourseInformationForm';
import PublishCourse from './PublishCourse';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';

const RenderSteps = () => {

    const {step} = useSelector((state) => state.course);

    const steps = [
        {
            id:1,
            title:"Course Information"
        },

        {
            id:2,
            title:"Course Builder"
        },

        {
            id:3,
            title:"Publish"
        },
    ]
  return (
    <div className='flex flex-col gap-y-3 w-full py-8 mx-auto'>
        <div className='flex w-10/12 mx-auto justify-between'>
            {
                steps.map( (item) => (
                    <>
                        <div className='w-full flex justify-center relative'>
                            <div className={`${step === item.id ? "bg-yellow-900 border-[1px] border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"} ${step > item.id ? "bg-yellow-900 text-yellow-50 border-[1px] border-yellow-100" : ""} w-8 h-8 rounded-full flex justify-center items-center`}>
                                {
                                    step > item.id ? (<FaCheck/>) : (item.id)
                                }
                            </div>
                            <div className={`${item.id === 3 ? "" : "absolute bottom-[50%] -right-[74px] z-50 border-b-[1px] border-dashed border-richblack-5 w-[148px] h-6"} ${item.id < step ? "border-yellow-100" : ""}`}></div>
                        </div>
                    </>
                ))
            }
        </div>

        <div className='flex w-10/12 mx-auto justify-between'>
            {
                steps.map( (item) => (
                    <>
                        <div className='w-full'>
                            <p className='text-richblack-5 text-xs font-normal flex justify-center'>{item.title}</p>
                        </div>
                    </>
                ))
            }
        </div>

        {step === 1 && <CourseInformationForm/>}
        {step === 2 && <CourseBuilderForm/>}
        {step === 3 && <PublishCourse/>} 
    </div>
  )
}

export default RenderSteps
