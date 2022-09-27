import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {
    saveUser(state, action) {
      state.students = action.payload;
    },

    getUsers() {},
  },
});

export default userSlice;
