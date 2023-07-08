import React, { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
]
const ExploreMore = () => {
    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
  return (
    <div>
        <div className='text-4xl font-semibold text-center'>
            Unlock the
            <HighlightText text ={"Power of Code"}/>
        </div>

        <p className='text-center text-richblack-300 text-md mt-3'>Learn to build anything you can imagine</p>

        <div className=' w-fit mx-auto mt-5 flex bg-richblack-800 rounded-full justify-center mb-5 px-1 py-1'>
            {
                tabsName.map( (element, index) => {
                    return (
                        <div className={`text-[16px] flex items-center gap-2
                        ${currentTab === element? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:ring-richblack-5 px-7 py-2`} key={index} onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='relative pb-[250px] w-11/12'>
            <div className='flex gap-12 pt-10 absolute top-0 justify-center mx-auto -left-[30%] w-[1072px]'>
                {
                    courses.map( (element, index) => {
                        return (
                            <CourseCard key={index}
                                cardData = {element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default ExploreMore