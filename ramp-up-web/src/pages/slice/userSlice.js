import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser(state, action) {
      console.log("Action", action);
    },
    registerUser(state, action) {
      console.log("User Register", action);
    },
  },
});

export default userSlice;
// export const { logInUser } = userSlice.actions;

// export const userReducer = userSlice.reducer;
