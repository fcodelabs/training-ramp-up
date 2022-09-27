import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: [],
  },
  reducers: {
    addUser() {},
    logUser() {},
  },
});

export default userSlice;
