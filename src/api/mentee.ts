import API from "../service/axios";

//Endpoints
import menteeRoutes from "../service/endPoints/menteeEndpoint";

//types
import { signUpData } from "../Types/menteeTypes";

export const menteeSignup = async (menteeData: signUpData) => {
    
    try {
        const res = await API.post(menteeRoutes.Signup, menteeData)
        
        return res
    }
    catch(err) {
        console.log(err, "error from api");
        throw err
    }
    
}

export const verifyOtp = async (otp: number, email: string) => {
    try {
      return await API.post(menteeRoutes.verifyOtp, { otp,email });
    } catch (error) {
      const err: Error = error as Error;
      throw err; // Re-throw the error after handling it
    }
};