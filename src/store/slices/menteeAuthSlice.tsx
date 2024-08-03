import {createSlice, PayloadAction} from "@reduxjs/toolkit"

interface Mentee {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  isBlocked: boolean;
  otpVerified: boolean;
  profilePicture?:string;
  coverPicture?: string;
  __v: number;
}

export interface MenteeState {
  menteeLogin: boolean;
  menteeData: Mentee | null;
}

const initialState:MenteeState = {
  menteeLogin : false,
  menteeData : null,
}

const menteeSlice = createSlice({
  name:"mentee",
  initialState,
  reducers:{
    menteeLogin : (state,action:PayloadAction<Mentee>)=>{
      state.menteeLogin = true
      state.menteeData = action.payload
    },

    menteeLogout : (state)=> {
      state.menteeLogin = false
    },
  }
})


export const { menteeLogin , menteeLogout } = menteeSlice.actions
export default menteeSlice.reducer