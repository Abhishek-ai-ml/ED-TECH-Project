import React, { useState, useEffect } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import {NavbarLinks} from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import {MdOutlineKeyboardArrowDown} from 'react-icons/md'


const subLinks = [
    {
        title:"Python",
        link:"/catalog/python"
    },
    {
        title:"Web Dev",
        link:"/catalog/web-devlopment"
    },
    {
        title:"DSA",
        link:"/catalog/dsa"
    }
]

const Navbar = () => {

    const {token} = useSelector( (state) => state.auth);
    const {user} = useSelector( (state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const location = useLocation();

    // const [subLinks, setSubLinks] = useState([]);

    // const fetchSubLinks = async() => {
    //     try {
    //         const result = await apiConnector("GET", categories.CATEGORIES_API);
    //         console.log("Printing sublinks result", result);
    //         setSubLinks(result.data.data);

    //     }catch(error) {
    //         console.log("Could not fetch the category list");
    //     }
    // }

    // useEffect( ()=>{
    //     fetchSubLinks();
    // }, [])

    const matchRoute= (route) => {
        return matchPath({path:route}, location.pathname);
    }

    console.log("Inside Login Value of Token is:", token);
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='w-11/12 max-w-maxContent flex items-center justify-between'>

            {/* Logo */}
            <Link to={"/"}>
                <img src={logo} width={160} height={32} loading='lazy'/>
            </Link>

            {/* Nav Links */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map( (link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div className='flex gap-2 items-center group relative'>
                                            <p>{link.title}</p>
                                            <MdOutlineKeyboardArrowDown className='text-[20px]'/>
                                            
                                            <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[30%] z-20 flex flex-col bg-richblack-5 invisible opacity-0 group-hover:visible group-hover:opacity-100 w-[300px]  p-4 transition-all duration-200 rounded-md '>
                                            <div className='absolute bg-richblack-5 h-6 w-6 rotate-45 rounded-md -top-2 left-[40%]'></div>

                                            <div className='flex flex-col gap-y-3'>
                                                {
                                                    subLinks.length ? (
                                                        subLinks.map( (subLink, index) => (
                                                            <Link to={`${subLink.link}`} key={index}>
                                                                <p className='text-richblack-400 font-semibold'>{subLink.title}</p>
                                                            </Link>
                                                        ))
                                                    ) : (<div></div>)
                                                }
                                            </div>

                                            </div>
                                        </div>) : (
                                        <Link to={link.path}>
                                            <p className={`${matchRoute(link?.path)? "text-yellow-25":"text-richblack-25"}`}>{link.title}</p>
                                        </Link>
                                    )
                                }
                            </li>
                        ))
                    }
                </ul>
            </nav>

            {/* Login signup dashboard */}
            <div className='flex gap-x-4 items-center'>
                {
                    user && user.accountType != "Instructor" && (
                        <Link to="/dashboard/cart" className='relative'>
                            <AiOutlineShoppingCart className='text-richblack-25 text-[18px]'/>
                            {
                                totalItems > 0 && (
                                    <span>{totalItems}</span>
                                )
                            }
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"}>
                            <button className='text-richblack-100 text-[16px] border-richblack-700 border-[1px] py-2 px-4 rounded-[8px] bg-richblack-800'>
                                Login
                            </button>
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"}>
                            <button className='text-richblack-100 text-[16px] border-richblack-700 border-[1px] py-2 px-4 rounded-[8px] bg-richblack-800'>
                                Signup
                            </button>
                        </Link>
                    )
                }

                {
                    token != null && (
                        <ProfileDropdown/>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default Navbar
