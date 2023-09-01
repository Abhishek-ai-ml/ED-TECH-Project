import React from 'react'
import {MdGroup} from 'react-icons/md'
import {TbBinaryTree2} from 'react-icons/tb'

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
    console.log(currentCard);
  return (
    <div className="transition-all duration-500 ease" onClick={() => setCurrentCard(cardData.heading)}>
      <div className={`hover:cursor-pointer lg:w-full flex flex-col ${currentCard === cardData.heading ? "bg-white shadow-[27px_25px_0px_0px_#FFD60A]":"bg-richblack-800"}`}>
            <p className={`px-6 pt-8 pb-3 text-[20px] font-semibold  ${currentCard === cardData.heading? "text-richblack-800": "text-richblack-25"}`}>{cardData.heading}</p>
            <p className={`px-6 pb-[80px]  text-base ${currentCard === cardData.heading ? "text-richblack-500":"text-richblack-400"}`}>{cardData.description}</p>
            <div className='flex justify-between border-t border-richblack-300 border-dashed px-6 py-5'>
                <div className='flex items-center gap-2'>
                    <MdGroup className={`text-xl ${currentCard === cardData.heading ? "text-blue-500":"text-richblack-300"}`}/>
                    <div className={`text-[16px] ${currentCard === cardData.heading? "text-blue-500":"text-richblack-300 "}`}>{cardData.level}</div>
                </div>
                <div className={`flex items-center gap-2`}>
                    <TbBinaryTree2 className={`text-xl ${currentCard === cardData.heading ? "text-blue-500":"text-richblack-300"}`}/>
                    <div className={`text-[16px] ${currentCard === cardData.heading? "text-blue-500":"text-richblack-300"}`}>{cardData.lessionNumber} Lessons</div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default CourseCard
