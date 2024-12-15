import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const ExamsForm = ({ title,id=null, onClose ,setTitle }) => {
  const { examsApiCall } = useMasterDataAPICall();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [exam_type, setExamType] = useState("");
  const [subjects,setSubjects] =useState([]);
  const [examTypes,setExamTypes] =useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([name,date,subject,exam_type].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {name,date,subject,exam_type};
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/exams" : `v1/exams/${id}`;
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        examsApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{
    const [subjectsResponse, examTypesResponse] = await Promise.all([
        apiCall(`v1/subjects`),
        apiCall(`v1/exam_types`),
        ]);
    
        // Handle subjects data
        if (subjectsResponse.data.length > 0) {
        setSubjects(subjectsResponse.data);
        }
    
        // Handle exam types data
        if (examTypesResponse.data.length > 0) {
        setExamTypes(examTypesResponse.data);
        }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/exams/${id}`);
    setName(data.data[0].name);
    setSubject(data.data[0].subject);
    setExamType(data.data[0].exam_type);
    const parsedDate = new Date(data?.data[0]?.date);
    const formattedDate = parsedDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    setDate(formattedDate)
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
          type="date" 
          label="Date of Exam" 
          placeholder="Date of Exam" 
          value={date} 
          onChange={(event) => setDate(event.target.value)} 
          disabled={title=="View"}
        />
        <Select 
          type="text" 
          label="Subject"
          value={subject} 
          onChange={(event) => setSubject(event.target.value)} 
          disabled={title=="View"}
        >
          <option value="">Select Subject</option>
          {
            subjects.map((element,index)=>{
              return <option value={element.id}>{element.name}</option>
            })
          }
        </Select> 
        <Select 
          type="text" 
          label="Exam Type"
          value={exam_type} 
          onChange={(event) => setExamType(event.target.value)} 
          disabled={title=="View"}
        >
          <option value="">Select Exam Type</option>
          {
            examTypes.map((element,index)=>{
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

export default ExamsForm;