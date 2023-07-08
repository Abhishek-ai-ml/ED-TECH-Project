import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';



const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }
  return (
    <NavLink to={link.path} 
    className={`w-full relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" : "bg-opacity-0 text-richblack-300"}`}>
        
        <span className={`${matchRoute(link.path) ? "opacity-100" : "opacity-0"} absolute left-0 top-0 w-[0.2rem] h-full bg-yellow-50`}></span>

        <div className='flex items-center gap-x-2'>
            <Icon className='text-xl'/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink
