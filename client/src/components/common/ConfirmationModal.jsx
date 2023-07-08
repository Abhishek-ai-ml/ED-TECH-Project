import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='text-white absolute top-0 flex items-center w-[100vw] h-[100vh] overflow-hidden fill-transparent backdrop-blur-[2px]'>
      <div className='flex mx-auto w-fit h-fit justify-center  border-[1px] rounded-xl border-richblack-700  bg-richblack-800 flex-col gap-y-3 p-8'>
        <p className='text-richblack-5 text-3xl font-semibold'>
            {modalData.text1}
        </p>

        <p className='text-sm text-richblack-200'>
            {modalData.text2}
        </p>

        <div className='flex items-center gap-x-5'>
            <IconBtn 
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
            />

            <button onClick={modalData?.btn2Handler} className='border-[1px] border-richblack-700 p-4 py-2 rounded-lg '>
                {modalData?.btn2Text}
            </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
