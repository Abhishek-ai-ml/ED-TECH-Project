import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/Dashboard/Sidebar';

const Dashboard = () => {

    const {loading: authLoading} = useSelector((state) => state.auth);
    const {loading: profileLoading} = useSelector((state) => state.profile);

    if(authLoading || profileLoading) {
        return (
            <div className='mt-10'>Loading ...</div>
        )
    }
  return (
    <div className='flex w-[100%] relative'>
        {/* <div className='fixed top-12 w-full max-w-maxContent'><Sidebar/></div> */}
        <Sidebar/>
        <div className='flex justify-center mx-auto w-[85%] absolute left-[15%] top-12 bg-richblack-900 pb-5 z-10'>
            <div className='flex justify-center mx-auto w-full z-30'>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
