/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [] as any,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    upsertStudentAction: () => {},
    getStudentsAction: () => {},
    setStudentsAction: (state, action) => {
      state.students = action.payload;
    },
    deleteStudentAction: () => {},
  },
});

export const {
  upsertStudentAction,
  getStudentsAction,
  setStudentsAction,
  deleteStudentAction,
} = homeSlice.actions;

export const selectStudent = (state: any) => state.studentReducer.students;

const studentReducer = homeSlice.reducer;
export default studentReducer;
