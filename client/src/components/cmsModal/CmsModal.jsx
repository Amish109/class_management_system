import React, { useContext } from 'react'
import { ClassmanagementContext } from '../../context/useClassManagementContext';

const CmsModal = ({isvisible,onClose,title,children}) => {
    if(!isvisible){
        return null;
    }
  return (
    <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-opacity-35 bg-slate-700 border border-black'>
      <div className='min-w-[90%] h-[90%] bg-white shadow-lg rounded-lg'>
        <div className='h-[100%]'>
        <div className='modal-header border border-b-2 border-b-black h-[10%] flex justify-center items-center relative'>
            <h1 className='text-sm md:text-lg font-semibold'>{title}</h1>
            <div className='absolute right-10'>
                <button className='text-2xl active:text-gray-400' onClick={onClose}>
                    X
                </button>
            </div>
        </div>
        <div className='modal-body h-[80%] overflow-auto p-5 align-middle'>
        {children}
        </div>
        </div>
      </div>
    </div>
  )
}

export default CmsModal
