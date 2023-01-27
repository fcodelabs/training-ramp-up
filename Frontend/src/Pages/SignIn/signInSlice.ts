import { createSlice } from "@reduxjs/toolkit";

interface SignInPageState {
  error: string;
  loading: boolean;
  isLogged: boolean;
  email: string;
  role: string;
}

const initialState: SignInPageState = {
  error: "",
  loading: false,
  isLogged: false,
  email: "",
  role: "",
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    signIn: (state) => {
      state.loading = true;
    },

    signInSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signIn, signInSuccess, signInFailure } = signInSlice.actions;

export default signInSlice.reducer;
