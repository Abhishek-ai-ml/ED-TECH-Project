import React, { useEffect } from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {apiConnector} from '../../../services/apiConnector'
import CountryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState:{errors, isSubmitSuccessfull}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data", data);
        try {
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndPoint.CONTACT_US_API, data);
            const response = {status:"Ok"};
            console.log("Logging response", response);
            setLoading(false);
        }catch(error) {
            console.log("Error message", error.message);
            setLoading(false);
        }
    }

    useEffect( ()=> {
        if(isSubmitSuccessfull) {
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:""
            })
        }
    }, [reset, isSubmitSuccessfull])
  return (
    <form onSubmit={handleSubmit(submitContactForm)} className='w-[600px] flex flex-col gap-12'>
        <div className='flex flex-col gap-y-5 pt-10'>
            <div className='flex gap-5 justify-center w-full'>
                {/* First name */}
                <div className='flex flex-col w-[50%] gap-1'>
                    <label htmlFor='firstName' className='text-richblack-5 text-sm font-normal'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='Enter First Name'
                        className='bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium'
                        {...register("firstName", {required:true})}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please Enter Your Name
                            </span>
                        )
                    }
                </div>
                
                {/* LAst name */}
                <div className='flex flex-col w-[50%] gap-1'>
                    <label className='text-richblack-5 text-sm font-normal'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='Enter Last Name'
                        className='bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium'
                        {...register("lastName")}
                    />
                </div>
            </div>

            {/* Email */}
            <div className='flex flex-col w-full gap-1'>
                <label className='text-richblack-5 text-sm font-normal'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Email Address'
                    className='bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>Please Enter Your Email Address</span>
                    )
                }
            </div>

            {/* Phone Number */}
            <div className='flex flex-col gap-1'>
                <label htmlFor='phoneNumber' className='text-richblack-5 text-sm font-normal'>Phone Number</label>

                <div className='flex gap-x-5'>
                    {/* DropDown */}
                    <div className='flex flex-col w-[12%]'>
                        <select 
                        name='dropdown'
                        id='dropdown'
                        className=' bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium'
                        {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element, index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className='flex flex-col w-full'>
                        <input
                            type='number'
                            name='phoneNumber'
                            id='phoneNumber'
                            placeholder='12345 67890'
                            className=' bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium w-full'
                            {...register("phoneNumber", {required:{value:true, message:"Please Enter Your Phone Number"}, maxLength:{value:10, message:"Invalid Phone Number"}, minLength:{value:8, message:"Invalid Phone Number"}})}
                        />
                    </div>
                </div>
                {
                    errors.phoneNumber && (
                        <span>
                            {errors.phoneNumber.message}
                        </span>
                    )
                }
            </div>
            {/* Message */}
            <div className='flex flex-col w-full gap-1'>
                <label htmlFor='message' className='text-richblack-5 text-sm font-normal'>Message</label>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your Message Here'
                    className='bg-richblack-800 rounded-lg p-3 text-base text-richblack-200 font-medium'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please Enter Your Message
                        </span>
                    )
                }
            </div>
        </div>

        <button type='submit' className='bg-yellow-50 rounded-lg p-3 text-base text-richblack-900 font-medium w-full'>
                Send Message
        </button>
    </form>
  )
}

export default ContactUsForm
