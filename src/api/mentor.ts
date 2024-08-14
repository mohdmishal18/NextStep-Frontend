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