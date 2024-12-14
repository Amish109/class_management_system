import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import { useLocation, useNavigate } from 'react-router-dom'
import CmsModal from '../components/cmsModal/CmsModal'
import BranchForm from '../components/branch_form/BranchForm'
import { ClassmanagementContext } from '../context/useClassManagementContext'

const Branches = () => {
const{branchData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {branchApiCall} = useMasterDataAPICall();
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
  branchApiCall();
},[])
  return (
    <div>
      <Index data={branchData} title={"Branches"} onBtnClick={handleCreate}  handleEditView={handleEditView}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <BranchForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default Branches
