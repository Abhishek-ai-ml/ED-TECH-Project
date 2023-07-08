import React from 'react'
import ContactUsForm from '../components/core/ContactPage/ContactUsForm'
import {HiChatBubbleLeftRight} from 'react-icons/hi2'
import {BsGlobeAmericas} from 'react-icons/bs'
import {MdCall} from 'react-icons/md'

const Contact = () => {
  return (
    <div className='w-11/12 flex justify-between mx-auto pt-20'>
      {/* Section 1 */}
      <section className='w-[40%] flex flex-col bg-richblack-800 h-fit p-8 rounded-lg gap-y-8'>
        <div className='flex flex-col relative pl-8'>
            <div className='absolute -left-1 text-richblack-100 text-2xl'><HiChatBubbleLeftRight/></div>
            <div className='text-richblack-5 text-lg font-semibold'>Chat on us</div>
            <div className='text-richblack-200 font-medium text-sm'>Our friendly team is here to help.<br/> @mail address</div>
        </div>

        <div className='flex flex-col relative pl-8'>
            <div className='absolute -left-1 text-richblack-100 text-2xl'><BsGlobeAmericas/></div>
            <div className='text-richblack-5 text-lg font-semibold'>Visit us</div>
            <div className='text-richblack-200 font-medium text-sm'>Come and say hello at our office HQ.<br/> Here is the location/ address</div>
        </div>

        <div className='flex flex-col relative pl-8'>
            <div className='absolute -left-1 text-richblack-100 text-2xl'><MdCall/></div>
            <div className='text-richblack-5 text-lg font-semibold'>Call us</div>
            <div className='text-richblack-200 font-medium text-sm'>Mon - Fri From 8am to 5pm<br/>+123 456 7890</div>
        </div>
      </section>

      {/* Section 2 */}
      <section className='border-[1px] border-richblack-700 p-8 rounded-xl flex flex-col justify-center mx-auto items-center'>
        <h2 className='text-4xl font-semibold text-richblack-5 w-[595px]'>Got a Idea? We’ve got the skills. Let’s team up</h2>
        <p className='text-richblack-300 font-medium text-base w-[595px]'>Tall us more about yourself and what you’re got in mind.</p>

        <ContactUsForm/>
      </section>
    </div>
  )
}

export default Contact
