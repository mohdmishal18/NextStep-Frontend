import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SignupInputField from "../../common/SignupInputField";
import { MentorApplicationData } from "../../../Types/mentorTypes";

interface FinalFormProps {
  onSubmit: (data: MentorApplicationData) => void;
  onPrevious: (data: Partial<MentorApplicationData>) => void; // Accept data as a parameter
  formData: Partial<MentorApplicationData>;
}

const FinalForm: React.FC<FinalFormProps> = ({ onSubmit, onPrevious, formData }) => {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<MentorApplicationData>({
    defaultValues: formData as MentorApplicationData,
  });

  useEffect(() => {
    reset(formData as MentorApplicationData);
  }, [formData, reset]);

  const submitForm: SubmitHandler<MentorApplicationData> = (data) => {
    console.log(data, "final data");
    onSubmit(data);
  };

  const handlePrevious = () => {
    const currentData = getValues(); // Get current form values
    onPrevious(currentData); // Pass the current data back
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
      <SignupInputField
        label="Why do you want to become a mentor? (optional) "
        placeholder="Tell us why you want to become a mentor "
        type="textarea"
        register={register("whyBecomeMentor")}
        error={errors.whyBecomeMentor}
      />

      <SignupInputField
        label="What, in your opinion, has been your greatest achievement so far?(optional)"
        placeholder="Describe your greatest achievement"
        type="textarea"
        register={register("greatestAchievement")}
        error={errors.greatestAchievement}
      />

      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={handlePrevious}
          className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600"
        >
          Previous
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default FinalForm;
