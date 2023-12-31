import React from 'react';
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}) => {
  return (
    <div className={`w-full flex-col lg:flex ${position} my-20 justify-evenly lg:justify-between gap-32`}>

        {/* Section 1 */}
        <div className='w-full lg:w-[50%] flex flex-col gap-8'>
            {heading}
            <div className='font-bold text-richblack-200'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='relative lg:mt-0 mt-10 flex h-fit w-full lg:w-[50%] text-[15px] py-4 bg-richblack-800 rounded-xl p-5 font-inter border-[2px] border-richblack-700'>
            <div className={`absolute top-32 lg:top-28 left-[250px] ${position === "lg:flex-row-reverse"? "shadow-[0px_0px_500px_80px_#63b3ed]": "shadow-[0px_0px_300px_100px_#f6e05e]"}  border-none  bg-richblack-800`}></div>
            <div className='flex flex-col text-richblack-300 font-inter font-bold w-[10%]'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>

            <div className={`lg:w-[500px] flex flex-col gap-2 font-mono font-bold pr-2 ${codeColor}`}>
                <TypeAnimation
                    sequence={[codeblock, 2000, ""]}
                    repeat={Infinity}
                    cursor={true}
                    omitDeletionAnimation={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                            color:`${codeColor}`,
                        }
                    }
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks
