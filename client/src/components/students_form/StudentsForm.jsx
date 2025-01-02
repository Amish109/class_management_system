import React, { useEffect, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const StudentsForm = ({ title,id=null, onClose ,setTitle,showEdit=true }) => {
  const { studentsApiCall } = useMasterDataAPICall();
  const [full_name, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("male");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [roll_no, setRollNo] = useState("");
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
    if ([full_name,branch,address,gender,mobile_number,email,roll_no,age,dob,city,state,pincode].some(element => element === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = {
      full_name,branch,address,gender:gender,mobile_number,email,roll_no,age,dob,city,state,pincode
    };
    try {
      const method = title === "Create" ? "POST" : "PUT";
      const url  = title === "Create" ? "v1/students" : `v1/students/${id}`;
      // const =v1/branches
      const result = await apiCallPutPost(url,data,method);
      console.log("result", result);
      if (!result?.success) {
        alert("Something went wrong");
      } else {
        alert("Submitted Successfully");
        studentsApiCall(); // Refresh data
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
    const data =await apiCall(`v1/students/${id}`);
    console.log("Test data",data?.data);
    // setBranch(data?.data[0].branch_name);
    // setAddress(data?.data[0].address);
    setFullName(data?.data[0]?.full_name)
    setBranch(data?.data[0]?.branch)
    setAddress(data?.data[0]?.address)
    setGender(data?.data[0]?.gender)
    setMobileNumber(data?.data[0]?.mobile_number)
    setEmail(data?.data[0]?.email)
    setRollNo(data?.data[0]?.roll_no)
    setAge(data?.data[0]?.age)
    const parsedDate = new Date(data?.data[0]?.dob);
    const formattedDate = parsedDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    setDOB(formattedDate)
    // setDOB(data?.data[0]?.dob)
    setCity(data?.data[0]?.city)
    setState(data?.data[0]?.state)
    setPincode(data?.data[0]?.pincode)
    etBranches(data?.data[0]?.branches)
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
        <TextInput 
          type="text" 
          label="Roll No" 
          placeholder="Roll No" 
          value={roll_no} 
          onChange={(event) => setRollNo(event.target.value)} 
          disabled={title=="View"}
        />
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
          showEdit &&<button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Edit</button> 
          :
          <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md'>Submit</button>
        }
      </div>
    </form>
  );
};

export default StudentsForm;


/**
 * 
 * 
 * 
 * 
 * 
 * import React, { useEffect, useRef, useState } from 'react';
import TextInput from '../Input/TextInput/TextInput';
import TextArea from '../Input/textarea/TextArea';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';
import { apiCall, apiCallPutPost } from '../../function';
import Select from '../Input/select/select';

const StudentsForm = ({ title,id=null, onClose ,setTitle }) => {
  const { branchApiCall } = useMasterDataAPICall();
  const [full_name, setFullName] = useState("");
  const [branch, setBranch] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [roll_no, setRollNo] = useState("");
  const [age, setAge] = useState("");
  const [dob, setDOB] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
const ref_students = useRef({
  full_name:"",
  branch:"",
  address:"",
  gender:"",
  mobile_number:"",
  email:"",
  roll_no:"",
  age:"",
  dob:"",
  city:"",
  state:"",
  pincode
});
console.log("ref_students",ref_students.current);
console.log("test ref",Object.keys(ref_students.current).some(element =>ref_students.current[element] === ""))
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(title=="View"){
      setTitle("Edit")
      return;
    }
    if (Object.keys(ref_students.current).some(element =>ref_students.current[element] === "")) {
      alert("Fields are mandatory");
      return;
    }
    const data = ref_students.current;
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
          label="Full Name" 
          placeholder="Full Name" 
          value={ref_students.current.full_name} 
          onChange={(event) =>ref_students.current.full_name=event.target.value} 
          disabled={title=="View"}
        />
        <Select 
          type="text" 
          label="Gender"
          value={ref_students.current.gender} 
          onChange={(event) => ref_students.current.gender=event.target.value} 
          disabled={title=="View"}
        >
          <option value={"Male"}>Male</option>
          <option value={"Female"}>Female</option>
        </Select>
        <TextInput 
          type="text" 
          label="Mobile Number" 
          placeholder="Mobile Number" 
          value={ref_students.current.mobile_number} 
          onChange={(event) => ref_students.current.mobile_number=event.target.value} 
          disabled={title=="View"}
        />
        <TextInput 
          type="text" 
          label="Email" 
          placeholder="Email" 
          value={ref_students.current.email} 
          onChange={(event) => ref_students.current.email=event.target.value} 
          disabled={title=="View"}
        />
        <TextInput 
          type="text" 
          label="Roll No" 
          placeholder="Roll No" 
          value={ref_students.current.roll_no} 
          onChange={(event) => ref_students.current.roll_no=event.target.value} 
          disabled={title=="View"}
        />
        <TextInput 
          type="text" 
          label="Age" 
          placeholder="Age" 
          value={ref_students.current.age} 
          onChange={(event) => ref_students.current.age=event.target.value} 
          disabled={title=="View"}
        />
        <TextInput 
          type="date" 
          label="Date of birth" 
          placeholder="Date of birth" 
          value={ref_students.current.dob} 
          onChange={(event) => ref_students.current.dob=event.target.value} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="City" 
          placeholder="City" 
          value={ref_students.current.city} 
          onChange={(event) => ref_students.current.city=event.target.value} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="State" 
          placeholder="State" 
          value={ref_students.current.state} 
          onChange={(event) => ref_students.current.state=event.target.value} 
          disabled={title=="View"}
        />                                                
        <TextInput 
          type="text" 
          label="Pincode" 
          placeholder="Pincode" 
          value={ref_students.current.pincode} 
          onChange={(event) => ref_students.current.pincode=event.target.value} 
          disabled={title=="View"}
        />                     
        <Select 
          type="text" 
          label="Branch"
          value={ref_students.current.branch} 
          onChange={(event) => ref_students.current.branch=event.target.value} 
          disabled={title=="View"}
        >
          {

          }
        </Select>     
        <TextArea 
          label="Address" 
          placeholder="Address" 
          value={ref_students.current.address} 
          onChange={(event) => ref_students.current.address=event.target.value} 
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

export default StudentsForm;

 */