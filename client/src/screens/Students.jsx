import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import { useLocation, useNavigate } from 'react-router-dom'
import CmsModal from '../components/cmsModal/CmsModal'
import BranchForm from '../components/branch_form/BranchForm'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import StudentsForm from '../components/students_form/StudentsForm'

const Students = () => {
const{studentsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {studentsApiCall} = useMasterDataAPICall();
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

const userData = JSON.parse(localStorage.getItem("user_data"));
const isAdmin = userData?.role=="admin";
useEffect(()=>{
  if(isAdmin){
    studentsApiCall();
  } else{
    setIsVisible(true);
    setId(userData?.data_id);
    setTitle("View");
  }
},[])

  return (
    <div>
      <Index data={studentsData} title={"Students"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={studentsApiCall}/>
      {
        isAdmin ?
        <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <StudentsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal> :
      <div className='p-10'>
        <StudentsForm title={title} id={id} onClose={onClose} setTitle={setTitle} showEdit={false}/>
      </div>
      }
    </div>
  )
}

export default Students
