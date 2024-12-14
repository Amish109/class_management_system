import React from 'react';

const TextArea = ({ label, ...prop }) => {
  return (
    <div className="mb-4"> {/* Margin bottom for spacing */}
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <textarea 
        className="text-md border border-gray-300 rounded-md shadow-sm  -500 w-full p-2 h-32 resize-none" 
        {...prop} 
      />
    </div>
  );
};

export default TextArea;
