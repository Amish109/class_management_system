import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteEntry } from '../../function';
const Index = ({ data, title,onBtnClick,handleEditView,CB,redirectToPage=null,pathOfAPI=null}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const headers = data!=null && data.length>0?Object.keys(data[0]):[];

  const userData = JSON.parse(localStorage.getItem("user_data"));
  if(userData?.role=="student" || userData?.role=="staff"){
    return null;
  }
  
  return (
    <div className='p-10 w-full'>
      <div>
        <h3>{title} Index</h3>
      </div>
      <div className='create-btn flex justify-end'>
        <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md' onClick={onBtnClick}>Create New</button>
      </div>
      {
        (!data || data.length === 0)?<div>No data available</div> :
        <div className='w-full index-table overflow-auto mt-5 max-h-[91%] scrollbar-hide'>
          <table className='w-full align-middle border border-black'>
            <thead className='text-center bg-blue-200 sticky top-0 outline outline-1 scrollbar-hide'>
              <tr className=''>
                {headers.map((header, index) => (
                  index!==0 && <th key={`table_header_${index}`} className='border border-b-0 border-black p-2'>{header}</th>
                ))}
                <th className='border border-b-0 border-black p-2 w-[200px]'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {data.map((item, rowIndex) => (
                <tr key={`table_row_${rowIndex}`} className='border border-t-0 border-black'>
                  {Object.keys(item).map((key, cellIndex) => (
                  cellIndex!==0 && (
                    (cellIndex==1 && redirectToPage) ? 
                    <td key={`table_body_${rowIndex}_${cellIndex}`} onClick={()=>{
                      navigate(`${location.pathname}/${redirectToPage}/${item?.id}`);
                    }}  className='border-x border-black p-2 cursor-pointer'>
                      {item[key]}
                    </td>
                    :  
                    <td key={`table_body_${rowIndex}_${cellIndex}`}  className='border-x border-black p-2'>
                      {item[key]}
                    </td>
                  )
                  ))}
                  <td className='  p-2 flex justify-evenly '>
                      <button type='button' onClick={()=>{handleEditView(item?.id,"Edit")}}>Edit</button>
                      <button type='button' onClick={()=>{deleteEntry(item?.id,`${pathOfAPI?pathOfAPI:"v1"+location.pathname}`,CB)}}>Delete</button>
                      <button type='button' onClick={()=>{handleEditView(item?.id,"View")}}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default Index;
