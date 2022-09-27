import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    name: "",
    // token: {
    //   token: "",
    //   name: "",
    // },
  },
  reducers: {
    tokenList(state, action) {},
    saveToken(state, action) {
      console.log("payload", action.payload);
      state.token = action.payload.token;
      state.name = action.payload.name;
      console.log("SliceToken", state.token);
      console.log("SliceName", state.name);
    },
  },
});

export default loginSlice;
