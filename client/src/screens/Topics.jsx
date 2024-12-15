import React, { useContext, useEffect, useState } from 'react'
import Index from '../components/Index/Index'
import useMasterDataAPICall from '../custom_hooks/useMasterDataAPICall'
import CmsModal from '../components/cmsModal/CmsModal'
import { ClassmanagementContext } from '../context/useClassManagementContext'
import TopicsForm from '../components/topics_form/TopicsForm.jsx'

const Topics = () => {
const{topicsData} =useContext(ClassmanagementContext);
const [isvisible,setIsVisible] = useState(false);
const [title,setTitle] = useState("Create");
const [id,setId] = useState(null);
const onClose=()=>{
  setIsVisible(false)
}
const {topicsApiCall} = useMasterDataAPICall();
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
  topicsApiCall();
},[])
  return (
    <div>
      <Index data={topicsData} title={"Topics"} onBtnClick={handleCreate}  handleEditView={handleEditView} CB={topicsApiCall}/>
      <CmsModal isvisible={isvisible} title={title}  onClose={onClose}>
        <TopicsForm title={title} id={id} onClose={onClose} setTitle={setTitle}/>
      </CmsModal>
    </div>
  )
}

export default Topics
