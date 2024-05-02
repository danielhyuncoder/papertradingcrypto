import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userData: null
    },
    reducers: {
        login: (state,action)=>{
            state.user=action.payload;
        },
        logout: (state)=>{
            state.user=null;
            state.userData=null;
        },
        updateUserData: (state, action)=>{
            state.userData=action.payload;
        }
    }
})

export const {login, logout, updateUserData} = userSlice.actions;
export default userSlice.reducer;