import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const StaffsForm = ({ title,id=null, onClose ,setTitle,showEdit=true }) => {
  const { staffsApiCall } = useMasterDataAPICall();
  const [full_name, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  // const [roll_no, setRollNo] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [branches,setBranches] = useState([]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    // if ([full_name,branch,address,gender,mobile_number,email,roll_no,age,dob,city,state,pincode].some(element => element === "")) {
    if ([full_name,branch,address,gender,mobile_number,email,age,dob,city,state,pincode].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {
      // full_name,branch,address,gender:gender,mobile_number,email,roll_no,age,dob,city,state,pincode
      full_name,branch,address,gender:gender,mobile_number,email,age,dob,city,state,pincode
    };
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/staffs" : `v1/staffs/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        staffsApiCall(); // Refresh data
        onClose(); // Close form
      }
    } catch (error) {
      alert("Something went wrong");
      console.log("Error in submitting the form", error);
    }
  };

  useEffect(()=>{
    (async()=>{

    const branches =await apiCall(`v1/branches`);
    if(branches.data.length>0){
      setBranches(branches.data);
    }
    if(!id){
      return;
    }
    const data =await apiCall(`v1/staffs/${id}`);
    console.log("Test data",data?.data);
    // setBranch(data?.data[0].branch_name);
    // setAddress(data?.data[0].address);
    setFullName(data?.data[0]?.full_name)
    setBranch(data?.data[0]?.branch)
    setAddress(data?.data[0]?.address)
    setGender(data?.data[0]?.gender)
    setMobileNumber(data?.data[0]?.mobile_number)
    setEmail(data?.data[0]?.email)
    // setRollNo(data?.data[0]?.roll_no)
    setAge(data?.data[0]?.age)
    const parsedDate = new Date(data?.data[0]?.dob);
    const formattedDate = parsedDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    setDOB(formattedDate)
    // setDOB(data?.data[0]?.dob)
    setCity(data?.data[0]?.city)
    setState(data?.data[0]?.state)
    setPincode(data?.data[0]?.pincode)
    // setBranches(data?.data[0]?.branches)
    })()
  },[id])

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextInput 
          type="text" 
          label="Full Name" 
          placeholder="Full Name" 
          value={full_name} 
          onChange={(event) => setFullName(event.target.value)} 
          disabled={title=="View"}
        />
        <Select 
          type="text" 
          label="Gender"
          value={gender} 
          onChange={(event) => setGender(event.target.value)} 
          disabled={title=="View"}
        >
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </Select>
        <TextInput 
          type="text" 
          label="Mobile Number" 
          placeholder="Mobile Number" 
          value={mobile_number} 
          onChange={(event) => setMobileNumber(event.target.value)} 
          disabled={title=="View"}
        />
        <TextInput 
          type="text" 
          label="Email" 
          placeholder="Email" 
          value={email} 
          onChange={(event) => setEmail(event.target.value)} 
          disabled={title=="View"}
        />
        {/* <TextInput 
          type="text" 
          label="Roll No" 
          placeholder="Roll No" 
          value={roll_no} 
          onChange={(event) => setRollNo(event.target.value)} 
          disabled={title=="View"}
        /> */}
        <TextInput 
          type="text" 
          label="Age" 
          placeholder="Age" 
          value={age} 
          onChange={(event) => setAge(event.target.value)} 
          disabled={title=="View"}
        />
        <TextInput 
          type="date" 
          label="Date of birth" 
          placeholder="Date of birth" 
          value={dob} 
          onChange={(event) => setDOB(event.target.value)} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="City" 
          placeholder="City" 
          value={city} 
          onChange={(event) => setCity(event.target.value)} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="State" 
          placeholder="State" 
          value={state} 
          onChange={(event) => setState(event.target.value)} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="Pincode" 
          placeholder="Pincode" 
          value={pincode} 
          onChange={(event) => setPincode(event.target.value)} 
          disabled={title=="View"}
        />                     
        <Select 
          type="text" 
          label="Branch"
          value={branch} 
          onChange={(event) => setBranch(event.target.value)} 
          disabled={title=="View"}
        >
          <option value="">Select Branch</option>
          {
            branches.map((element,index)=>{
              return <option value={element.id}>{element.branch_name}</option>
            })
          }
        </Select>     
        <TextArea 
          label="Address" 
          placeholder="Address" 
          value={address} 
          onChange={(event) => setAddress(event.target.value)} 
          disabled={title=="View"}
        />                   
      </div>
      <div className='button-submit flex justify-center mt-10'>
        {
          title=="View" ?
          showEdit && <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Edit</button> 
          :
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Submit</button>
        }
      </div>
    </form>
  );
};

export default StaffsForm;