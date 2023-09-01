import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyCourse = () => {
      const courses = cart.map((course) => course._id);
      console.log("Bought these course:", courses);
      buyCourse(token, courses, user, navigate, dispatch)
    }
  return (
    <div className='flex flex-col px-5 py-3 bg-richblack-800 rounded-xl h-fit w-full gap-y-1 border-[2px] border-richblack-700'>

        <p className='text-base text-richblack-300'>Total:</p>
        <p className='text-3xl text-yellow-50 font-semibold pb-8'>₹ {total}</p>

        <IconBtn 
            text="Buy Now"
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount
