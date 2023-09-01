import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png';
import compare_with_others from '../../../assets/Images/Compare_with_others.png';
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from './CTAButton';

const LearninglanguageSection = () => {
  return (
    <div className='w-11/12 mx-auto mt-[170px]'>
        <div className='flex flex-col gap-5 mx-auto'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for
                <HighlightText text={"learning any language"}/>
            </div>

            <div className='text-center text-richblack-600 text-md mx-auto font-bold w-full lg:w-[48%]'>
                Using spin making learning multiple language easy. With 20+ languages realistic voice-over, progress tracking, custom suchedule and more.
            </div>

            <div className='mx-auto flex flex-wrap lg:flex-nowrap items-center justify-center mt-5'>
                <img src={know_your_progress} className='lg:-mr-28'/>
                <img src={compare_with_others}/>
                <img src={plan_your_lessons} className='lg:-ml-36'/>
            </div>

            <div className='flex items-center mx-auto pb-[100px]'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </CTAButton>
            </div>
        </div>
    </div>
  )
}

export default LearninglanguageSection
