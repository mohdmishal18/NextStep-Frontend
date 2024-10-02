import API from "../service/axios";
import errorHandle from "./errorHandling";

import followRoutes from "../service/endPoints/followEndpoints";

// Sign in
export const FollowMentee = async (userid: string, followingid: string) => {
    try {
      return await API.post(followRoutes.followMentee, { userid, followingid });
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};

export const UnFollowMentee = async (userid: string, followingid: string) => {
    try {
      return await API.post(followRoutes.unFollowMentee, { userid, followingid });
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};

export const FollowCount = async (userid: string) => {
    try {
      return await API.post(followRoutes.count, { userid });
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};

export const FollowUnFollowStatus = async (userid: string, followingid: string) => {
    try {
      return await API.post(followRoutes.followUnFollowStatus, { userid, followingid });
    } catch (error) {
      const err: Error = error as Error;
      errorHandle(err);
      throw err; // Re-throw the error after handling it
    }
};

