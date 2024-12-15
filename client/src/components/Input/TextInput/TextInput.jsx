import React from 'react';

const TextInput = ({ label,type="text", ...prop }) => {
  return (
    <div className="mb-4"> {/* Margin bottom for spacing */}
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <input 
        className="border border-gray-300 rounded-md shadow-sm w-full p-2" 
        type={type}
        {...prop} 
      />
    </div>
  );
};

export default TextInput;
