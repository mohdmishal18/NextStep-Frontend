import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SignupInputField from "../../common/SignupInputField";
import { MentorApplicationData } from "../../../Types/mentorTypes";

interface ProfileFormProps {
  onSubmit: (data: Partial<MentorApplicationData>) => void;
  onPrevious: (data: Partial<MentorApplicationData>) => void; // Accept data
  formData: Partial<MentorApplicationData>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, onPrevious, formData }) => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm<Partial<MentorApplicationData>>({
    defaultValues: formData
  });

  const handlePrevious = () => {
    const currentData = getValues();
    onPrevious(currentData); // Pass current data back
  };

  const submitForm: SubmitHandler<Partial<MentorApplicationData>> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      {/* Form fields */}
      <SignupInputField
        label="Category"
        placeholder="Enter your category"
        type="text"
        register={register("category", {
          required: "Category is required",
        })}
        error={errors.category}
      />
      <SignupInputField
        label="Skills"
        placeholder="Enter your skills"
        type="text"
        register={register("skills", {
          required: "Skills are required",
        })}
        error={errors.skills}
      />
      <SignupInputField
        label="Bio"
        placeholder="Enter your bio"
        type="text"
        register={register("bio", {
          required: "Bio is required",
        })}
        error={errors.bio}
      />
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <SignupInputField
            label="LinkedIn URL"
            placeholder="Enter your LinkedIn URL"
            type="url"
            register={register("linkedInUrl", {
              required: "LinkedIn URL is required",
            })}
            error={errors.linkedInUrl}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Personal Website URL"
            placeholder="Enter your personal website URL"
            type="url"
            register={register("personalWebsiteUrl", {
              required: "Personal website URL is required",
            })}
            error={errors.personalWebsiteUrl}
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button type="button" onClick={handlePrevious} className="bg-blue">Previous</button>
        <button type="submit" className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600">Next</button>
      </div>
    </form>
  );
};

export default ProfileForm;
