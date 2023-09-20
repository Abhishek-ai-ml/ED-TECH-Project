import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Th, Thead, Tr, Td} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';
import {FiEdit2} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {TbCurrencyRupee} from 'react-icons/tb'
import {MdWatchLater} from 'react-icons/md'

export default function CoursesTable({courses, setCourses}) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleCourseDelete = async(courseId) => {
        console.log("COURSE ID INSIDE HANDLE COURSE DELETE FUNCTION", courseId)
        setLoading(true)
        await deleteCourse({courseId: courseId}, token);
        const result  = await fetchInstructorCourses(token);
        if(result) {
            setCourses(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    console.log("INSIDE COURSE TABLE PRINTING COURSES", courses);
  return (
    <div className='w-9/12 mx-auto text-richblack-5 mt-16'>   
        <Table className="border-[1px] border-richblack-700">
            <Thead>
                <Tr className="border-b-[1px] border-richblack-700">
                    <Th className="lg:w-[70%] w-full flex justify-start p-2 pl-5">
                        COURSES
                    </Th>

                    <Th className="lg:w-[10%] w-full">
                        Duration
                    </Th>

                    <Th className="w-[10%]">
                        Price
                    </Th>

                    <Th className="lg:w-[10%] w-full">
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ? 
                    (
                        <Tr className='w-full flex justify-center mx-auto p-3 ml-20'>
                            <Td className='text-richblack-200 text-xl font-semibold'>
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : 
                    (
                        courses.map((course) => (
                            <Tr key={course._id} className="">
                                <Td className="flex p-7 pl-5 gap-x-5">
                                    <img src={course?.thumbnail} className='lg:w-[220px] w-full h-[148px] rounded-lg object-cover'/>
                                    <div className='flex flex-col gap-y-4'>
                                        <p className='text-lg font-semibold text-richblack-5'>{course?.courseName}</p>
                                        <p className='text-sm text-richblack-300'>{course?.courseDescription}</p>
                                        <p className='text-richblack-5 text-[12px]'>Created: {course?.createdAt?.split(':')[0].substr(0, 10)}</p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? 
                                            (
                                                <div className='flex items-center gap-x-2  bg-pink-50 rounded-full text-pink-500 text-[12px] px-2 py-[2px] w-fit font-semibold'>
                                                    <MdWatchLater/>
                                                    <p className=''>Drafted</p>
                                                </div>
                                            ) : 
                                            (
                                                <div className='flex items-center gap-x-2 bg-richblack-700 font-medium rounded-full text-yellow-100 text-[12px] px-2 py-[2px] w-fit'>
                                                    <BsFillCheckCircleFill/>
                                                    <p className=''>Published</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </Td>

                                <Td className="text-richblack-300 text-sm font-medium lg:w-[10%] w-full text-center">
                                    2hr 30min
                                </Td>

                                <Td className="lg:w-[10%] w-full text-richblack-300 text-sm font-medium text-center">
                                    <div className='flex items-center justify-center text-sm'>
                                        <TbCurrencyRupee className='text-base'/>
                                        <span>{course.price}</span>
                                    </div>
                                </Td>

                                <Td className="lg:w-[10%] w-full text-richblack-300 text-sm font-medium text-center">
                                    <button disabled={loading}
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                        className='text-xl hover:text-caribbeangreen-100'
                                    >
                                        <FiEdit2/>
                                    </button>

                                    <button disabled={loading} className='text-xl hover:text-pink-300 pl-2' onClick={() => {
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course",
                                            text2:"All the data related to this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: !loading ? () => handleCourseDelete(course._id) :() => {},
                                            btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                        })
                                    }}>
                                        <RiDeleteBin6Line/>
                                    </button>
                                </Td>
                            </Tr>
                        ))
                    )
                }
            </Tbody>
        </Table>
        { 
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
    </div>
  )
}


