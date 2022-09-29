import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    name: "",
    role: "",
  },
  reducers: {
    tokenList() {},
    saveToken(state, action) {
      console.log("payload", action.payload);
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.role = action.payload.role;
    },
  },
});

export default loginSlice;
