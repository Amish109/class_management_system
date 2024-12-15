import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import ExamTypesForm from '../components/exam_types_form/ExamTypesForm.jsx'

const ExamTypes = () => {
const{examTypesData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {examTypesApiCall} = useMasterDataAPICall();
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
  examTypesApiCall();
},[])
  return (
    <div>
      <Index data={examTypesData} title={"Exam Types"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={examTypesApiCall}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <ExamTypesForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default ExamTypes
