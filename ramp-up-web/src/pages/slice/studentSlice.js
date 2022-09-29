import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },

  reducers: {
    addStudent(state, action) {
      state.student = action.payload;
    },

    createStudent() {},
    deleteStudent() {},
    updateStudent() {},
    getStudents(state, action) {},
  },
});

export default studentSlice;
