import React,{Provider, useState} from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import "./App.css"
import CmsModal from './components/cmsModal/CmsModal'
import { ClassmanagementContext } from './context/useClassManagementContext'
const App = () => {
  const[branchData,setBranchData]=useState([]);
  const[studentsData,setStudentsData]=useState([]);
  const[staffsData,setStaffsData]=useState([]);
  const[coursesData,setCoursesData]=useState([]);
  const[subjectsData,setSubjectsData]=useState([]);
  const[topicsData,setTopicsData]=useState([]);

  const[examTypesData,setExamTypesData]=useState([]);
  const[examsData,setExamsData]=useState([]);
  const[examsStudentsData,setExamsStudentsData]=useState([]);
  const[attendenceData,setAttendenceData]=useState([]);
  const[studentsAttendenceData,setStudentsAttendenceData]=useState([]);
  const[admissionData,setAdmissionData]=useState([]);

  return (
    <ClassmanagementContext.Provider value={{branchData,setBranchData,studentsData,setStudentsData,staffsData,setStaffsData,coursesData,setCoursesData,subjectsData,setSubjectsData,topicsData,setTopicsData,examTypesData,setExamTypesData,examsData,setExamsData,examsStudentsData,setExamsStudentsData,attendenceData,setAttendenceData,studentsAttendenceData,setStudentsAttendenceData,admissionData,setAdmissionData}}>
      <div className='relative'>
      <div className='w-full flex h-screen'>
        <div className='w-[20%] h-screen bg-orange-300 overflow-y-auto scrollbar-hide'>
          <Sidebar/>
        </div>
        <div className='w-[80%] h-screen'>
          <Outlet/>
        </div>
      </div>
      {/* <CmsModal isvisible={isvisible} title={title} /> */}
      </div>
    </ClassmanagementContext.Provider>
  )
}

export default App
