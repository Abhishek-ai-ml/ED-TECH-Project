import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from '../HomePage/CTAButton'

const LearningGridArray = [
    {
        order:-1,
        heading: "World-Class Learning For",
        highlightText:"Anyone, Anywhere",
        description:"Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink:"/",
    }, 
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"The learning process uses the namely online and offline.",
    },
    {
        order:3,
        heading:"Certification",
        description:"You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order:4,
        heading:"Rating \"Auto-grading\"",
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    }
]

const LearningGrid = () => {
  return (
    <div className='w-11/12 grid mx-auto grid-col-1 lg:grid-cols-4 mb-10'>
        {
            LearningGridArray.map( (card, index) => {
                return (
                    <div key={index}
                    className={`${index === 0 && "lg:col-span-2"}
                    ${card.order %2 === 1 ? "bg-richblack-700" : "bg-richblack-800"}
                    ${card.order === 3 && "lg:col-start-2"}`}>
                        {
                            card.order < 0 ? 
                            (<div className='bg-richblack-900 flex flex-col gap-y-4'>
                                <div className='font-semibold text-4xl text-richblack-5 flex flex-col gap-y-2'>
                                    <p>{card.heading}</p>
                                    <HighlightText text={card.highlightText}/>
                                </div>

                                <p className='text-base font-medium text-richblack-300 lg:w-[560px] '>{card.description}</p>

                                <div className='pt-10 flex place-item-start'>
                                    <CTAButton active={true} linkto={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </div>
                            </div>) : 
                            (<div className='flex flex-col gap-y-8 px-8 py-5 pt-10 h-[280px]'>
                                <h1 className='text-richblack-5 font-semibold text-lg items-center'>{card.heading}</h1>
                                <p className='text-richblack-100 text-sm font-normal'>{card.description}</p>
                            </div>)
                        }
                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid
