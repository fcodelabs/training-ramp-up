import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface SignInState{
    isSignInLoading: boolean;
    isSignUpLoading: boolean;
    isSignOutLoading: boolean;
    accessToken: string | null;
    signedIn: boolean;
    error: string;
    role: string | null;
}

const initialState: SignInState = {
    isSignInLoading: false,
    isSignUpLoading: false,
    isSignOutLoading: false,
    accessToken: null,
    signedIn: false,
    error: '',
    role: '',
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signUpUser: (state, action) => {
            state.isSignUpLoading = true;
        },
        signUpUserSuccess: (state) => {
            state.isSignUpLoading = false;
        },
        signUpUserFailure: (state, action) => {
            state.isSignUpLoading = false;
            state.error = action.payload;
        },
        signInUser: (state, action) => {
            state.isSignInLoading = true;
        },
        signInUserSuccess: (state, action) => {
            state.isSignInLoading = false;
            state.accessToken = action.payload.data.accessToken
            state.signedIn = true;
            state.role = action.payload.data.role;
            console.log('line 46 auth ', state.accessToken);
        },
        signInUserFailure: (state, action) => {
            state.isSignInLoading = false;
            state.error = action.payload;
            state.role = null;
        },
        signOutUser: (state) => {
            state.isSignOutLoading = true;
        },
        signOutUserSuccess: (state) => {
            state.isSignOutLoading = false;
            state.accessToken = null;
            state.signedIn = false;
            state.role = null;
        },
        signOutUserFailure: (state, action) => {
            state.isSignOutLoading = false;
            state.error = action.payload;
        }
    }
});

export const { 
    signUpUser, 
    signUpUserSuccess, 
    signUpUserFailure, 
    signInUser, 
    signInUserSuccess, 
    signInUserFailure, 
    signOutUser, 
    signOutUserSuccess, 
    signOutUserFailure } = authSlice.actions;
