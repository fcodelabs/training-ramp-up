import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ageCalculator } from "../../utility/ageCalculator";

interface IinitialState {
  isLoading: boolean;
  students: GridValidRowModel[];
}

const initialState: IinitialState = {
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
    },
    fetchStudentsError: (state) => {
      state.isLoading = true;
      console.log("error found");
    },
    fetchAllStudents: (state) => {
      //get all students
    },
    addStudent: (state) => {
      //add a new student to the database
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
  removeStudent,
  editStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
