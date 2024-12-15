import { useContext } from "react";
import { ClassmanagementContext } from "../context/useClassManagementContext";
import { apiCall } from "../function";
const useMasterDataAPICall=()=>{
const{setBranchData,setStudentsData,setStaffsData,setCoursesData,setSubjectsData,setTopicsData,setExamsData,setExamsStudentsData,setAttendenceData,setStudentsAttendenceData,setAdmissionData,setExamTypesData} =useContext(ClassmanagementContext);
 const branchApiCall=async()=>{
    const data =await apiCall("v1/branches");
    console.log("Test data",data)
    setBranchData(data?.data);
}
 const studentsApiCall=async()=>{
    const data =await apiCall("v1/students");
    console.log("Test data",data)
    setStudentsData(data?.data);
}
const staffsApiCall=async()=>{
    const data =await apiCall("v1/staffs");
    console.log("Test data",data)
    setStaffsData(data?.data);
}
const coursesApiCall=async()=>{
    const data =await apiCall("v1/courses");
    console.log("Test data",data)
    setCoursesData(data?.data);
}
const subjectsApiCall =async()=>{
    const data =await apiCall("v1/subjects");
    console.log("Test data",data)
    setSubjectsData(data?.data);
}
const topicsApiCall =async()=>{
    const data =await apiCall("v1/topics");
    console.log("Test data",data)
    setTopicsData(data?.data);
}
const examTypesApiCall =async()=>{
    const data =await apiCall("v1/exam_types");
    console.log("Test data",data)
    setExamTypesData(data?.data);
}
const examsApiCall =async()=>{
    const data =await apiCall("v1/exams");
    console.log("Test data",data)
    setExamsData(data?.data);
}
const examsStudentsApiCall =async()=>{
    const data =await apiCall("v1/exams");
    console.log("Test data",data)
    setExamsStudentsData(data?.data);
}
const attendenceApiCall =async()=>{
    const data =await apiCall("v1/attendences");
    console.log("Test data",data)
    setAttendenceData(data?.data);
}
const studentsAttendenceApiCall =async()=>{
    const data =await apiCall("v1/attendences");
    console.log("Test data",data)
    setStudentsAttendenceData(data?.data);
}
const admissionApiCall =async()=>{
    const data =await apiCall("v1/attendences");
    console.log("Test data",data)
    setAdmissionData(data?.data);
}
    return{
        branchApiCall,
        studentsApiCall,
        staffsApiCall,
        coursesApiCall,
        subjectsApiCall,
        topicsApiCall,
        examsApiCall,
        examsStudentsApiCall,
        attendenceApiCall,
        studentsAttendenceApiCall,
        admissionApiCall,
        examTypesApiCall
    }
}

export default useMasterDataAPICall