import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div>
                    <img src={course?.thumbnail} className={`${Height}`}/>
                </div>

                <div>
                    <p>{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                    <div>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count = {avgReviewCount}/>
                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>

                    <p>{course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card
