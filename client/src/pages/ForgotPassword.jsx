import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import {HiArrowLongLeft} from 'react-icons/hi2'
import CTAButton from '../components/core/HomePage/CTAButton';

const ForgotPassword = () => {

    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

  return (
    <div>
      {
        loading ? (
            <div>Loading ...</div>
        ) : 
        (
            <div className='flex flex-col gap-y-3 justify-center mx-auto w-[508px] items-start text-richblack-25 h-screen translate-x-[15%] -translate-y-[10%]'>
                <h1 className='text-richblack-5 font-semibold font-inter text-3xl'>
                    {
                        !emailSent ? "Reset Your Password" : "Check Your Email"
                    }
                </h1>

                <p className='text-richblack-100 text-lg font-inter font-normal w-[444px]'>
                    {
                        !emailSent ?
                        "Have no fear. We'll email you instructions to reset your passwords. If you dont have access to your email we can try account recovery" :
                        `We have sent the reset email to ${email}`
                    }
                </p>

                <form onSubmit={handleOnSubmit} className='flex flex-col gap-y-10 mt-3'>
                    {
                        !emailSent && (
                            <label className='flex flex-col gap-y-2'>
                                <p className='text-richblack-5 font-inter font-normal text-sm'>Email Address <span className="text-pink-200 font-medium text-sm">*</span></p>
                                <input
                                    type='email'
                                    required
                                    name='email'
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder='Enter Your Email Address'
                                    className='bg-richblack-800 w-[444px] rounded-lg p-3 text-base font-medium text-richblack-5 font-inter'
                                />
                            </label>
                        )
                    }

                    <button type='submit' className='w-[444px] text-center rounded-lg p-3   bg-yellow-50 text-richblack-900 text-base font-medium'>
                        {
                            !emailSent ? "Reset Password" : "Check Your Email"
                        }
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

export default ForgotPassword
