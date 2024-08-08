import API from "../service/axios";
import errorHandle from "./errorHandling";

//endpoints
import adminRoutes from "../service/endPoints/adminEndpoint";

//types

// Sign in
export const signIn = async (email: string, password: string) => {
    try {
      return await API.post(adminRoutes.Signin, { email, password });
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};

// Google login
export const googleAuthLogin = async (name: string, email: string, image: string) => {
    try {
      return await API.post(adminRoutes.googleAuth, { name, email, image })
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};