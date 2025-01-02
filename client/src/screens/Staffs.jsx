import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import StaffsForm from '../components/staffs_form/StaffsForm'

const Staffs = () => {
const{staffsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {staffsApiCall} = useMasterDataAPICall();
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
    staffsApiCall();
  } else{
    setIsVisible(true);
    setId(userData?.data_id);
    setTitle("View");
  }
},[])

  return (
    <div>
      <Index data={staffsData} title={"Staffs"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={staffsApiCall}/>
      {/* <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <StaffsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal> */}
       {
        isAdmin ?
        <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <StaffsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal> :
      <div className='p-10'>
        <StaffsForm title={title} id={id} onClose={onClose} setTitle={setTitle} showEdit={false}/>
      </div>
      }
    </div>
  )
}

export default Staffs
