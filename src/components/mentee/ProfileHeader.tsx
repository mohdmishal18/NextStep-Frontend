import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { MenteeProfile } from "../../Types/menteeTypes";
import { menteeLogin } from "../../store/slices/menteeAuthSlice";
import useFollowCount from "../../hooks/useFollowCount";
import { editPictures } from "../../api/mentee";
import { Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UploadImageResponse = {
  secure_url: string;
};

const ProfileHeader: React.FC = () => {
  const mentee: MenteeProfile | null = useSelector(
    (state: rootState) => state.mentee.menteeData
  );
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewProfileImage, setPreviewProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [previewBannerImage, setPreviewBannerImage] = useState<string | null>(null);

  // Add refs for file inputs
  const profileInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const { 
    followingCount, 
    followersCount 
  } = useFollowCount(mentee?._id!);

  const dispatch = useDispatch();

  // Add click handlers for the buttons
  const handleProfileButtonClick = () => {
    profileInputRef.current?.click();
  };

  const handleBannerButtonClick = () => {
    bannerInputRef.current?.click();
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
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
      setBannerImage(file);
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
      const [profileResponse, coverResponse] = await Promise.all([
        axios.post<UploadImageResponse>(
          "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
          profileData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        ),
        axios.post<UploadImageResponse>(
          "https://api.cloudinary.com/v1_1/mohdmishal/image/upload",
          coverData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
      ]);

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
    if (!profileImage || !bannerImage) {
      toast.error("Please select both profile and banner images.");
      return;
    }

    try {
      const responseUrl = await uploadImage(profileImage, bannerImage);
      if (!responseUrl) {
        toast.error("Image upload failed");
        return;
      }

      const response = await editPictures(
        mentee?.email!,
        responseUrl.profileUrl,
        responseUrl.coverUrl
      );

      if (response?.status && response?.user) {
        dispatch(menteeLogin(response.user));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error uploading images", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <Card className="mt-20 w-full bg-white">
      <div className="relative">
        {/* Banner Image */}
        <div className="relative h-[250px] overflow-hidden rounded-t-xl">
          <img
            src={previewBannerImage || mentee?.coverPicture || "/placeeHolderProfile.jpg"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-10">
            <Button 
              variant="secondary" 
              size="icon" 
              className="rounded-full"
              onClick={handleBannerButtonClick}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <input
              ref={bannerInputRef}
              type="file"
              className="hidden"
              onChange={handleBannerImageChange}
              accept="image/*"
            />
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute -bottom-16 left-8">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-white">
              <AvatarImage 
                src={previewProfileImage || mentee?.profilePicture || "/placeeHolderProfile.jpg"} 
                alt={mentee?.name} 
              />
              <AvatarFallback>{mentee?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0">
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full h-8 w-8"
                onClick={handleProfileButtonClick}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <input
                ref={profileInputRef}
                type="file"
                className="hidden"
                onChange={handleProfileImageChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
      </div>

      <CardContent className="pt-20 pb-6">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{mentee?.name}</h2>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-xl font-medium">0</p>
                <p className="text-sm text-gray-500">posts</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">{followersCount ?? 0}</p>
                <p className="text-sm text-gray-500">followers</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">{followingCount ?? 0}</p>
                <p className="text-sm text-gray-500">following</p>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl">{mentee?.bio}</p>
          </div>
          <Button onClick={handleSubmit} className="shrink-0">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;