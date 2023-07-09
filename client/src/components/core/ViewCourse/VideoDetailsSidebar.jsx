import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("");
    const[videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();

    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures,
    } = useSelector((state) => state.viewCourse);

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length)
                return;
            
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

            //set current section
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub section
            setVideobarActive(activeSubSectionId);
        })()
    }, [courseSectionData, courseEntireData, location.pathname])
  return (
    <>
        <div>
            {/* for buttons and heading */}
            <div>
                {/* for buttons */}
                <div>
                    <div onClick={() => navigate("/dashboard/enrolled-courses")}>
                        BACK
                    </div> 

                    <div>
                        <IconBtn
                            text="Add Review"
                            onclick={() => setReviewModal(true)}
                        />
                    </div>
                </div>
                {/* for heading and title */}
                <div>
                    <p>{courseEntireData?.courseName}</p>
                    <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                </div>
            </div>

            {/* for sections and sub sections */}
            <div>
                {
                    courseSectionData.map((section, index) => (
                        <div onClick={() =>setActiveStatus(section?._id)} key={index}>
                            
                            {/* section */}
                            <div>
                                <div>{section?.sectionName}</div>
                                {/* <div>Add arrow icon here</div> */}
                            </div>

                            {/* sub section */}
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div>
                                            {
                                                section.subSection.map((topic, index) => (
                                                    <div key={index} className={`${videobarActive === topic._id ? "bg-yellow-50 text-richblack-900" : "bg-richblack-900 text-richblack-5"}`}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`)
                                                            setVideobarActive(topic?._id);
                                                        }}
                                                    >
                                                        <input
                                                            type='checkbox'
                                                            checked={completedLectures.includes(topic?._id)}
                                                            onChange={() => {}}
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default VideoDetailsSidebar
