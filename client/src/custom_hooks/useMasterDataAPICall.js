import { useContext } from "react";
import { ClassmanagementContext } from "../context/useClassManagementContext";
import { apiCall } from "../function";


const useMasterDataAPICall=()=>{
const{setBranchData,setStudentsData,setStaffsData,setCoursesData,setSubjectsData} =useContext(ClassmanagementContext);
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
    return{
        // branchData,
        branchApiCall,
        studentsApiCall,
        staffsApiCall,
        coursesApiCall,
        subjectsApiCall 
    }
}

export default useMasterDataAPICall