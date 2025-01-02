import React,{Provider, useEffect, useState} from 'react'
import Sidebar from './components/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import "./App.css"
import { ClassmanagementContext } from './context/useClassManagementContext'
const App = () => {
  const navigate = useNavigate();
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

  const[jwtToken,setJwtToken] =useState("");

  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("access_token"))){
      setJwtToken(JSON.parse(localStorage.getItem("access_token")));
    } else{
      setJwtToken(null);
    }
  },[])
  if(!jwtToken && jwtToken!=""){
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 0);
   return null;
  }
  return (
      <ClassmanagementContext.Provider value={{branchData,setBranchData,studentsData,setStudentsData,staffsData,setStaffsData,coursesData,setCoursesData,subjectsData,setSubjectsData,topicsData,setTopicsData,examTypesData,setExamTypesData,examsData,setExamsData,examsStudentsData,setExamsStudentsData,attendenceData,setAttendenceData,studentsAttendenceData,setStudentsAttendenceData,admissionData,setAdmissionData}}>
        <div className='relative'>
        <div className='w-full flex h-screen'>
          <div className='w-[20%] h-screen bg-orange-300 overflow-y-auto scrollbar-hide'>
          <Sidebar/>
          </div>
          <div className='w-[80%] h-screen '>
           <div className='flex justify-end px-10 py-5 h-[10%%]'>
            <button type='button' className='px-5 py-3 bg-black text-white rounded-md active:bg-slate-900' onClick={()=>{
              localStorage.clear();
              setJwtToken(null)
            }}>Logout</button>
           </div>
           <div className='h-[80%] overflow-auto'>
           <Outlet/>
           </div>
          </div>
        </div>
        {/* <CmsModal isvisible={isvisible} title={title} /> */}
        </div>
      </ClassmanagementContext.Provider>
  )
}

export default App
