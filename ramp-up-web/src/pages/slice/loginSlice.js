import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: "",
    name: "",
    role: "",
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
      state.role = action.payload.role;
      //console.log("SliceToken", state.token);
      //console.log("SliceName", state.role);
    },
  },
});

export default loginSlice;
