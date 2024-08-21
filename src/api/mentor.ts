import API from "../service/axios";
import errorHandle from "./errorHandling";
import { MentorApplicationData } from "../Types/mentorTypes";

//endpoints
import { mentorRoutes } from "../service/endPoints/mentorEndpoints";



export const mentorApply = async (MentorData: MentorApplicationData) => {
    try {
      const res = await API.post(mentorRoutes.Apply, MentorData);
      return res;
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err; // Re-throw the error after handling it
    }
};

// Sign in
export const SignIn = async (email: string, password: string) => {
  try {
    return await API.post(mentorRoutes.Signin, { email, password });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};

// Logout Api
export const logout = async () => {
  try {
    return await API.post(mentorRoutes.logout);
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};


// Google login
export const googleAuthLogin = async (name: string, email: string, image: string) => {
  try {
    return await API.post(mentorRoutes.googleAuth, { name, email, image });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};