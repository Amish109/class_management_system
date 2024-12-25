import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import StudentsAttendenceForm from '../components/students_attendence/StudentsAttendenceForm'
import { useParams } from 'react-router-dom'
import ExamsStudentsForm from '../components/exams_students/ExamsStudentsForm'

const ExamsStudents = () => {
const{examsStudentsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const {examId} =useParams();
const onClose=()=>{
  setIsVisible(false)
}
const {examsStudentsApiCallId} = useMasterDataAPICall();
const handleCreate =()=>{
  setId(null);
  setTitle("Create");
  setIsVisible(true);
}
const handleEditView =(id,title)=>{
  setId(id);
  setTitle(title);
  setIsVisible(true);
}
const callBackFunction=()=>{
  examsStudentsApiCallId(examId);
}
useEffect(()=>{
  examsStudentsApiCallId(examId);
},[])
  return (
    <div>
      <Index data={examsStudentsData} title={"Exam Students"} onBtnClick={handleCreate} handleEditView={handleEditView} CB={callBackFunction} pathOfAPI={"v1/exams_students"}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <ExamsStudentsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default ExamsStudents