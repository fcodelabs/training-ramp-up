import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
  userAddingError: boolean;
  isLoading: boolean;
  students: GridValidRowModel[];
}

const initialState: IinitialState = {
  userAddingError: false,
  isLoading: false,
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
      state.students = action.payload;
      state.isLoading = false;
      state.userAddingError = false;
    },
    fetchAllStudents: (state) => {
      //get all students
    },
    fetchStudentsError: (state) => {
      state.isLoading = true;
    },
    addStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      //add a new student to the database
    },
    addStudentError: (state) => {
      state.userAddingError = true;
      state.isLoading = true;
    },
    removeStudent: (state) => {
      //remove a student from the db
    },
    editStudent: (state) => {
      //edit a student in the db
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
  editStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
