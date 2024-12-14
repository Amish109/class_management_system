import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteEntry } from '../../function';
import useMasterDataAPICall from '../../custom_hooks/useMasterDataAPICall';

const Index = ({ data, title,onBtnClick,handleEditView }) => {
  const { branchApiCall } = useMasterDataAPICall();
  // const navigate = useNavigate();
  const location = useLocation();
  const headers = data!=null && data.length>0?Object.keys(data[0]):[];
  return (
    <div className='p-10 h-screen w-full'>
      <div>
        <h3>{title} Index</h3>
      </div>
      <div className='create-btn flex justify-end'>
        <button className='px-4 py-2 bg-blue-600 text-white active:bg-blue-400 rounded-md' onClick={onBtnClick}>Create New</button>
      </div>
      {
        (!data || data.length === 0)?<div>No data available</div> :
        <div className='w-full index-table overflow-auto mt-5 max-h-[91%]'>
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
                  cellIndex!==0 && <td key={`table_body_${rowIndex}_${cellIndex}`} className='border-x border-black p-2'>{item[key]}</td>
                  ))}
                  <td className='  p-2 flex justify-evenly'>
                      <button type='button' onClick={()=>{handleEditView(item?.id,"Edit")}}>Edit</button>
                      <button type='button' onClick={()=>{deleteEntry(item?.id,"v1/branches",branchApiCall)}}>Delete</button>
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
