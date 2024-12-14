import { useContext } from "react";
import { ClassmanagementContext } from "../context/useClassManagementContext";
import { apiCall } from "../function";


const useMasterDataAPICall=()=>{
const{branchData,setBranchData} =useContext(ClassmanagementContext);
 const branchApiCall=async()=>{
    const data =await apiCall("v1/branches");
    console.log("Test data",data)
    setBranchData(data?.data);
}
    return{
        // branchData,
        branchApiCall
    }
}

export default useMasterDataAPICall