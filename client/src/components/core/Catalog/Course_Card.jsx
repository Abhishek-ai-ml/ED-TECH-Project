import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';

const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    console.log("COURSE IN COURSE CARD ------", course);
    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])

    console.log("COURSE IN COURSE CARD", course);
    console.log("AVG REVIEW COUNT", avgReviewCount);
  return (
    <div className='w-full'>
        <Link to={`/courses/${course._id}`}>
            <div className='flex flex-col gap-y-2'>
                <div>
                    <img src={course?.thumbnail} className={`${Height} rounded-xl w-full object-cover`}/>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <p className='text-xl font-semibold'>{course?.courseName}</p>
                    {/* <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p> */}

                    <div className='flex gap-x-2 items-center'>
                        <span className='text-yellow-50'>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count = {avgReviewCount}/>
                        <span className='text-richblack-200'>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>

                    <p className='text-xl font-semibold'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card
