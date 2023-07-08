import React from 'react'

import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png';

const timeline = [
    {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo:Logo2,
        heading:"Responsiblity",
        Description:"Students will always be our top priority",
    },
    {
        Logo:Logo3,
        heading:"Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo:Logo4,
        heading:"Solve the Problem",
        Description:"Code your way to a solution",
    }
]

const TimelineSection = () => {
  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
      <div className='flex gap-15 items-center mt-16'>
            <div className='flex flex-col gap-20 w-[50%]'>
                {
                    timeline.map( (element, index) => {
                        return (
                            <div className='flex gap-6' key={index}>
                                <div className='relative flex justify-center items-center w-[50px] h-[50px] bg-white  rounded-full'>
                                    <img src={element.Logo}/>
                                    <div className={`${element.heading === "Solve the Problem" ? "": "absolute -bottom-20 border-dashed border-[1px] h-[80px]"}`}></div>
                                </div>

                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className='relative'>
                <img src={timelineImage} className='z-[100]'/>
                {/* <div className='absolute top-1/2 z-10 left-5 shadow-[-14px_0px_80px_50px_#63b3ed]'></div>
                <div className='absolute top-1/2 z-10 right-5 shadow-[-14px_0px_80px_50px_#63b3ed]'></div> */}

                <div className='absolute bg-caribbeangreen-700 flex text-white uppercase py-7 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                    <div className='flex gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                        <p className='text-3xl font-bold'>10</p>
                        <p className='text-sm text-caribbeangreen-300'>Years of Experience</p>
                    </div>

                    <div className='flex gap-5 items-center px-7'>
                        <p className='text-3xl font-bold'>250</p>
                        <p className='text-sm text-caribbeangreen-300'>Type of courses</p>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default TimelineSection
