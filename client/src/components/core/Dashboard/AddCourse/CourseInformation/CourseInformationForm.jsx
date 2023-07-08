import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import {HiOutlineCurrencyRupee} from 'react-icons/hi2'
import RequirementField from './RequirementField';
import { fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI';
import {COURSE_STATUS} from '../../../../../utils/constants'
import IconBtn from '../../../../common/IconBtn'
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { addCourseDetails } from '../../../../../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';
import {setStep, setCourse} from '../../../../../slices/courseSlice'


const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState:{errors},
  } = useForm();

  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);
  const {course, editCourse} = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await fetchCourseCategories();
      if(categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    }

    if(editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("couresShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImgae", course.thumbnail);
    }
    getCategories();
   }, [])

   const isFormUpdate = () => {
      const currentValues = getValues();
      if(currentValues.courseTitle !== course.courseName ||
        currentValues.courseShortDesc !== course.courseDescription ||
        currentValues.coursePrice !== course.price ||
        currentValues.courseBenefits !== course.whatYouWillLearn ||
        currentValues.courseCategory._id !== course.category._id ||
        currentValues.courseRequirements.toString() !== course.instructions.toString())
        return true;
      else 
        return false;
   }

   const onSubmit = async (data) => {

      if(editCourse) {
        if(isFormUpdate) {
          const currentValues = getValues();
          const formData = new FormData();

          formData.append("courseId", course._id);
          if(currentValues.courseTitle !== course.courseName) {
            formData.append("courseName", data.courseTitle);
          }

          if(currentValues.courseShortDesc !== course.courseDescription) {
            formData.append("courseDescription", data.courseShortDesc);
          }

          if(currentValues.coursePrice !== course.price) {
            formData.append("price", data.coursePrice);
          }

          if(currentValues.courseBenefits !== course.whatYouWillLearn) {
            formData.append("whatYouWillLearn", data.courseBenefits);
          }

          if(currentValues.courseCategory._id !== course.category._id) {
            formData.append("category", data.courseCategory);
          }

          if(currentValues.courseRequirements.toString() !== course.instructions.toString()) {
            formData.append("instructions", JSON.stringify(data.courseRequirements));
          }

          setLoading(true);
          const result = await editCourseDetails(formData, token);
          setLoading(false);
          if(result) {
            setStep(2);
            dispatch(setCourse(result));
          }
        }

        else {
          toast.error("No Changes Made So Far")
        }
        return;
      }

      const formData = new FormData();
      formData.append("courseName", data.courseTitle);
      formData.append("courseDescription", data.courseShortDesc);
      formData.append("price", data.coursePrice);
      formData.append("whatYouWillLearn", data.courseBenefits);
      formData.append("category", data.courseCategory);
      formData.append("instructions", JSON.stringify(data.courseRequirements));
      formData.append("status", COURSE_STATUS.DRAFT);

      
      setLoading(true);
      const result = await addCourseDetails(formData, token);
      if(result) {
        setStep(2);
        dispatch(setCourse(result));
      }
      setLoading(false);
   }

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className='rounded-md bg-richblack-800 border-richblack-700 p-6 space-y-8'
    >

      <div>
        <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>

        <input 
          id='courseTitle'
          placeholder='Enter Course Title'
          {...register("courseTitle", {required:true})}
          className='w-full'
        />
        {
          errors.courseTitle && (
            <span>Course Title is required</span>
          )
        }
      </div>

      <div>
        <label htmlFor='courseShortDesc'>Course Short Description</label>
        <textarea
          id='courseShortDesc'
          placeholder='Enter Description'
          {...register("courseShortDesc", {required:true})}
          className='w-full min-h-[140px]'
        />
        {
          errors.courseShortDesc && (
            <span>Course Description is required</span>
          )
        }
      </div>

      <div>
        <label htmlFor='coursePrice'>Course Price <sup>*</sup></label>
        <input
          id='coursePrice'
          placeholder='Enter Course Price'
          {...register("coursePrice", {required:true, valueAsNumber:true})}
          className='w-full'
        />
        <HiOutlineCurrencyRupee/>
        {
          errors.coursePrice && (
            <span>Course Price is required</span>
          )
        }
      </div>

      <div>
        <label htmlFor='courseCategory'>Course Category</label>
        <select
        id='courseCategory'
        defaultValue=""
        {...register("courseCategory", {required:true})}

        >
          <option value="" disabled>Choose a Category</option>

          {
              !loading && courseCategories.map((category, index) => (
                <option key={index} value={category?._id}>
                  {category?.name}
                </option>
              ))
          }

        </select>
        {
          errors.courseCategory && (
            <span>Course Category is Require</span>
          )
        }
      </div>  

      <div>
        <label>Course Benefits <sup>*</sup></label>
        <textarea
          id='courseBenefits'
          placeholder='Enter Benefits of course'
          {...register("courseBenefits", {required:true})}
          className='min-h-[140px] w-full'
        />
        {
          errors.courseBenefits && (
            <span>Course Benefits are Required</span>
          )
        }
      </div>   

      <RequirementField
        name="courseRequirements"
        label="Requirements/Instructions"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div>
        {
          editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
            >
              Continue Without Saving
            </button>
          )
        }

        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
        />
      </div>
    </form>
  )
}

export default CourseInformationForm
