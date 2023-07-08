import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    console.log("Inside myprofile",user)
    const navigate = useNavigate();
  return (
    <div className='text-white w-[100%] flex flex-col items-center mx-auto gap-y-16'>
        <h1 className='text-3xl font-inter font-semibold'>My Profile</h1>

        {/* Section 1 */}
        <div className='flex justify-between w-[70%] mx-auto bg-richblack-700 p-6 rounded-lg items-center'>
            <div className='flex gap-x-3 items-center'>
                <img src={user?.image} alt={`profile-${user?.firstName}`}  className='rounded-full w-[78px] h-[78px] object-cover'/>
                <div className='flex flex-col'>
                    <p className='text-richblack-5 font-semibold text-lg'>{user?.firstName + " " + user?.lastName}</p>
                    <p className='text-richblack-300 text-sm font-normal'>{user?.email}</p>
                </div>
            </div>

            <IconBtn 
                text="Edit"
                onclick={ () => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>
    </div>
  )
}

export default MyProfile
