import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import SignupInputField from "../../common/SignupInputField";
import { MentorApplicationData } from "../../../Types/mentorTypes";
import { FaEye } from "react-icons/fa";
import { RiEyeCloseFill } from "react-icons/ri";

interface AboutYouFormProps {
  onSubmit: (data: Partial<MentorApplicationData>) => void;
  formData: Partial<MentorApplicationData>; // Added prop
}

const AboutYouForm: React.FC<AboutYouFormProps> = ({ onSubmit, formData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Partial<MentorApplicationData>>({
    defaultValues: formData, // Set default values to the current form data
  });
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  );

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitForm: SubmitHandler<Partial<MentorApplicationData>> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col items-center space-y-4 p-4"
    >
      <div className="flex flex-col sm:flex-row items-center sm:space-x-4 mb-4 w-full">
        <div className="relative flex-shrink-0">
          <input
            id="profilePicture"
            type="file"
            {...register("profilePicture")}
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview as string}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-600"
        >
          Upload Photo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-grow">
          <SignupInputField
            label="First Name"
            placeholder="Enter your first name"
            type="text"
            register={register("firstName", {
              required: "First name is required",
            })}
            error={errors.firstName}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Last Name"
            placeholder="Enter your last name"
            type="text"
            register={register("lastName", {
              required: "Last name is required",
            })}
            error={errors.lastName}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-grow">
          <SignupInputField
            label="Email"
            placeholder="Enter your email"
            type="email"
            register={register("email", {
              required: "Email is required",
            })}
            error={errors.email}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Password"
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            register={register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Password must contain at least one uppercase letter and one special character",
              },
            })}
            error={errors.password}
            icon={
              showPassword ? (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <RiEyeCloseFill
                  onClick={() => setShowPassword(!showPassword)}
                />
              )
            }
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row w-full space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-grow">
          <SignupInputField
            label="Job Title"
            placeholder="Enter your job title"
            type="text"
            register={register("jobTitle", {
              required: "Job title is required",
            })}
            error={errors.jobTitle}
          />
        </div>
        <div className="flex-grow">
          <SignupInputField
            label="Company"
            placeholder="Enter your company"
            type="text"
            register={register("company", {
              required: "Company is required",
            })}
            error={errors.company}
          />
        </div>
      </div>

      <div className="w-full">
        <SignupInputField
          label="Location"
          placeholder="Enter your location"
          type="text"
          register={register("location", {
            required: "Location is required",
          })}
          error={errors.location}
        />
      </div>

      <div className="self-end mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default AboutYouForm;
