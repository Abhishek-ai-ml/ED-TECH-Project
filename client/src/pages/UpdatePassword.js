import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import { resetPassword } from '../services/operations/authAPI';
import {HiArrowLongLeft} from 'react-icons/hi2'


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [formData, setFormData] = useState({
        password:"",
        confirmPassword:""
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading}  = useSelector( (state) => state.auth);

    const handleOnChange = (event) => {
        setFormData( (prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value,
            }
        ))
    }

    const {password, confirmPassword} = formData;

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }
  return (
    <div>
      {
        loading ? (
            <div>Loading ...</div>
        ) : (
            <div className='flex flex-col gap-y-3 justify-center mx-auto w-[508px] items-start text-richblack-25 h-screen translate-x-[15%] -translate-y-[10%]'>
                <h1 className='text-richblack-5 font-semibold font-inter text-3xl'>Choose new Password</h1>
                <p className='text-richblack-100 text-lg font-inter font-normal w-[444px]'>Almost done. Enter your new password and you're all set.</p>

                <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-10 mt-3'>

                    <label className='flex flex-col gap-y-2'>
                        <p className='text-richblack-5 font-inter font-normal text-sm'>New Password <span className="text-pink-200 font-medium text-sm">*</span></p>
                        <div className='relative'>
                            <input
                                required
                                type={showPassword? "text":"password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                className='bg-richblack-800 w-[444px] rounded-lg p-3 text-base font-medium text-richblack-5 font-inter'
                            />

                            <span onClick={() => setShowPassword((prev) => !prev)} className='absolute right-5 top-[25%]'>
                                {
                                    showPassword ? <AiFillEyeInvisible className='text-[25px]'/> : <AiFillEye className='text-[25px]'/>
                                }
                            </span>
                        </div>
                    </label>

                    <label className='flex flex-col gap-y-2'>
                        <p className='text-richblack-5 font-inter font-normal text-sm'>Confirm New Password <span className="text-pink-200 font-medium text-sm">*</span></p>
                        <div className='relative'>
                            <input
                                required
                                type={showConfirmPassword? "text":"password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                className='bg-richblack-800 w-[444px] rounded-lg p-3 text-base font-medium text-richblack-5 font-inter'
                            />

                            <span onClick={() => setShowConfirmPassword((prev) => !prev)} className='absolute right-5 top-[25%]'>
                                {
                                    showConfirmPassword ? <AiFillEyeInvisible className='text-[25px]'/> : <AiFillEye className='text-[25px]'/>
                                }
                            </span>
                        </div>
                    </label>

                    <button type='submit' className='w-[444px] text-center rounded-lg p-3   bg-yellow-50 text-richblack-900 text-base font-medium'>
                        Reset Password
                    </button>
                </form>

                <div>
                    <Link to="/login">
                        <div className='flex items-center gap-x-2 text-base font-medium'>
                            <HiArrowLongLeft/>
                            <p>Back to Login</p>
                        </div>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default UpdatePassword
