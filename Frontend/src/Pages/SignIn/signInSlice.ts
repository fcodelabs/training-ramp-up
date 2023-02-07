/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

interface SignInPageState {
  error: { type: string; message: string };
  loading: boolean;
  isLogged: boolean;
  email: string;
  role: string;
}

const initialState: SignInPageState = {
  error: { type: "", message: "" },
  loading: false,
  isLogged: false,
  email: "",
  role: "",
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.error = { type: "", message: "" };
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUp: (state, action) => {
      state.loading = true;
    },

    signUpSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.error = { type: "", message: "" };
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.isLogged = false;
      state.email = "";
      state.role = "";
      state.error = { type: "", message: "" };
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signIn,
  signInSuccess,
  signInFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
} = signInSlice.actions;

export default signInSlice.reducer;
