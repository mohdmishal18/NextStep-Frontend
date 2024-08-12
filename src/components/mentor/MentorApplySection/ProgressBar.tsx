import React from "react";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`w-full h-2 bg-gray-300 rounded ${step >= 1 ? 'bg-blue-600' : ''}`}></div>
      <div className={`w-full h-2 bg-gray-300 rounded ${step >= 2 ? 'bg-blue-600' : ''}`}></div>
      <div className={`w-full h-2 bg-gray-300 rounded ${step >= 3 ? 'bg-blue-600' : ''}`}></div>
    </div>
  );
};

export default ProgressBar;
