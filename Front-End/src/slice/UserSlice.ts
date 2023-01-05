/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
  },
  reducers: {
    registerUserAction: () => {},
    loginUserAction: () => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
    logoutUserAction: () => {},
  },
});

export const {
  registerUserAction,
  loginUserAction,
  saveUserAction,
  logoutUserAction,
} = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

const userReducer = userSlice.reducer;

export default userReducer;
