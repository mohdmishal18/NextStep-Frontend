import { createSlice } from "@reduxjs/toolkit";

export interface adminState {
    adminLogin: boolean
}

const initialState: adminState = {
    adminLogin: false
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

        adminLogin: (state) => {
            state.adminLogin = true
        },

        adminLogout: (state) => {
            state.adminLogin = false
        }
    }
})

export const { adminLogin , adminLogout } = adminSlice.actions
export default adminSlice.reducer 