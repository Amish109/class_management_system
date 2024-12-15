import { useContext } from "react";
import { ClassmanagementContext } from "../context/useClassManagementContext";
import { apiCall } from "../function";


const useMasterDataAPICall=()=>{
const{branchData,setBranchData,studentsData,setStudentsData} =useContext(ClassmanagementContext);
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
    return{
        // branchData,
        branchApiCall,
        studentsApiCall
    }
}

export default useMasterDataAPICall