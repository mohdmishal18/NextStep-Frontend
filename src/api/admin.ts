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

//add skill
export const addSkill = async (name: string) => {
  try {
    return await API.post(adminRoutes.addSkill, {name})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
}

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

// Edit Skill
export const editSkill = async (id: string, name: string) => {
  try {
    return await API.patch(adminRoutes.editSkill, {id, name});
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};

// Delete Skill
export const listSkill = async (id: string, status: boolean) => {
  try {
    return await API.patch(adminRoutes.listSkill, { id, status});
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
};

// Mentor Management

//get all application
export const getAllApplication = async () => {
  try {
    return await API.get(adminRoutes.getApplications)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err; // Re-throw the error after handling it
  }
}

// get all approved mentors
export const getApprovedMentors = async () => {
  try {
    return await API.get(adminRoutes.getApproved)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

// approve mentor
export const approveMentor = async (id: string, status: string) => {
  try {
    return await API.put(adminRoutes.approve, {id , status})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

//reject mentor
export const rejectMentor = async (id: string, status: string) => {
  try {
    return await API.put(adminRoutes.reject, {id , status})
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

export const getAllMentees = async () => {
  try {
    return await API.get(adminRoutes.getMentees)
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
}

export const blockMentor = async (id: string, status: boolean) => {
  try {
    return await API.post(adminRoutes.blockMentor, {
      id,
      status
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};

export const blockMentee = async (id: string, status: boolean) => {
  try {
    return await API.post(adminRoutes.blockMentee, {
      id,
      status
    });
  } catch (error) {
    const err: Error = error as Error;
    errorHandle(err);
    throw err;
  }
};
