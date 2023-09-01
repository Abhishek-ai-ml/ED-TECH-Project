import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import {FreeMode, Pagination} from 'swiper'
import Course_Card from './Course_Card'
const CourseSlider = ({Courses}) => {
  console.log("INSIDE COURSE SLIDER---", Courses);
  return (
    <>
      {
        Courses?.length ? 
        (<Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            modules={[FreeMode, Pagination]}
            breakpoints={{
              1024:{
                slidesPerView: 3,
              },
            }} 
            >
            {
                Courses?.map((course, index) => (
                    <SwiperSlide key={index}>
                        <Course_Card course={course} Height={"h-[250px]"}/>
                    </SwiperSlide>
                ))
            }
        </Swiper>) : 
        (<p>No Course Found</p>)
      }
    </>
  )
}

export default CourseSlider
