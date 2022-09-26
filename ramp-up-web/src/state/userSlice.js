import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser(state, action) {},
  },
});

export const { logInUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
