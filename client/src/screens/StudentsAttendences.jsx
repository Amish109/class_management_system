import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import StudentsAttendenceForm from '../components/students_attendence/StudentsAttendenceForm'
import { useParams } from 'react-router-dom'

const StudentsAttendences = () => {
const{studentsAttendenceData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const {attendenceId} =useParams();
const onClose=()=>{
  setIsVisible(false)
}
const {studentsAttendenceApiCallId} = useMasterDataAPICall();
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
  studentsAttendenceApiCallId(attendenceId);
}
useEffect(()=>{
  studentsAttendenceApiCallId(attendenceId);
},[])
  return (
    <div>
      <Index data={studentsAttendenceData} title={"Students Attendence"} onBtnClick={handleCreate} handleEditView={handleEditView} CB={callBackFunction} pathOfAPI={"v1/students_attendences"}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <StudentsAttendenceForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default StudentsAttendences

// import React from 'react'
// import StudentsAttendenceForm from '../components/students_attendence/StudentsAttendenceForm'

// const StudentsAttendences = () => {
//   return (
//     <div>
//       <StudentsAttendenceForm/>
//     </div>
//   )
// }

// export default StudentsAttendences
