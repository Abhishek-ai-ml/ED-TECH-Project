import React, { useEffect } from 'react'
import { set, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import IconBtn from '../../common/IconBtn';
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state) => state.profile);
    const {token} = useSelector((state) => state.auth);
    const {courseEntireData} = useSelector((state) => state.viewCourse);
    const {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
    } = useForm();

    const ratingChanged = (newRating) => {
        setValue("courseRating", newRating);
    }

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const onSubmit = async(data) => {
        await createRating({courseId: courseEntireData._id, rating:data.courseRating,  review:data.courseExperience}, token) ;
        setReviewModal(false);
    }
  return (
    <div>
        <div>
            {/* Modal header */}
            <div>
                <p>Add Review</p>
                <button onClick={() => setReviewModal(false)}>Close</button>
            </div>

            {/* Modal body */}
            <div>
                <div>
                    <img
                        src={user?.image}
                        alt='user image'
                        className='aspect-square w-[50px] rounded-full object-cover'
                    />

                    <div>
                        <p>{user?.firstName} {user?.lastname}</p>
                        <p>Posting Publicaly</p>
                    </div>

                </div>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label htmlFor='courseExperience'>Add Your Experiencee</label>

                        <textarea
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='form-style, min-h-[130px] w-full'
                        />
                        {
                            errors.courseExperience && (
                                <span>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>

                    {/* buttons */}
                    <div>
                        <button onClick={() => setReviewModal(false)}>
                            Cancel
                        </button>

                        <IconBtn
                            text="Save"
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal
