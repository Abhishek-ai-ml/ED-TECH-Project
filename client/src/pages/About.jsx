import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Image4 from '../assets/Images/FoundingStory.png';
import LearningGrid from '../components/core/AboutPage/LearningGrid';
import ContactFormSection from '../components/core/AboutPage/ContactFormSection';

const About = () => {
  return (
    <div>
        {/* Section 1 */}
        <section className='bg-richblack-800 flex flex-col items-center relative gap-y-5 pt-16'>
            <p className='font-medium text-base text-richblack-200 pb-5'>About Us</p>

            <header className='font-semibold text-4xl text-richblack-5 font-inter w-10/12  text-center'>
                Driving Innovation in Online Education for a 
                <HighlightText text={"Brighter Future"}/> 
            </header>

            <p className='text-richblack-300 font-medium text-base w-10/12 text-center pb-[200px]'>
                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>

            <div className='flex w-11/12 mx-auto justify-center gap-x-5 absolute top-72 md:top-44 lg:top-32 pt-72 lg:pt-[220px]'>
                <img src={BannerImage1} alt='Banner image 1' className='w-[33%]'/>
                <img src={BannerImage2} alt='Banner image 2' className='w-[33%]'/>
                <img src={BannerImage3} alt='Banner image 3' className='w-[33%]'/>
            </div>
        </section>

        {/* Section 2 */}
        <section className='bg-richblack-900 flex justify-center w-full lg:w-[1200px] pt-[250px] mx-auto pb-[100px]'>
            <div className='text-richblack-100 text-4xl text-center'>
                <span>We are passionate about revolutionizing the way we learn. Our innovative platform </span>
                <HighlightText text={"combines technology"}/>,
                <span className='text-transparent font-semibold bg-clip-text bg-gradient-to-b from-[#FF512F] to-[#F09819]'> expertise, </span>
                <span>and community to create an </span>
                <span>unparalleled educational experience.</span>

            </div>
        </section>
        <div className='border-richblack-700 border-b-[1px]'></div>

        {/* Section 3 */}
        <section className='flex flex-wrap lg:flex-nowrap w-11/12 gap-y-8  mx-auto justify-between gap-x-32 pb-[150px] pt-[100px]'>
            <div className=' w-full lg:w-[50%] flex flex-col mx-auto items-center lg:pl-20 gap-y-5'>
                <h2 className='text-transparent bg-clip-text bg-gradient-to-b from-[#833AB4] to-[#FD1D1D] text-4xl font-semibold'>Our Founding Story</h2>
                <p className='text-base text-justify font-medium text-richblack-300'>
                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                </p>

                <p className='text-base text-justify font-medium text-richblack-300'>
                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                </p>
            </div>

            <div className='w-full lg:w-[50%] flex justify-center lg:place-items-end lg:ml-20'>
                <img src={Image4} className='shadow-[0px_0px_30px_5px_#e53e3e]'/>
            </div>
        </section>

        {/* Section 4 */}
        <section className='flex flex-wrap lg:flex-nowrap w-11/12 gap-y-8  mx-auto justify-between gap-x-32 pb-[150px] pt-[50px]'>
            <div className=' w-full lg:w-[50%] flex flex-col mx-auto items-center lg:pl-20 gap-y-5'>
                <h2 className='text-transparent bg-clip-text bg-gradient-to-b from-[#833AB4] to-[#FD1D1D] text-4xl font-semibold'>Our vision</h2>
                <p className='text-base font-medium text-richblack-300 text-justify'>
                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                </p>

                
            </div>

            <div className='w-full lg:w-[50%] flex flex-col mx-auto items-center lg:pl-20 gap-y-5'>
                <h2 className='text-transparent bg-clip-text bg-gradient-to-b from-[#1FA2FF] to-[#12D8FA] text-4xl font-semibold'>Our Mission</h2>
                <p className='text-base font-medium text-richblack-300 text-justify'>
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                </p>
   
            </div>
        </section>

        {/* Section 5 */}
        <section className='bg-richblack-800 p-5 md:p-20 lg:p-20 w-full'>
            <div className='w-full lg:w-11/12 grid lg:grid-cols-4 grid-cols-2 gap-y-5 gap-x-28 md:gap-x-0 lg:gap-x-0 lg:gap-y-0 justify-between mx-auto'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='text-richblack-5 text-3xl font-bold'>5K</div>
                    <p className='text-richblack-500 text-base font-medium'>Students</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='text-richblack-5 text-3xl font-bold'>10+</div>
                    <p className='text-richblack-500 text-base font-medium'>Mentors</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='text-richblack-5 text-3xl font-bold'>200+</div>
                    <p className='text-richblack-500 text-base font-medium'>Courses</p>
                </div>

                <div className='flex flex-col items-center justify-center'>
                    <div className='text-richblack-5 text-3xl font-bold'>50+</div>
                    <p className='text-richblack-500 text-base font-medium'>Awards</p>
                </div>
                
            </div>
        </section>

        {/* Section 6 */}
        <section className='bg-richblack-900 pt-[100px]'>
            <LearningGrid/>
        </section>

        {/* Section 7 */}
        <section className='w-11/12 mx-auto flex justify-center'>
            <ContactFormSection/>
        </section>

    </div>
  )
}

export default About
