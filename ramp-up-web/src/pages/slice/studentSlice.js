import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },

  reducers: {
    addStudent(state, action) {
      //console.log("AddstudentPayload", action.payload);
      state.student = action.payload;

      //console.log("studentADDSLICE", state.student);
    },

    createStudent() {},
    deleteStudent() {},
    updateStudent() {},
    getStudents(state, action) {
      //console.log("GetStudent");
    },
  },
});

export default studentSlice;
