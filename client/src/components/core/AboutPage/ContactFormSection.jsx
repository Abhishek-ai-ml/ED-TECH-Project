import React from 'react'
import ContactUsForm from '../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-3 pb-[300px] md:pb-[400px] lg:pb-32 pt-32'>
        <h1 className='text-4xl font-semibold text-richblack-5 text-center'>
            Get in Touch
        </h1>

        <p className='text-base text-richblack-300 font-medium text-center leading-6'>
            We'd love to here for you, Please fill out this form
        </p>

        <div>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection
