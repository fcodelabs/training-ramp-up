/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { Student } from "../../utils/interface";

interface HomePageState {
  students: Student[];
  error: string;
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: HomePageState = {
  students: [],
  error: "",
  isLoading: false,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getStudents: (state) => {
      state.isLoading = true;
    },
    getStudentsSuccess: (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    },
    getStudentsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addStudent: (state, action) => {
      return state;
    },
    addStudentSuccess: (state, action) => {
      state.students = [...state.students, action.payload];
    },
    addStudentFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteStudent: (state, action) => {
      return state;
    },
    deleteStudentSuccess: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    deleteStudentFailure: (state, action) => {
      state.error = action.payload;
    },
    updateStudent: (state, action) => {
      return state;
    },
    updateStudentSuccess: (state, action) => {
      state.students = state.students.map((student) => {
        if (student.id === action.payload.id) {
          return {
            ...action.payload,
            inEdit: false,
          };
        }
        return student;
      });
    },
    updateStudentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  addStudent,
  addStudentSuccess,
  addStudentFailure,
  deleteStudent,
  deleteStudentSuccess,
  deleteStudentFailure,
  updateStudent,
  updateStudentSuccess,
  updateStudentFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
