import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser(state, action) {},
    registerUser(state, action) {},
  },
});

export default userSlice;
