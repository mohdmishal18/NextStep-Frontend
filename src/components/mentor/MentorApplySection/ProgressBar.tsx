import React from "react";
import { CheckCircle, RadioButtonUnchecked } from "@mui/icons-material";

interface ProgressBarProps {
  step: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Progress Step Indicators */}
      <div className="flex items-center justify-between w-full">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col ml-5 items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${index < step - 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}`}
            >
              {index < step - 1 ? <CheckCircle fontSize="small" /> : <RadioButtonUnchecked fontSize="small" />}
            </div>
            {index < step - 1 && index < 2 && <div className={`w-16 h-1 bg-gray-300`}></div>}
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between w-full mt-2 px-4">
        <span className={`text-sm ${step >= 1 ? 'text-blue font-semibold' : 'text-gray-500 font-semibold'}`}>About You</span>
        <span className={`text-sm ${step >= 2 ? 'text-blue font-semibold' : 'text-gray-500 font-semibold'}`}>Profile</span>
        <span className={`text-sm ${step >= 3 ? 'text-blue font-semibold' : 'text-gray-500 font-semibold'}`}>Experience</span>
      </div>
    </div>
  );
};

export default ProgressBar;
