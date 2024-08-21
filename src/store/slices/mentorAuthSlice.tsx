import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Mentor {
  _id: string;
    profilePicture: string;
    coverPicture?: string;
    firstName: string
    lastName: string;
    password: string;
    email: string;
    jobTitle: string;
    company: string;
    location: string;
    skills: { name: string }[]
    bio: string;
    linkedInUrl: string;
    personalWebsiteUrl?: string;
    whyBecomeMentor: string;
    greatestAchievement: string;
    isBlocked: boolean;
    status: 'pending' | 'approved' | 'rejected';
    __v: number;
}

export interface MentorState {
  mentorLogin: boolean;
  mentorData: Mentor | null;
}

const initialState:MentorState = {
    mentorLogin : false,
    mentorData : null,
}

const mentorSlice = createSlice({
  name:"mentor",
  initialState,
  reducers:{
    mentorLogin : (state,action:PayloadAction<Mentor | null>)=>{
      state.mentorLogin = true
      state.mentorData = action.payload
    },

    mentorLogout : (state)=> {
      state.mentorLogin = false
    },
  }
})


export const { mentorLogin , mentorLogout } = mentorSlice.actions
export default mentorSlice.reducer