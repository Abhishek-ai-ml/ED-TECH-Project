import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {

    const {user} = useSelector((state) => state.profile);
    console.log("Inside myprofile",user)
    const navigate = useNavigate();
  return (
    <div className='text-white w-9/12 flex flex-col items-start mx-auto gap-y-6 mt-8 mb-3'>
        <h1 className='text-3xl font-inter font-semibold'>My Profile</h1>

        {/* Section 1 */}
        <div className='flex justify-between w-full mx-auto bg-richblack-800 p-8 rounded-lg items-center border-[1px] border-richblack-700'>
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


        {/* Section 2 */}
        <div className='flex justify-between w-full mx-auto bg-richblack-800 p-8 rounded-lg items-center border-[1px] border-richblack-700'>
            <div className='flex flex-col gap-y-12'>
                <h2 className='text-lg font-semibold text-richblack-5'>About</h2>

                <div>
                    {
                        user?.additionalDetails?.about ? 
                        (<div className='text-sm font-medium'>
                            {user?.additionalDetails?.about}
                        </div>) : 
                        (<div className='text-sm font-medium'>Write here about yourself</div>)
                    }
                </div>
            </div>

            <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>

        {/* Section 3 */}
        <div className='flex justify-between w-full mx-auto bg-richblack-800 p-8 rounded-lg  border-[1px] border-richblack-700'>
            <div className='flex flex-col gap-y-12 justify-start w-[60%]'>
               <h2 className='text-lg font-semibold text-richblack-5'>Personal Details</h2> 

               <div className='flex justify-between'>
                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>First Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                        </div>

                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>Email</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                        </div>

                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>Gender</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.gender ? (<span>{user?.additionalDetails?.gender}</span>) : (<p>-</p>)}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>Last Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.lastName ? (<span>{user?.lastName}</span>) : (<span>-</span>)}</p>
                        </div>

                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>Phone Number</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.contactNumber ? (<span>{user?.additionalDetails?.contactNumber}</span>) : (<span>-</span>)}</p>
                        </div>

                        <div>
                            <p className='text-sm text-richblack-600 mb-2'>Date of Birth</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.additionalDetails?.dateOfBirth ? (<span>{user?.additionalDetails?.dateOfBirth}</span>) : (<span>-</span>)}</p>
                        </div>
                    </div>
               </div>
            </div>

            
            <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>


    </div>
  )
}

export default MyProfile
