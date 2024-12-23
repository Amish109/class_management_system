import { url_header } from "./constants/constants";

export const apiCall =async(url,options) => {
    const response =await fetch(`${url_header}/api/${url}`,options);
    const data=await response.json();
    return data;
}

export const apiCallPutPost =async(url,obj_data,method="POST") => {
    const response =await fetch(`${url_header}/api/${url}`,{
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj_data)
    });
    const data=await response.json();
    return data;
}
export const apiDelete =async(url) => {
    const response =await fetch(`${url_header}/api/${url}`,{
        method:"DELETE",
        // headers: {
        //     'Content-Type': 'application/json'
        // },  
        // body: JSON.stringify(obj_data)
    });
    const data=await response.json();
    return data;
}

export const deleteEntry =async(id,url,CB)=>{
    const confirm_value=confirm("Are you sure you want to delete?");
    if(!confirm_value){
        return;
    }
    const data = await apiDelete(`${url}/${id}`);
    alert(data?.response_message);
    CB();
}