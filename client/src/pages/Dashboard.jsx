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
    <div className='flex w-[100%]'>
        <Sidebar/>
        <div className='w-[80%]'>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard
