import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {GiNinjaStar} from "react-icons/gi"
import {RiDeleteBin6Line} from "react-icons/ri"
import { removeFromCart } from '../../../../slices/cartSlice'
import ReactStars from "react-rating-stars-component";

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
        {
            cart.map( (course, index) => (
                <div className='flex justify-between gap-x-3 border-b-[1px] border-b-richblack-600 p-5'>
                    <div className='flex w-[80%]  gap-x-12'>
                        <img src={course?.thumbnail} className='w-[40%] rounded-xl'/>
                        <div className='flex flex-col'>
                            <p className='text-xl text-richblack-5'>{course?.courseName}</p>
                            <p className='text-base text-richblack-300'>{course?.category?.name}</p>
                            <div className='flex items-center gap-x-3'>
                                <span className='text-yellow-50'>4.8</span>
                                <ReactStars
                                    count={5}
                                    size={20}
                                    edit={false}
                                    activeColor = "#ffd700"
                                    emptyIcon={<GiNinjaStar/>}
                                    fullIcon = {<GiNinjaStar/>}
                                />

                                <span className='text-base text-richblack-300'>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-3'>
                        <button onClick={() => dispatch(removeFromCart(course._id))} className='px-3 py-3 bg-richblack-700 border-[1px] border-richblack-500 rounded-lg flex items-center text-base gap-x-1 font-semibold text-pink-300'>
                            <RiDeleteBin6Line/>
                            <span>Remove</span>
                        </button>
                        <p className='text-3xl text-yellow-50 font-semibold'>₹ {course?.price}</p>
                    </div>
                </div>
            ))
        }  
    </div>
  )
}

export default RenderCartCourses
