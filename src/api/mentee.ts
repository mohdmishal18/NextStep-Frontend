import API from "../service/axios";
import errorHandle from "./errorHandling";
//Endpoints
import menteeRoutes from "../service/endPoints/menteeEndpoint";
//types
import { signUpData } from "../Types/menteeTypes";

import { MenteeProfile } from "../Types/menteeTypes";

interface EditPicturesResponse {
  status: boolean;
  user: MenteeProfile;
}

export const menteeSignup = async (menteeData: signUpData) => {
  try {
    const res = await API.post(menteeRoutes.Signup, menteeData);

    return res;
  } catch (err) {
    console.log(err, "error from api");
    throw err;
  }
};

// Google Register
export const googleAuthRegister = async (name: string, email: string, image: string)=>{
  try {
    return await API.post(menteeRoutes.googleRegister, { name, email, image });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
}

// Sign in
export const signIn = async (email: string, password: string) => {
  try {
    return await API.post(menteeRoutes.Signin, { email, password });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};

// Logout Api
export const logout = async () => {
  try {
    return await API.post(menteeRoutes.logout);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};

export const verifyOtp = async (otp: number, email: string) => {
  try {
    return await API.post(menteeRoutes.verifyOtp, { otp, email });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

// Resend OTP
export const resendOtp = async (email: string) => {
  try {
    return await API.post(menteeRoutes.resendOtp, {email});
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
  }
};

export const editPictures = async (
  email: string,
  profilePic: string,
  coverPic: string
): Promise<EditPicturesResponse | undefined> => {
  try {
    const response = await API.post<EditPicturesResponse>(menteeRoutes.EditPictures, {
      email,
      profilePic,
      coverPic,
    });
    return response.data;
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    return undefined; // Ensure the function returns undefined in case of an error
  }
};


export const editDetails = async (
  name: string,phone: string,bio: string,education: string,email: string
): Promise<EditPicturesResponse | undefined> => {
  try {
    const response = await API.post<EditPicturesResponse>(menteeRoutes.EditDetails, {
     name,
     phone,
     bio,
     education,
     email,
    });
    return response.data;
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    return undefined; // Ensure the function returns undefined in case of an error
  }
};

// Google login
export const googleAuthLogin = async (name: string, email: string, image: string) => {
  try {
    return await API.post(menteeRoutes.googleAuth, { name, email, image });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};