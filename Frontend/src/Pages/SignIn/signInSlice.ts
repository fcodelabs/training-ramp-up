import { createSlice } from "@reduxjs/toolkit";

interface SignInPageState {
  error: string;
  loading: boolean;
  isLogged: boolean;
}

const initialState: SignInPageState = {
  error: "",
  loading: false,
  isLogged: false,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    signIn: (state) => {
      state.loading = true;
    },

    signInSuccess: (state) => {
      state.loading = false;
      state.isLogged = true;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signIn, signInSuccess, signInFailure } = signInSlice.actions;

export default signInSlice.reducer;
