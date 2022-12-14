/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Student } from "../../utils/Interfaces/Student";

type HomeState = {
  students: Student[];
};

const initialState: HomeState = {
  students: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addStudentAction: () => {},
    getStudentsAction: () => {},
    setStudentsAction: (state, action: PayloadAction<Array<Student>>) => {
      state.students = action.payload;
    },
    updateStudentAction: () => {},
    deleteStudentAction: () => {},
  },
});

export const {
  addStudentAction,
  updateStudentAction,
  getStudentsAction,
  setStudentsAction,
  deleteStudentAction,
} = homeSlice.actions;

export const selectStudent = (state: any) => state.student.students;

const studentReducer = homeSlice.reducer;
export default studentReducer;
