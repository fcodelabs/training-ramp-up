import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
    accessToken: "",
  },
  reducers: {
    saveUser(state, action) {
      state.users = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    addUser() {},
    logUser() {},
  },
});

export default userSlice;