import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { apiConnector } from '../../services/apiConnector';
import { ratingsEndpoints } from '../../services/apis';

const ReviewSlider = () => {
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;

    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)


            if(data?.success) {
                setReviews(data?.data);
            }

        }
        fetchAllReviews();
    }, [])
  return (
    <div>

    </div>
  ) 
}

export default ReviewSlider
