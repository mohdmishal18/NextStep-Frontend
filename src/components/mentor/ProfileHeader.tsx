import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { MentorData } from "../../Types/mentorTypes";
import { menteeLogin } from "../../store/slices/menteeAuthSlice";
import { editPictures } from "../../api/mentee";
import { FaEdit } from "react-icons/fa";

// Define the types for the images
type UploadImageResponse = {
  secure_url: string;
};

const ProfileHeader: React.FC = () => {
  
  const mentor: MentorData | null = useSelector(
    (state: rootState) => state.mentor.mentorData
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
    null
  );
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewBannerImage, setPreviewBannerImage] = useState<string | null>(
    null
  );

  const dispatch = useDispatch();


  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerImage(file)
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (
    profileImage: File,
    coverImage: File
  ): Promise<{ profileUrl: string; coverUrl: string } | null> => {
    const profileData = new FormData();
    profileData.append("file", profileImage);
    profileData.append("upload_preset", "NextStep");
    profileData.append("cloud_name", "mohdmishal");
    profileData.append("folder", '/NextStepPictures/ProfilePictures/');

    const coverData = new FormData();
    coverData.append("file", coverImage);
    coverData.append("upload_preset", "NextStep");
    coverData.append("cloud_name", "mohdmishal");
    coverData.append("folder", 'NextStepPictures/CoverPictures/');

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

      const coverResponse = await axios.post<UploadImageResponse>(
        "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
        coverData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return {
        profileUrl: profileResponse.data.secure_url,
        coverUrl: coverResponse.data.secure_url,
      };
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const handleSubmit = async () => {
    if (profileImage && bannerImage) { // Check that both images are not null
      try {
        const responseUrl = await uploadImage(profileImage, bannerImage);
        console.log(responseUrl, " this is the two urls");

        const email = mentor?.email!
        const profilePic = responseUrl?.profileUrl
        const coverPic = responseUrl?.coverUrl
  
        if (responseUrl) {
          const response = await editPictures(
           email,
           profilePic as string,
           coverPic as string
          );
          console.log(response, "response from updating user images")
  
          // Check if response is defined and has the expected properties
          if (response && response.status && response.user) {
            dispatch(menteeLogin(response.user));
            toast.success("profile updated successfully")
          } else {
            toast.error("Failed to update profile. Please try again.");
          }
        } else {
          toast.error("Image upload failed. Please try again.");
        }
      } catch (error) {
        // Handle the error
        console.error("Error uploading images", error);
        toast.error("An error occurred while uploading images.");
      }
    } else {
      // Handle the case when either profileImage or bannerImage is null
      toast.error("Please select both profile and banner images before submitting.");
    }
  };
  

  return (
    <section className="flex flex-col grow mt-20 w-full rounded-xl bg-zinc-900 max-md:mt-10 max-md:max-w-full">
      <div className="flex relative flex-col rounded-xl bg-zinc-800 max-md:max-w-full">
        <div className="flex flex-col items-start px-5 pt-20 w-full rounded-xl min-h-[250px] max-md:pr-5 max-md:max-w-full">
          <img
            loading="lazy"
            src={previewBannerImage || mentor?.coverPicture || "/placeeHolderProfile.jpg"}
            alt="Profile background"
            className="object-cover absolute inset-0 w-full h-full rounded-xl"
          />
          <label className="absolute top-5 right-5 z-20 p-1 bg-zinc-900 rounded-full cursor-pointer">
            <FaEdit className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleBannerImageChange}
            />
          </label>
        </div>
        <div className="z-10 pt-3 pr-3 pb-8 pl-20 mb-0  bg-secondary max-md:pl-5 max-md:mb-2.5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-[84%] max-md:ml-0 max-md:w-full">
              <div className="mt-16 flex flex-col grow items-start font-light text-sky-50 max-md:mt-10 max-md:max-w-full">
                <h2 className="ml-5 text-3xl max-md:ml-2.5">{`${mentor?.firstName} ${mentor?.lastName}`}</h2>
                {/* <div className="flex gap-4 px-5 py-2.5 mt-3.5 whitespace-nowrap rounded-xl bg-zinc-900">
                  <div className="flex flex-col">
                    <div className="text-xl">13</div>
                    <div className="mt-2.5 text-base">posts</div>
                  </div>
                  <
                    div className="flex flex-col self-start">
                    <div className="text-xl">302</div>
                    <div className="mt-2.5 text-base">followers</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="self-center text-xl">35</div>
                    <div className="mt-2 text-base">following</div>
                  </div>
                </div> */}
                <p className="self-stretch mt-5 text-sm leading-3 text-white max-md:max-w-full">
                  {mentor?.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[10%] max-md:ml-0 max-md:w-full">
              <button className="bg-blue text-white p-2 rounded-md"
              onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="absolute left-10 top-40 z-10 w-44 h-44 rounded-full border-[5px] border-zinc-900 object-cover">
          <img
            loading="lazy"
            src={previewProfileImage || mentor?.profilePicture || "/placeeHolderProfile.jpg"}
            alt="Profile picture"
            className="w-full h-full rounded-full object-cover"
          />
          <label className="absolute bottom-2 right-2 z-20 p-1 bg-zinc-900 rounded-full cursor-pointer">
            <FaEdit className="text-white" />
            <input
              type="file"
              className="hidden"
              onChange={handleProfileImageChange}
            />
          </label>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
