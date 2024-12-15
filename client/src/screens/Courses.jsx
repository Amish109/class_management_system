import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import CoursesForm from '../components/courses_form/CoursesForm.jsx'

const Courses = () => {
const{coursesData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {coursesApiCall} = useMasterDataAPICall();
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
  coursesApiCall();
},[])
  return (
    <div>
      <Index data={coursesData} title={"Courses"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={coursesApiCall}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <CoursesForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default Courses
