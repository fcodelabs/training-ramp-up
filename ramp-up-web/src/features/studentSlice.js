import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    loading: false,
    students: [],
  },
  reducers: {
    saveStudents(state, action) {
      state.students = action.payload;
    },
    createStudent() {},
    deleteStudent() {},
    updateStudent(state, action) {
      console.log("Action", action);
    },
    getStudents() {},
  },
});

export default studentSlice;
