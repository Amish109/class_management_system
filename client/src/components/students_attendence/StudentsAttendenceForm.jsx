import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';
import { useParams } from 'react-router-dom';

const StudentsAttendenceForm = ({ title,id=null, onClose ,setTitle }) => {
  const { studentsAttendenceApiCallId } = useMasterDataAPICall();
  const {attendenceId} =useParams();
  const [attendence_id, setAttendenceId] = useState("");
  const [student_id, setStudentId] = useState("");
  const [is_present, setIsPresent] = useState(0);
  const [attendences, setAttendences] = useState([]);
  const [students, setStudents] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([attendence_id,student_id,is_present].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {
      attendence_id,student_id,is_present
    };
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/students_attendences" : `v1/students_attendences/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        studentsAttendenceApiCallId(attendenceId); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{

    const attendencesData =await apiCall(`v1/attendences/${attendenceId}`);
    console.log("attendencesData",attendencesData)
    const studentsData =await apiCall(`v1/students`);
    if(attendencesData.data.length>0){
      setAttendences(attendencesData.data);
      setAttendenceId(attendencesData.data[0].id);
    }
    if(studentsData.data.length>0){
      setStudents(studentsData.data);
    }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/students_attendences/${id}`);
    console.log("Test data",data?.data);
    // setBranch(data?.data[0].branch_name);
    // setIsPresent(data?.data[0].address);
    setAttendenceId(data?.data[0]?.attendence_id)
    setStudentId(data?.data[0]?.student_id)
    setIsPresent(data?.data[0]?.is_present)
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>                 
        <Select 
          type="text" 
          label="Attendence"
          value={attendence_id} 
          onChange={(event) => setAttendenceId(event.target.value)} 
          disabled={title=="View"}
        >
          {/* <option value="">Select Attendence</option> */}
          {
            attendences.map((element,index)=>{
              return <option value={element.id} selected>{element.date}</option>
            })
          }
        </Select>     
        <Select 
          type="text" 
          label="Select Student"
          value={student_id} 
          onChange={(event) => setStudentId(event.target.value)} 
          disabled={title=="View"}
        >
          <option value="">Select Students</option>
          {
            students.map((element,index)=>{
              return <option value={element.id} selected>{element.full_name}</option>
            })
          }
        </Select>                  
        <Select 
          type="text" 
          label="Select Student"
          value={is_present} 
          onChange={(event) => setIsPresent(Number(event.target.value))} 
          disabled={title=="View"}
        >
          <option value="0">Absent</option>
          <option value="1">Present</option>
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

export default StudentsAttendenceForm;

// import React from 'react'

// const StudentsAttendenceForm = () => {
//   return (
//     <div></div>
//   )
// }

// export default StudentsAttendenceForm
