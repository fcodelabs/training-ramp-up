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
    refreshAction: () => {},
  },
});

export const {
  registerUserAction,
  loginUserAction,
  saveUserAction,
  logoutUserAction,
  refreshAction,
} = userSlice.actions;

//selectors
export const selectUser = (state) => state.userReducer.user;

//reducers
const userReducer = userSlice.reducer;
export default userReducer;
