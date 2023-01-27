import { createSlice } from "@reduxjs/toolkit";

interface SignUpPageState {
  error: string;
  loading: boolean;
  isLogged: boolean;
}

const initialState: SignUpPageState = {
  error: "",
  loading: false,
  isLogged: false,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUp: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.isLogged = true;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
