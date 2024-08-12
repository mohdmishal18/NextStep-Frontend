import API from "../service/axios";
import errorHandle from "./errorHandling";

//endpoints
import adminRoutes from "../service/endPoints/adminEndpoint";

//AUTH

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

// logout
export const Logout = async () => {
  
  try {
    return await API.post(adminRoutes.logout)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
}

//SKILL management

//get skills
export const getAllSkills = async () => {
  
  try {
    return await API.get(adminRoutes.getSkills)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
}