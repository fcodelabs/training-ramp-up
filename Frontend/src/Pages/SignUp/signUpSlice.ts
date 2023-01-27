import { createSlice } from "@reduxjs/toolkit";

interface SignUpPageState {
  error: string;
  loading: boolean;
  isLogged: boolean;
  email: string;
  role: string;
}

const initialState: SignUpPageState = {
  error: "",
  loading: false,
  isLogged: false,
  email: "",
  role: "",
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUp: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.isLogged = true;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
