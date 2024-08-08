import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { menteeLogin } from '../../store/slices/menteeAuthSlice';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

import { MenteeProfile } from '../../Types/menteeTypes';
import { rootState } from '../../store/store';
import { editDetails } from '../../api/mentee';

interface PersonalInfoForm {
  fullName: string;
  phone: string;
  email: string;
  education: string;
  bio: string;
}

const PersonalInfo: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );

  const dispatch = useDispatch()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PersonalInfoForm>();

  useEffect(() => {
    if (mentee) {
      setValue("fullName", mentee.name);
      setValue("phone", mentee.phone);
      setValue("education", mentee.education);
      setValue("bio", mentee.bio);
    }
  }, [mentee, setValue]);

  const validateMobileNumber = (value: string): true | string => {
    if (!value) return "Mobile number is required";
    const phoneNumber = parseInt(value, 10);
    if (isNaN(phoneNumber)) return "Mobile number must be numeric";
    if (value.length !== 10) return "Mobile number must be exactly 10 digits";
    return true;
  };

  const onSubmit: SubmitHandler<PersonalInfoForm> = async (data) => {

    try {
      const name = data.fullName
      const phone = data.phone
      const bio = data.bio
      const education = data.education
      const email = mentee?.email!

      const response = await editDetails(
        name,
        phone,
        bio,
        education,
        email
      )

      console.log(response, "res from edit mentee details")
      
      if (response && response.status && response.user) {
        dispatch(menteeLogin(response.user));
        toast.success("profile updated successfully")
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      // Handle the error
      console.error("Error uploading images", error);
      toast.error("An error occurred while uploading images.");
    }
  };

  return (
    <section className="flex flex-col items-start pt-3 pr-3 pb-14 pl-6 mt-24 rounded-xl bg-zinc-800 max-md:pl-5 max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col max-w-full w-full">
        <h2 className="text-2xl text-white mb-6">Personal Information</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pr-3">
              <h3 className="text-lg text-zinc-500">Full Name</h3>
              <input
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pl-3">
              <h3 className="text-lg text-zinc-500">Email Address</h3>
              <input
                type="email"
                value={mentee?.email}
                disabled
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2 cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pr-3">
              <h3 className="text-lg text-zinc-500">Phone No</h3>
              <input
                type="tel"
                {...register("phone", {
                  required: "Mobile number is required",
                  validate: validateMobileNumber
                })}
                className="mt-2 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
            </div>
            <div className="flex flex-col w-full sm:w-1/2 mb-6 sm:mb-0 pl-3">
              <h3 className="text-lg text-zinc-500">Education</h3>
              <input
                type="text"
                {...register("education", { required: "Education is required" })}
                className="mt-3 text-2xl font-light text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              />
              {errors.education && <p className="text-red-500">{errors.education.message}</p>}
            </div>
          </div>
          <div className="flex flex-col w-full mb-6">
            <h3 className="text-lg text-zinc-500">Bio</h3>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              className="mt-4 text-2xl font-light leading-7 text-white bg-transparent border border-zinc-600 rounded-lg p-2"
              rows={4}
            />
            {errors.bio && <p className="text-red-500">{errors.bio.message}</p>}
          </div>
          <div className="flex self-end">
            <button type="submit" className='bg-blue text-white p-2 w-24 rounded-md'>
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PersonalInfo;
