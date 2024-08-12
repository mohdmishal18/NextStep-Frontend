import React, { useState } from "react";
import { MentorApplicationData } from "../../../Types/mentorTypes";
import AboutYouForm from "./AboutYouForm";
import ProfileForm from "./ProfileForm";
import FinalForm from "./FinalForm";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";
import axios from "axios";

const MentorApply: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MentorApplicationData>>({});

  const handleNextStep = (data: Partial<MentorApplicationData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFinalSubmit = async (data: MentorApplicationData) => {
    const finalData = { ...formData, ...data };
    console.log("Final Submission Data:", finalData);

    try {
      const formData = new FormData();
      for (const key in finalData) {
        formData.append(key, (finalData as any)[key]);
      }

      const response = await axios.post("/api/mentor-apply", formData);
      if (response.data.success) {
        toast.success("Application submitted successfully");
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <main className="flex flex-col justify-center items-center px-16 py-20 w-full bg-primary max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center mb-8 w-full max-w-[1033px] max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter text-white leading-[61.88px] max-md:max-w-full max-md:text-4xl text-center">
          Apply for Mentor Role
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400 max-md:max-w-full text-center">
          Clarity gives you the blocks and components you need to create a truly professional website.
        </p>
      </div>
      <div className="w-full max-w-[1033px] p-8 rounded-lg shadow-md max-md:max-w-full mb-8">
        <ProgressBar step={currentStep} />
      </div>
      <div
        className="w-full max-w-[1033px] p-8 rounded-lg mb-8 max-md:max-w-full"
        style={{
          boxShadow:
            "0 10px 30px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)",
        }}
      >
        {currentStep === 1 && (
          <AboutYouForm onSubmit={handleNextStep} formData={formData} />
        )}
        {currentStep === 2 && (
          <ProfileForm
            onSubmit={handleNextStep}
            onPrevious={handlePreviousStep}
            formData={formData}
          />
        )}
        {currentStep === 3 && (
          <FinalForm
            onSubmit={handleFinalSubmit}
            onPrevious={handlePreviousStep}
            formData={formData}
          />
        )}
      </div>
    </main>
  );
};

export default MentorApply;
