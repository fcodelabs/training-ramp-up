import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },

  reducers: {
    addStudent(state, action) {
      console.log("payload", action.payload);
      state.student = action.payload;

      console.log("SliceToken", state.name);
    },

    deleteStudent() {},
    updateStudent() {},
    getStudents(state, action) {},
  },
});

export default studentSlice;
