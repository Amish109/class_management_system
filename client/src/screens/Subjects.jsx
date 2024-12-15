import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import SubjectsForm from '../components/subjects_form/SubjectsForm.jsx'

const Subjects = () => {
const{subjectsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {subjectsApiCall} = useMasterDataAPICall();
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
  subjectsApiCall();
},[])
  return (
    <div>
      <Index data={subjectsData} title={"Subjects"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={subjectsApiCall}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <SubjectsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default Subjects
