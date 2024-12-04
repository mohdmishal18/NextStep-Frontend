import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { mentorLogin } from '../../store/slices/mentorAuthSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MentorData } from '../../Types/mentorTypes';
import { rootState } from '../../store/store';
// import { editDetails } from '../../api/mentor';

interface PersonalInfoForm {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  company: string;
  location: string;
  bio: string;
  linkedInUrl: string;
  personalWebsiteUrl: string;
}

const PersonalInfo: React.FC = () => {
  const mentor: MentorData | null = useSelector(
    (state: rootState) => state.mentor.mentorData
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PersonalInfoForm>();

  useEffect(() => {
    if (mentor) {
      setValue("firstName", mentor.firstName);
      setValue("lastName", mentor.lastName);
      setValue("jobTitle", mentor.jobTitle);
      setValue("company", mentor.company);
      setValue("location", mentor.location);
      setValue("bio", mentor.bio);
      setValue("linkedInUrl", mentor.linkedInUrl);
      setValue("personalWebsiteUrl", mentor.personalWebsiteUrl as string);
    }
  }, [mentor, setValue]);

  const onSubmit: SubmitHandler<PersonalInfoForm> = async (data) => {
    try {
      const {
        firstName,
        lastName,
        jobTitle,
        company,
        location,
        bio,
        linkedInUrl,
        personalWebsiteUrl,
      } = data;

      const email = mentor?.email!;

      const response = await editDetails({
        firstName,
        lastName,
        jobTitle,
        company,
        location,
        bio,
        linkedInUrl,
        personalWebsiteUrl,
        email
      });

      if (response && response.status && response.user) {
        dispatch(mentorLogin(response.user));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating details", error);
      toast.error("An error occurred while updating the details.");
    }
  };

  return (
    <section className="flex flex-col items-start pt-3 pr-3 pb-8 pl-6 mt-6 rounded-xl bg-zinc-800 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <h2 className="text-2xl text-white mb-6">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
            <div className="flex flex-col w-full sm:w-1/2 pr-3">
              <h3 className="text-lg text-zinc-500">First Name</h3>
              <input
                type="text"
                {...register("firstName", { required: "First Name is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 pl-3">
              <h3 className="text-lg text-zinc-500">Last Name</h3>
              <input
                type="text"
                {...register("lastName", { required: "Last Name is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
            <div className="flex flex-col w-full sm:w-1/2 pr-3">
              <h3 className="text-lg text-zinc-500">Job Title</h3>
              <input
                type="text"
                {...register("jobTitle", { required: "Job Title is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 pl-3">
              <h3 className="text-lg text-zinc-500">Company</h3>
              <input
                type="text"
                {...register("company", { required: "Company is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.company && <p className="text-red-500">{errors.company.message}</p>}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full mb-6">
            <div className="flex flex-col w-full sm:w-1/2 pr-3">
              <h3 className="text-lg text-zinc-500">Location</h3>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.location && <p className="text-red-500">{errors.location.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 pl-3">
              <h3 className="text-lg text-zinc-500">LinkedIn URL</h3>
              <input
                type="url"
                {...register("linkedInUrl", { required: "LinkedIn URL is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.linkedInUrl && <p className="text-red-500">{errors.linkedInUrl.message}</p>}
            </div>
          </div>
          <div className="flex flex-col w-full mb-6">
            <h3 className="text-lg text-zinc-500">Personal Website</h3>
            <input
              type="url"
              {...register("personalWebsiteUrl")}
              className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col w-full mb-6">
            <h3 className="text-lg text-zinc-500">Bio</h3>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              className="mt-3 text-xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2 h-32 resize-none"
            />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>
          <button type="submit" className="bg-blue text-white py-3 px-5 rounded-lg mt-6 self-end">
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default PersonalInfo;
