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
    updateStudent() {},
    getStudents() {},
  },
});

export default studentSlice;
