import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { useDispatch, UseDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { MenteeProfile } from "../../Types/menteeTypes";
import { FaEdit } from "react-icons/fa";

// Define the types for the images
type UploadImageResponse = {
  secure_url: string;
};


const ProfileHeader: React.FC = () => {
  const [profileImage, setProfileImage] = useState("");
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(
    null
  );
  const [bannerImage, setBannerImage] = useState(
    "/placeeHolderProfile.jpg"
  );
  const [previewBannerImage, setPreviewBannerImage] = useState<string | null>(
    null
  );

  const dispatch = useDispatch()

  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  )

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBannerImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (profileImage: File, coverImage: File): Promise<{ profileUrl: string; coverUrl: string } | null> => {
    const profileData = new FormData();
    profileData.append('file', profileImage);
    profileData.append('upload_preset', 'MohdMishal');
    profileData.append('cloud_name', 'usermanagement');
    profileData.append('folder', 'NextStepPictures/ProfilePictures');
  
    const coverData = new FormData();
    coverData.append('file', coverImage);
    coverData.append('upload_preset', 'MohdMishal');
    coverData.append('cloud_name', 'usermanagement');
    coverData.append('folder', 'NextStepPictures/ProfilePictures');
  
    try {
      const profileResponse = await axios.post<UploadImageResponse>('https://api.cloudinary.com/v1_1/usermanagement/image/upload', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const coverResponse = await axios.post<UploadImageResponse>('https://api.cloudinary.com/v1_1/usermanagement/image/upload', coverData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return {
        profileUrl: profileResponse.data.secure_url,
        coverUrl: coverResponse.data.secure_url
      };
    } catch (error) {
      toast.error('Image upload failed');
      return null;
    }
  };

  return (
    <section className="flex flex-col grow mt-20 w-full rounded-xl bg-zinc-900 max-md:mt-10 max-md:max-w-full">
      <div className="flex relative flex-col rounded-xl bg-zinc-800 max-md:max-w-full">
        <div className="flex flex-col items-start px-5 pt-20 w-full rounded-xl min-h-[250px] max-md:pr-5 max-md:max-w-full">
          <img
            loading="lazy"
            src={previewBannerImage || '/placeeHolderProfile.jpg'}
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
                <h2 className="ml-5 text-3xl max-md:ml-2.5">{mentee?.name}</h2>
                <div className="flex gap-4 px-5 py-2.5 mt-3.5 whitespace-nowrap rounded-xl bg-zinc-900">
                  <div className="flex flex-col">
                    <div className="text-xl">13</div>
                    <div className="mt-2.5 text-base">posts</div>
                  </div>
                  <div className="flex flex-col self-start">
                    <div className="text-xl">302</div>
                    <div className="mt-2.5 text-base">followers</div>
                  </div>
                  <div className="flex flex-col">
                    <div className="self-center text-xl">35</div>
                    <div className="mt-2 text-base">following</div>
                  </div>
                </div>
                <p className="self-stretch mt-5 text-sm leading-3 text-white max-md:max-w-full">
                  {mentee?.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[16%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c935fd99bdb8d472b8867428843687d0c6fcd431fb47b993b0ab5cbe24280b6?apiKey=989d0fe6dce947e78429c931599938be&&apiKey=989d0fe6dce947e78429c931599938be"
                alt="Edit profile"
                className="shrink-0 rounded-xl aspect-[2.04] w-[86px] max-md:mt-10"
              />
            </div>
          </div>
        </div>
        <div className="absolute left-10 top-40 z-10 w-44 h-44 rounded-full border-[5px] border-zinc-900 object-cover">
          <img
            loading="lazy"
            src={previewProfileImage || '/placeeHolderProfile.jpg'}
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
