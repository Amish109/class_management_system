import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const SubjectsForm = ({ title,id=null, onClose ,setTitle }) => {
  const { subjectsApiCall } = useMasterDataAPICall();
  const [name, setName] = useState("");
   const [duration, setDuration] = useState("");
   const [course_id, setCourseId] = useState("");
   const [courses, setCourses] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([name,course_id].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {name,course_id};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/subjects" : `v1/subjects/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        subjectsApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{

    const courses =await apiCall(`v1/courses`);
    if(courses.data.length>0){
        setCourses(courses.data);
    }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/subjects/${id}`);
    console.log("Test data",data?.data);
    setName(data?.data[0]?.name);
    setDuration(data?.data[0]?.duration);
    setCourseId(data?.data[0]?.course_id);
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="text" 
          label="Subject Name" 
          placeholder="Name" 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          disabled={title=="View"}
        />          
       <Select 
          type="text" 
          label="Course"
          value={course_id} 
          onChange={(event) => setCourseId(event.target.value)} 
          disabled={title=="View"}
        >
           <option value="">Select Course</option>
          {
            courses.map((element,index)=>{
              return <option value={element.id}>{element.name}</option>
            })
          }
        </Select>    
        {/* <TextInput 
          type="text" 
          label="Course" 
          placeholder="Course" 
          value={course_id} 
          onChange={(event) => setCourseId(event.target.value)} 
          disabled={title=="View"}
        />                */}
        <TextInput 
          type="text" 
          label="Duration" 
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

export default SubjectsForm;