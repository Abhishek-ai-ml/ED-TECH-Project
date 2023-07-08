import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] to-[#12D8FA] bg-[#A6FFCB] font-bold'>
        {" "}
      {text}
    </span>
  )
}

export default HighlightText
