import React from 'react'
import { Link } from 'react-router-dom';
import {FaArrowRight} from 'react-icons/fa';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearninglanguageSection from '../components/core/HomePage/LearninglanguageSection';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';


const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto w-11/12 flex flex-col items-center text-white justify-between max-w-maxContent'>
        <Link to={"/signup"}>
          <div className='group mt-16 p-1 mx-auto rounded-full font-bold bg-richblack-800 text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight/>
            </div>
          </div>
        </Link>

        <div className='text-center text-4xl font-semibold mt-7'>
          Empower Your Furture with
          <HighlightText text={"Coding Skills"}/>
        </div>

        <div className='w-[70%] text-lg  text-center text-richblack-300 mt-4'>
          With our online coding course, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on project, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex gap-7 mt-8'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/login"}>Book a Demo</CTAButton>
        </div>

        <div className='relative flex flex-col justify-center mx-3 my-12 shadow-blue-200'>
          <div className='absolute top-10 z-10 left-[450px] mx-auto w-[300px] h-[100px] shadow-[0px_-10px_120px_0px_#c3dafe] bg-transparent'></div>
          <video muted loop autoPlay className='z-20 shadow-[27px_25px_0px_0px_#fff]'>
            <source src={Banner}/>
          </video>
        </div>

        {/* Code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading = {<div className='text-4xl font-bold'>Unlock your <HighlightText text={"coding potential"}/> with our online courses</div>}
            subheading = {"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
            ctabtn1 = {
              {
                btnText: "Try it Yourself",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2 = {
              {
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }
            }
            codeblock = {`<DocType html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav></body></html>`}
            codeColor = {"white"}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading = {<div className='text-4xl font-bold'>Start <HighlightText text={"coding in seconds"}/> </div>}
            subheading = {"Go ahead give it a try. Our hands on learning environment means you will be writing real code from our very first lesson"}
            ctabtn1 = {
              {
                btnText: "Continue lesson",
                linkto: "/signup",
                active: true,
              }
            }
            ctabtn2 = {
              {
                btnText: "Learn more",
                linkto: "/login",
                active: false,
              }
            }
            codeblock = {`<DocType html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav></body></html>`}
            codeColor = {"yellow"}
          />
        </div>

        <ExploreMore/>
      </div>

      {/* Section 2 */}
      <div className='w-screen bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-[310px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto'>
              <div className='h-[150px]'></div>
              <div className='flex gap-7 text-white'>
                <CTAButton active={true} linkto={"/signup"}>
                  <div className='flex items-center gap-3'>
                    Explore Full Catalog
                    <FaArrowRight/>
                  </div>
                </CTAButton>

                <CTAButton active={false} linkto={"/login"}>
                  <div>
                    Learn more
                  </div>
                </CTAButton>
              </div>
            </div>
        </div>

        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col gap-7 justify-center'>
            <div className='flex gap-20 mt-[90px] '>
              <div className='text-4xl font-semibold w-[50%]'>
                Get the Skills you need for a 
                <HighlightText text={"Job that is in demand."}/>
              </div>

              <div className='flex flex-col gap-12 w-[40%]'>
                <div className='text-[16px] font-inter text-richblack-700'>
                  The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>

                <div className='flex items-start'>
                  <CTAButton active={true} linkto={"/signup"}>
                      Learn More
                  </CTAButton>
                </div>
              </div>
            </div>
        </div>

        <TimelineSection/>

        <LearninglanguageSection/>
      </div>

      {/* Section 3 */}
      <div className='w-screen h-fit bg-richblack-900  py-[150px] mx-auto'>
        <InstructorSection/>

        <h2 className='text-center text-4xl font-semibold mt-32 text-white'>Review from other learners</h2>
      </div>

      {/* Footer */}
    </div>
  )
}

export default Home
