import { createSlice } from "@reduxjs/toolkit";
import { User } from "../components/interface";

interface HomePageState {
  students: User[];
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
    setStudents: (state, action) => {
      state.students = action.payload;
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
      state.isLoading = true;
    },
    addStudentSuccess: (state, action) => {
      state.isLoading = false;
      state.students = [...state.students, action.payload];
    },
    addStudentFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setStudents,
  getStudents,
  getStudentsSuccess,
  getStudentsFailure,
  addStudent,
  addStudentSuccess,
  addStudentFailure,
} = homeSlice.actions;

export default homeSlice.reducer;
