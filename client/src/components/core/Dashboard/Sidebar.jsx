import React from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useState } from 'react'

const Sidebar = () => {
    const {user, loading:profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading) {
        return (
            <div>Loading...</div>
        )
    }
  return (
    <div className='bg-richblack-800 w-[15%] h-screen pt-8 relative'>
      <div className='flex flex-col'>
        <div className='flex items-center flex-col'>
          {
            sidebarLinks.map( (link) => {
              if(link.type && user?.accountType !== link.type) return null;
              return (
                <SidebarLink key={link.id} link ={link} iconName={link.icon}/>
              )
            })
          }
        </div>

        <div className='mx-auto mt-6 mb-6 h-[1px] bg-richblack-600 w-10/12'></div>

        <div className='flex flex-col gap-y-3'>
          <SidebarLink link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear"/>

          <button 
            onClick={ () => setConfirmationModal({
              text1: "Are You Sure ?",
              text2: "You Will be Logged Out of your Acccount",
              btn1Text:"Logout",
              btn2Text:"Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler : () => setConfirmationModal(null)
            })}>

            <div className='flex items-center pl-8 gap-x-2 text-richblack-300 font-medium text-sm'>
              <VscSignOut className='text-xl'/>
              <span>Logout</span>
            </div>
          </button>
      </div>
      </div>

      

      

      {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar
