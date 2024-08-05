import API from "../service/axios";
import errorHandle from "./errorHandling";
//Endpoints
import menteeRoutes from "../service/endPoints/menteeEndpoint";

//types
import { signUpData } from "../Types/menteeTypes";

export const menteeSignup = async (menteeData: signUpData) => {
  try {
    const res = await API.post(menteeRoutes.Signup, menteeData);

    return res;
  } catch (err) {
    console.log(err, "error from api");
    throw err;
  }
};

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
