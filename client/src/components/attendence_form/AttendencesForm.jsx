import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const AttendencesForm = ({ title,id=null, onClose ,setTitle }) => {
  const { attendenceApiCall } = useMasterDataAPICall();
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");
  const [subject_id, setSubjectId] = useState("");
//   const [exam_type, setExamType] = useState("");
  const [subjects,setSubjects] =useState([]);
//   const [examTypes,setExamTypes] =useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([start_time,end_time,subject_id].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {start_time,end_time,subject_id};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/attendences" : `v1/attendences/${id}`;
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        attendenceApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{
    const [subjectsResponse] = await Promise.all([
        apiCall(`v1/subjects`),
        ]);
        if (subjectsResponse.data.length > 0) {
        setSubjects(subjectsResponse.data);
        }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/attendences/${id}`);
    setStartTime(data.data[0].start_time);
    setEndTime(data.data[0].end_time);
    setSubjectId(data.data[0].subject_id);
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="time" 
          label="Start Time" 
          placeholder="Name" 
          value={start_time} 
          onChange={(event) => setStartTime(event.target.value)} 
          disabled={title=="View"}
          step="1800"
        /> 
        <TextInput 
          type="time" 
          label="End Time" 
          placeholder="Name" 
          value={end_time} 
          onChange={(event) => setEndTime(event.target.value)} 
          disabled={title=="View"}
          step="1800"
        />
        <Select 
          type="text" 
          label="Subject"
          value={subject_id} 
          onChange={(event) => setSubjectId(event.target.value)} 
          disabled={title=="View"}
        >
          <option value="">Select Subject</option>
          {
            subjects.map((element,index)=>{
              return <option value={element.id}>{element.name}</option>
            })
          }
        </Select> 
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

export default AttendencesForm;