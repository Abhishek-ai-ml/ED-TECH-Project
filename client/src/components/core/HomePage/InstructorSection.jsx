import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import HighlightText from './HighlightText'
import instructorImage from '../../../assets/Images/Instructor.png'

const InstructorSection = () => {
  return (
    <div>
      <div className='w-11/12 max-w-maxContent flex items-center gap-[150px] mx-auto'>
            <div className='w-[50%] h-fit'>
              <img src={instructorImage} className='shadow-[-25px_-27px_0px_0px_#fff]'/>
            </div>

            <div className='w-[50%] h-fit flex flex-col gap-5 mx-auto'>
              <div className='text-4xl text-white font-bold w-[40%]'>Become an <HighlightText text={"instructor"}/></div>
              <p className='text-base text-richblack-400 w-[80%]'>Instructor from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love</p>
              <div className='flex items-start mt-10'>
                <CTAButton active={true} linkto={"/signup"}>
                  <div className='flex items-center gap-3'>
                    Start Teaching Today
                    <FaArrowRight/>
                  </div>
                </CTAButton>
              </div>
            </div>
        </div>
    </div>
  )
}

export default InstructorSection
