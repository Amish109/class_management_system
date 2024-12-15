import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';

const ExamTypesForm = ({ title,id=null, onClose ,setTitle }) => {
  const { examTypesApiCall } = useMasterDataAPICall();
  const [name, setName] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    // if ([full_name,branch,address,gender,mobile_number,email,roll_no,age,dob,city,state,pincode].some(element => element === "")) {
    if ([name].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {name};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/exam_types" : `v1/exam_types/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        examTypesApiCall(); // Refresh data
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
    const data =await apiCall(`v1/exam_types/${id}`);
    setName(data.data[0].name);
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

export default ExamTypesForm;