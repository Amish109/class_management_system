import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const TopicsForm = ({ title,id=null, onClose ,setTitle }) => {
  const { topicsApiCall } = useMasterDataAPICall();
  const [name, setName] = useState("");
   const [duration, setDuration] = useState("");
   const [subject_id, setSubjectId] = useState("");
   const [subjects, setSubjects] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([name,duration,subject_id].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {name,duration,subject_id};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/topics" : `v1/topics/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        topicsApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{

    const subjects =await apiCall(`v1/subjects`);
    if(subjects.data.length>0){
        setSubjects(subjects.data);
    }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/topics/${id}`);
    console.log("Test data",data?.data);
    setName(data?.data[0]?.name);
    setDuration(data?.data[0]?.duration);
    setSubjectId(data?.data[0]?.subject_id);
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="text" 
          label="Topic Name" 
          placeholder="Name" 
          value={name} 
          onChange={(event) => setName(event.target.value)} 
          disabled={title=="View"}
        />          
       <Select 
          type="text" 
          label="Subjects"
          value={subject_id} 
          onChange={(event) => setSubjectId(event.target.value)} 
          disabled={title=="View"}
        >
           <option value="">Select Subjects</option>
          {
            subjects.map((element,index)=>{
              return <option value={element.id}>{element.name}</option>
            })
          }
        </Select>    
        {/* <TextInput 
          type="text" 
          label="Course" 
          placeholder="Course" 
          value={subject_id} 
          onChange={(event) => setSubjectId(event.target.value)} 
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

export default TopicsForm;