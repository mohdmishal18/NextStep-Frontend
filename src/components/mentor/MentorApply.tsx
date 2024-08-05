import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { RiEyeCloseFill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import SignupInputField from "../common/SignupInputField";
import axios from "axios";
import { mentorApplicationData } from "../../Types/mentorTypes";

const MentorApply: React.FC = () => {
  const [profilePicturePreview, setProfilePicturePreview] = useState<
    string | null
  >(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileError, setProfileError] = useState(true)
console.log(profileError);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<mentorApplicationData>();

  const password = watch("password");

  const validateProfilePicture = (file: File | undefined): true | string => {
    if (!file){
      setProfileError(true)
      return "Profile picture is required";
    } 
    return true;
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files ? e.target.files[0] : undefined;
    const validationResult = validateProfilePicture(file);
    if (validationResult !== true) {
      setError("profilePicture", { type: "manual", message: validationResult });
      return;
    }
    setProfileError(false)
    clearErrors("profilePicture");
    if (file) {
      const filePreview = URL.createObjectURL(file);
      setProfilePicturePreview(filePreview);
      setValue("profilePicture", file);
    } else {
      setProfilePicturePreview(null); // Clear preview if no file selected
    }
  };

  const onSubmit: SubmitHandler<mentorApplicationData> = async (
    data: mentorApplicationData
  ) => {
    // if (!data.profilePicture) {
    //   setError("profilePicture", { type: "manual", message: "Profile picture is required" });
    //   return; // Prevent form submission if no profile picture
    // }

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("education", data.education);
      formData.append("presentCompany", data.presentCompany);
      formData.append("country", data.country);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("shortBio", data.shortBio);
      formData.append("email", data.email);
      formData.append("linkedInUrl", data.linkedInUrl);
      formData.append("presentRole", data.presentRole);
      formData.append("place", data.place);
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      const response = await axios.post("/api/mentor-apply", formData);
      if (response.data.success) {
        toast.success("Application submitted successfully");
      } else {
        toast.error("Submission failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.error?.message ||
          "An unexpected error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <main className="flex justify-center items-center px-16 py-20 w-full bg-zinc-900 max-md:px-5 max-md:max-w-full">
      <div className="flex flex-col items-center mb-4 w-full max-w-[1033px] max-md:max-w-full">
        <h1 className="text-5xl font-semibold tracking-tighter text-white leading-[61.88px] max-md:max-w-full max-md:text-4xl">
          Apply for Mentor Role
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-400 max-md:max-w-full">
          Clarity gives you the blocks and components you need to create a truly
          professional website.
        </p>
        <form className="w-full mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-center items-center mt-12">
            <div className="flex items-center">
              <img
                loading="lazy"
                src={profilePicturePreview || "/placeeHolderProfile.jpg"}
                alt="Mentor Profile"
                className="rounded-full border-solid aspect-square border-[5px] border-zinc-900 w-[180px] max-md:mt-10 mr-4" // Margin right added for spacing
              />
              <label
                htmlFor="profile-picture"
                className="bg-blue-600 p-2 rounded-full cursor-pointer"
              >
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                <span className="text-white text-xl">✎</span>{" "}
                {/* This acts as the visible button */}
              </label>
              {errors.profilePicture && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.profilePicture.message}
                </p>
              )}
              
              {profileError && (
                <p className="text-red-500 text-sm mt-2">
                  Profile picture is required !
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <SignupInputField
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
                register={register("fullName", {
                  required: "Full name is required",
                })}
                error={errors.fullName}
              />
              <SignupInputField
                label="Education"
                placeholder="Enter your education"
                type="text"
                register={register("education", {
                  required: "Education is required",
                })}
                error={errors.education}
              />
              <SignupInputField
                label="Present Company"
                placeholder="Company name"
                type="text"
                register={register("presentCompany", {
                  required: "Present company is required",
                })}
                error={errors.presentCompany}
              />
              <SignupInputField
                label="Country"
                placeholder="Enter your nationality"
                type="text"
                register={register("country", {
                  required: "Country is required",
                })}
                error={errors.country}
              />
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
              <SignupInputField
                label="Short Bio"
                placeholder="Tell us about yourself"
                type="textarea"
                register={register("shortBio", {
                  required: "Short bio is required",
                  minLength: {
                    value: 20,
                    message: "Short bio must be at least 20 characters long",
                  },
                })}
                error={errors.shortBio}
              />
            </div>
            <div className="flex flex-col">
              <SignupInputField
                label="Email"
                placeholder="Enter your email address"
                type="email"
                register={register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email}
              />
              <SignupInputField
                label="LinkedIn URL"
                placeholder="Enter your LinkedIn URL"
                type="url"
                register={register("linkedInUrl", {
                  required: "LinkedIn URL is required",
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/[\w\d-]*)*$/,
                    message: "Invalid URL",
                  },
                })}
                error={errors.linkedInUrl}
              />
              <SignupInputField
                label="Present Role"
                placeholder="Enter your current role"
                type="text"
                register={register("presentRole", {
                  required: "Present role is required",
                })}
                error={errors.presentRole}
              />
              <SignupInputField
                label="Place"
                placeholder="Current city or place"
                type="text"
                register={register("place", {
                  required: "Place is required",
                })}
                error={errors.place}
              />
              <SignupInputField
                label="Confirm Password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                register={register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords must match",
                })}
                error={errors.confirmPassword}
                icon={
                  showConfirmPassword ? (
                    <FaEye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <RiEyeCloseFill
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )
                }
              />
              <div className="mt-5 flex flex-col justify-center items-center w-full">
                <p className="mb-4 text-sm leading-6 text-blue">
                  Already a mentor?{" "}
                  <a href="#" className="font-semibold text-blue">
                    Log in to your account.
                  </a>
                </p>
                <button
                  type="submit"
                  className="px-4 py-2.5 text-base font-semibold tracking-normal leading-7 text-center text-white bg-blue rounded-[50px] w-[207px] max-md:px-5"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MentorApply;
