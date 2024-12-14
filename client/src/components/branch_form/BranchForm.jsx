import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';

const BranchForm = ({ title,id=null, onClose ,setTitle }) => {
  const { branchApiCall } = useMasterDataAPICall();
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if ([branch, address].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {
      branch_name: branch,
      address
    };
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/branches" : `v1/branches/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        branchApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{
    const data =await apiCall(`v1/branches/${id}`);
    console.log("Test data",data?.data);
    setBranch(data?.data[0].branch_name);
    setAddress(data?.data[0].address);
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="text" 
          label="Branch Name" 
          placeholder="Branch Name" 
          value={branch} 
          onChange={(event) => setBranch(event.target.value)} 
          disabled={title=="View"}
        />
        <TextArea 
          label="Branch Address" 
          placeholder="Branch Address" 
          value={address} 
          onChange={(event) => setAddress(event.target.value)} 
          disabled={title=="View"}
        />
      </div>
      <div className='button-submit flex justify-center mt-10'>
        {
          title=="View" ?
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Edit</button> 
          :
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Submit</button>
        }
      </div>
    </form>
  );
};

export default BranchForm;
