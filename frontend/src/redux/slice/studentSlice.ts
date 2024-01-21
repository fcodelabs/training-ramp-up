import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  userAddingError: boolean;
  userUpdatingError: boolean;
  removeStudentError: boolean;
  isLoading: boolean;
  students: GridValidRowModel[];
}

const initialState: IinitialState = {
  userAddingError: false,
  userUpdatingError: false,
  removeStudentError: false,
  isLoading: true,
  students: [
    {
      id: 1,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
    {
      id: 2,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
    {
      id: 3,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
    {
      id: 4,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
    {
      id: 5,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
    {
      id: 6,
      name: "",
      gender: "",
      address: "",
      mobileno: "",
      dateofbirth: "",
      age: "",
    },
  ],
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateStudent: (state, action: PayloadAction<GridValidRowModel[]>) => {
      state.isLoading = false;
      state.userAddingError = false;
      state.userUpdatingError = false;
      state.students = action.payload;
    },
    fetchAllStudents: (state) => {
      //get all students
    },
    fetchStudentsError: (state) => {
      state.isLoading = false;
    },
    addStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      //add a new student to the database
    },
    addStudentError: (state) => {
      state.userAddingError = true;
      state.isLoading = true;
    },
    removeStudent: (state, action: PayloadAction<GridRowId>) => {
      //remove a student from the db
    },
    removeStudentError: (state) => {
      state.removeStudentError = true;
      state.isLoading = true;
    },
    editStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      //edit a student in the db
    },
    updateStudentError: (state) => {
      state.isLoading = true;
      state.userUpdatingError = true;
    },
  },
});

export const {
  updateStudent,
  fetchAllStudents,
  fetchStudentsError,
  addStudent,
  addStudentError,
  removeStudent,
  removeStudentError,
  editStudent,
  updateStudentError,
} = studentSlice.actions;

export default studentSlice.reducer;
