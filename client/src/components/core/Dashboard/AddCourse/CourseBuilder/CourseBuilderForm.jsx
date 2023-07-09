import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import {MdAddCircleOutline} from 'react-icons/md'
import {useDispatch, useSelector} from 'react-redux'
import { BiRightArrow } from 'react-icons/bi'
import NestedView from './NestedView'
import { updateSection } from '../../../../../services/operations/courseDetailsAPI'
import { createSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import { toast } from 'react-hot-toast'
import { setStep } from '../../../../../slices/courseSlice'
import { setEditCourse } from '../../../../../slices/courseSlice'
import IconBtn from '../../../../common/IconBtn'

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState:{errors}} = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if(editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id,
      }, token)
    }

    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    if(result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  }

  const goToNext = () => {
    if(course.courseContent.length === 0) {
      toast.error("Please add atleast one Section");
      return;
    }

    if(course.courseContent.some((section) => section.subSection.length === 0)) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
      if(editSectionName === sectionId) {
        cancelEdit();
        return;
      }

      setEditSectionName(sectionId);
      setValue("sectionName", sectionName); 
  }

  return (
    <div>
      <p>Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName'>Section Name <sup>*</sup></label>
          <input 
            id='sectionName'
            placeholder='Enter Section Name'
            {...register("sectionName", {required:true})}
            className='w-full'
          />
          {
            errors.sectionName && (
              <span>Section Name Is Required Field</span>
            )
          }
        </div>

        <div>
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <MdAddCircleOutline/>
          </IconBtn>
          {
            editSectionName && (
              <button type='button' onClick={cancelEdit}>
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>


      {
        course.courseContent.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
        )
      }

      <div>
        <button onClick={goBack}>Back</button>

        <IconBtn text={"Next"} onclick={goToNext}>
          <BiRightArrow/>
        </IconBtn>
      </div>
    </div>
  )
}

export default CourseBuilderForm
