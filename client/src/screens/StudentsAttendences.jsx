import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import ExamTypesForm from '../components/exam_types_form/ExamTypesForm.jsx'
import StudentsAttendencesForm from '../components/attendence_form/AttendencesForm.jsx'

const StudentsAttendences = () => {
const{StudentsAttendencesData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {attendenceApiCall} = useMasterDataAPICall();
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
useEffect(()=>{
  attendenceApiCall();
},[])
  return (
    <div>
      <Index data={attendenceData} title={"Attendence"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={attendenceApiCall}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <AttendencesForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default StudentsAttendences


// import React from 'react'

// const StudentsAttendences = () => {
//   return (
//     <div>
//       StudentsAttendences
//     </div>
//   )
// }

// export default StudentsAttendences
