import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue,getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect( () => {
        register(name, {
          required:true,
          validate: (value) => value.length > 0
        })
    }, [])

    useEffect( ()=> {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>
      <label className='text-richblack-5 font-normal text-sm'>{label} <sup className='text-pink-200'>*</sup></label>
      <div>
        <input
          type='text'
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          className='w-full bg-richblack-700 p-3 rounded-lg text-richblack-200 font-medium text-base'
        />

        <button type='button' onClick={handleAddRequirement} className='font-semibold text-yellow-50'>
          Add
        </button>
      </div>

      {
        requirementList.length > 0 && (
          <ul>
            {
              requirementList.map( (requirement, index) => (
                <li key={index} className='text-richblack-200 flex gap-2'>
                  <span>{requirement}</span>
                  <button type='button' onClick={() => handleRemoveRequirement(index)} >Clear</button>
                </li>
              ))
            }
          </ul>
        )
      }

      {
        errors[name] && (
          <span>
            {label} is required
          </span>
        )
      }
    </div>
  )
}

export default RequirementField
