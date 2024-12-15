import React from 'react'

const Select = ({ label, children,...prop}) => {
  return (
    <div className="mb-4"> {/* Margin bottom for spacing */}
    <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
    <select 
      className="border border-gray-300 rounded-md shadow-sm w-full p-2" 
      {...prop} 
    >
        {children}
    </select>
  </div>
  )
}

export default Select
