import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { menteeLogin } from '../../store/slices/menteeAuthSlice';
import { MenteeProfile } from '../../Types/menteeTypes';
import { rootState } from '../../store/store';
import { editDetails } from '../../api/mentee';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface PersonalInfoForm {
  fullName: string;
  phone: string;
  email: string;
  education: string;
  bio: string;
}

const PersonalInfo: React.FC = () => {
  const mentee = useSelector((state: rootState) => state.mentee.menteeData);
  const dispatch = useDispatch();

  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm<PersonalInfoForm>();

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

  const onSubmit = async (data: PersonalInfoForm) => {
    try {
      const response = await editDetails(
        data.fullName,
        data.phone,
        data.bio,
        data.education,
        mentee?.email!
      );
      
      if (response?.status && response?.user) {
        dispatch(menteeLogin(response.user));
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating profile");
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register("fullName", { 
                  required: "Full name is required" 
                })}
                className={errors.fullName ? "border-red-500" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={mentee?.email}
                disabled
                className="bg-gray-100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register("phone", {
                  validate: validateMobileNumber
                })}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                {...register("education", { 
                  required: "Education is required" 
                })}
                className={errors.education ? "border-red-500" : ""}
              />
              {errors.education && (
                <p className="text-sm text-red-500">{errors.education.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              {...register("bio", { 
                required: "Bio is required" 
              })}
              className={`min-h-[120px] ${errors.bio ? "border-red-500" : ""}`}
            />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;