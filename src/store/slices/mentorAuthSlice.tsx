import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Mentor {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isBlocked: boolean;
  education: string;
  bio: string
  otpVerified: boolean;
  profilePicture?:string;
  coverPicture?: string;
  linkedinUrl: string;
  presentCompany: string;
  presentRole: string;
  country: string;
  place: string;
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