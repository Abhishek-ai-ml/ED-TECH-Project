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
    <div className='flex flex-col gap-y-3'>
        <div className='flex w-10/12 mx-auto justify-between'>
            {
                steps.map( (item) => (
                    <>
                        <div>
                            <div className={`${step === item.id ? "bg-yellow-900 border-[1px] border-yellow-50 text-yellow-50" : "border-richblack-700 bg-richblack-800 text-richblack-300"} w-12 h-12 rounded-full flex justify-center items-center`}>
                                {
                                    step > item.id ? (<FaCheck/>) : (item.id)
                                }
                            </div>
                        </div>
                    </>
                ))
            }
        </div>

        <div className='flex w-10/12 mx-auto justify-between'>
            {
                steps.map( (item) => (
                    <>
                        <div>
                            <p className='text-richblack-5 text-sm font-normal'>{item.title}</p>
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
