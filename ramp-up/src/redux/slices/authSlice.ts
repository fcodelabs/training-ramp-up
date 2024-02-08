import { createSlice } from "@reduxjs/toolkit";
import { lookInSession, removeFromSession, storeInSession } from "../../utility/sessionStorage";

const initialState = {
    userDetails: lookInSession('user') ? JSON.parse(lookInSession('user')!) : null,
    userCredentials: null,
    error: null, 
    loginSuccess: false, 
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getUserCredentials: (state, action) => {
            state.userCredentials = action.payload;
            state.error = null; 
            state.loginSuccess = false; 
        },
        getUserDetails: (state,action) => {
            state.userDetails = action.payload;
            state.error = null; 
            state.loginSuccess = false; 
        },
        setUser: (state, action) => {
            state.userDetails = action.payload;
            state.userCredentials = null;
            state.error = null; 
            state.loginSuccess = true; 
        },
        createUser: (state, action) => {
            state.userDetails = action.payload;
            state.userCredentials = null;
            state.error = null; 
            state.loginSuccess = true; 
        },
        loginFailure: (state, action) => {
            state.error = action.payload; 
            state.loginSuccess = false; 
        },
        loginSuccess: (state) => {
            state.loginSuccess = true;
        },
        logout: (state) => {
            state.userDetails = null;
            state.error = null; 
            state.loginSuccess = false; 
            removeFromSession('user');
        }
    }
})

export const { setUser, getUserCredentials, loginFailure, logout, loginSuccess, getUserDetails, createUser } = authSlice.actions;

export default authSlice.reducer;
