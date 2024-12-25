import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';
import { useParams } from 'react-router-dom';

const ExamsStudentsForm = ({ title,id=null, onClose ,setTitle }) => {
  const { examsStudentsApiCallId } = useMasterDataAPICall();
  const {examId} =useParams();
  const [exam_id, setExamId] = useState("");
  const [student_id, setStudentId] = useState("");
  const [marks, setMarks] = useState(0);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([exam_id,student_id,marks].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {
        exam_id,student_id,marks
    };
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/exams_students" : `v1/exams_students/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        examsStudentsApiCallId(examId); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{

    const examsData =await apiCall(`v1/exams/${examId}`);
    console.log("examsData",examsData)
    const studentsData =await apiCall(`v1/students`);
    if(examsData.data.length>0){
        console.log("examsData.data.length",examsData.data.length);
      setExams(examsData.data);
      setExamId(examsData.data[0].id);
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
    // setMarks(data?.data[0].address);
    setExamId(data?.data[0]?.exam_id)
    setStudentId(data?.data[0]?.student_id)
    setMarks(data?.data[0]?.marks)
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>                 
        <Select 
          type="text" 
          label="Attendence"
          value={exam_id} 
          onChange={(event) => setExamId(event.target.value)} 
          disabled={title=="View"}
        >
          {/* <option value="">Select Attendence</option> */}
          {
            exams.map((element,index)=>{
              return <option value={element.id} selected>{element.name}</option>
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
        <TextInput 
          // type={""}
          label={"Marks"}
          value={marks}
          onChange={(event)=>{
            // console.log("Number(event.target.value)",isNaN(Number(event.target.value)))
            // isNaN(Number(event.target.value)?setMarks(0):setMarks(Number(event.target.value)))
            !isNaN(Number(event.target.value)) && setMarks(Number(event.target.value))
          }}
        />                
        {/* <Select 
          type="text" 
          label="Select Student"
          value={marks} 
          onChange={(event) => setMarks(Number(event.target.value))} 
          disabled={title=="View"}
        >
          <option value="0">Absent</option>
          <option value="1">Present</option>
        </Select>                   */}
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

export default ExamsStudentsForm;