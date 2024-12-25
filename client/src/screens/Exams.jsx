import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import ExamTypesForm from '../components/exam_types_form/ExamTypesForm.jsx'
import ExamsForm from '../components/exams_form/ExamsForm.jsx'

const Exams = () => {
const{examsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {examsApiCall} = useMasterDataAPICall();
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
  examsApiCall();
},[])
  return (
    <div>
      <Index data={examsData} title={"Exams"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={examsApiCall} redirectToPage={"exams_students"}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <ExamsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default Exams
