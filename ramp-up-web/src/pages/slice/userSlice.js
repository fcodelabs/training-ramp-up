import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInUser(state, action) {
      console.log("Action", action);
      return action.payload;
    },
    registerUser(state, action) {
      console.log("User Register", action);
      return action.payload.user;
    },
  },
});

export default userSlice;
// export const { logInUser } = userSlice.actions;

// export const userReducer = userSlice.reducer;
