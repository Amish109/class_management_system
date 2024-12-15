import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const CoursesForm = ({ title,id=null, onClose ,setTitle }) => {
  const { coursesApiCall } = useMasterDataAPICall();
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    // if ([full_name,branch,address,gender,mobile_number,email,roll_no,age,dob,city,state,pincode].some(element => element === "")) {
    if ([name,duration].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {name,duration};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/courses" : `v1/courses/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        coursesApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{
    if(!id){
      return;
    }
    const data =await apiCall(`v1/courses/${id}`);
    setName(data.data[0].name);
    setDuration(data.data[0].duration);
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="text" 
          label="Name" 
          placeholder="Name" 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          disabled={title=="View"}
        />
        <TextInput 
          type="text" 
          label="Duration (in Years)" 
          placeholder="Duration" 
          value={duration} 
          onChange={(event) => setDuration(event.target.value)} 
          disabled={title=="View"}
        />
                       
      </div>
      <div className='button-submit flex justify-center mt-10'>
        {
          title=="View" ?
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Edit</button> 
          :
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Submit</button>
        }
      </div>
    </form>
  );
};

export default CoursesForm;