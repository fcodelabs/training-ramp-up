import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    student: [],
  },
  reducers: {
    addStudentAction: () => {},

    getStudentAction: () => {},
    saveStudentAction: (state, action) => {
      state.student = action.payload;
    },
    updateStudentAction: () => {},
    deleteStudentAction: () => {},
  },
});

export const {
  addStudentAction,
  getStudentAction,
  saveStudentAction,
  updateStudentAction,
  deleteStudentAction,
} = studentSlice.actions;

//selectors
export const selectStudent = (state) => state.studentReducer.student;

//reducers
const studentReducer = studentSlice.reducer;
export default studentReducer;
