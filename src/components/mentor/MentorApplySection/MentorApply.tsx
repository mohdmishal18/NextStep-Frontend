import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MentorApplicationData } from "../../../Types/mentorTypes";
import AboutYouForm from "./AboutYouForm";
import ProfileForm from "./ProfileForm";
import { mentorApply } from "../../../api/mentor";
import FinalForm from "./FinalForm";
import ProgressBar from "./ProgressBar";
import { toast } from "react-toastify";
import axios from "axios";

// Define the types for the images
type UploadImageResponse = {
  secure_url: string;
};

const MentorApply: React.FC = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<MentorApplicationData>>({});

  const handleNextStep = (data: Partial<MentorApplicationData>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const uploadImage = async (profileImage: File): Promise<{ profileUrl: string;} | null> => {
    
    const profileData = new FormData();
    profileData.append("file", profileImage);
    profileData.append("upload_preset", "NextStep");
    profileData.append("cloud_name", "mohdmishal");
    profileData.append("folder", '/MentorProfile');

    try {
      const profileResponse = await axios.post<UploadImageResponse>(
        "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
        profileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        profileUrl: profileResponse.data.secure_url
      };
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleFinalSubmit = async (data: MentorApplicationData) => {
    let finalData = { ...formData, ...data };

    if (finalData.profilePicture instanceof File) {
      const uploadResult = await uploadImage(finalData.profilePicture);
      console.log("this is the url for picture", uploadResult?.profileUrl);
      
      if (uploadResult) {
        finalData = { ...finalData, profilePicture: uploadResult.profileUrl };
      } else {
        toast.error("Failed to upload the profile picture.");
        return;
      }
    }

    console.log("Final Submission Data:", finalData);

    try {
      const response = await mentorApply(finalData);
      console.log(response, "res from mentor apply");

      if (response.data.status) {
        toast.success("Application submitted successfully");
        navigate('/applySuccess')
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
