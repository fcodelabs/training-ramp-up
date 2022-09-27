import { createSlice } from "@reduxjs/toolkit";

const ToDotSlice = createSlice({
  name: "students",
  initialState: {
    name: "",
    gender: "",
    loading: false,
    address: "",
    mobileNumber: "",
    dataOfBirth: "",
    age: "",
  },
  reducers: {
    // eslint-disable-next-line no-unused-vars
    StudentAdd(state, action) {},

    // eslint-disable-next-line no-unused-vars
    loadStudent(state, action) {
      state.loading = true;
    },
    saveStudent(state, action) {
      state.todos = action.payload;
    },
  },
});

export default ToDotSlice;
