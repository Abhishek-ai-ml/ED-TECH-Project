import React from 'react'
import {FaEdit} from 'react-icons/fa'

const IconBtn = ({text, onclick, children, disabled, outline=false, customClasses, type}) => {
  return (
    <button disabled={disabled} onClick={onclick} type={type} className="bg-yellow-50 relative rounded-lg flex items-center justify-center gap-x-2 py-2 px-5 h-fit">
        {/* <div className='text-richblack-900'>
            <FaEdit/>
        </div> */}

        <div className='flex items-center gap-x-5'>
            {
                children ? 
                (
                    <>
                        <span className='text-richblack-900 text-base font-medium'>
                            {text}
                        </span>
                        {children}
                    </>
                ) : 
                (<span className='text-richblack-900 text-base font-medium'>{text}</span>)
            }
        </div>
    </button>
  )
}

export default IconBtn
