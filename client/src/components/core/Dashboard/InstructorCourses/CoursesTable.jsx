import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tbody, Th, Thead, Tr, Td} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useNavigate } from 'react-router-dom';

export default function CoursesTable({courses, setCourses}) {
    const dispatch = useDispatch();
    const {token} = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();

    const handleCourseDelete = async({courseId}) => {
        setLoading(true)
        await deleteCourse({courseId: courseId}, token);
        const result  = await fetchInstructorCourses(token);
        if(result) {
            setCourse(result);
        }
        setConfirmationModal(null);
        setLoading(false);
    }
  return (
    <div>   
        <Table>
            <Thead>
                <Tr>
                    <Th>
                        Courses
                    </Th>

                    <Th>
                        Duration
                    </Th>

                    <Th>
                        Price
                    </Th>

                    <Th>
                        Actions
                    </Th>
                </Tr>
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ? 
                    (
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    ) : 
                    (
                        courses.map((course) => (
                            <Tr key={course._id}>
                                <Td>
                                    <img src={course?.thumbnail}/>
                                    <div>
                                        <p>{course?.courseName}</p>
                                        <p>{course?.courseDescription}</p>
                                        <p>Created: </p>
                                        {
                                            course.status === COURSE_STATUS.DRAFT ? 
                                            (
                                                <p>DRAFTED</p>
                                            ) : 
                                            (
                                                <p>PUBLISHED</p>
                                            )
                                        }
                                    </div>
                                </Td>

                                <Td>
                                    2hr 30min
                                </Td>

                                <Td>
                                    {course.price}
                                </Td>

                                <Td>
                                    <button disabled={loading}
                                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button disabled={loading} onClick={() => {
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course",
                                            text2:"All the data related to this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler: !loading ? () => handleCourseDelete(course._id) :() => {},
                                            btn2Handler: !loading ? () => setConfirmationModal(null) : () => {},
                                        })
                                    }}>
                                        Delete
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


