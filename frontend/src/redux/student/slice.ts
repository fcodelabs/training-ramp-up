import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";
// import { RootState } from "../../path-to-your-root-reducer";

interface IStudentState {
  userFetchingError: boolean;
  userAddingError: boolean;
  userUpdatingError: boolean;
  removeStudentError: boolean;
  isLoading: boolean;
  students: GridValidRowModel[];
}

const initialState: IStudentState = {
  userFetchingError: false,
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

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateStudent: (state, action: PayloadAction<GridValidRowModel[]>) => {
      console.log("action.payload", action.payload);
      state.isLoading = false;
      state.userAddingError = false;
      state.userUpdatingError = false;
      state.students = action.payload;
    },
    fetchAllStudentsStart: (state) => {
      console.log("fetchAllStudentsStart hello 1");
      state.isLoading = true;
      state.userFetchingError = false;
    },
    fetchAllStudentsSuccess: (
      state,
      action: PayloadAction<GridValidRowModel[]>
    ) => {
      console.log("fetchAllStudentsStart hello 2", action.payload);
      state.isLoading = false;
      state.students = action.payload;
    },
    fetchStudentsError: (state) => {
      state.isLoading = true;
      state.userFetchingError = true;
    },
    addStudentStart: (state) => {
      state.isLoading = true;
      state.userAddingError = false;
    },
    addStudentSuccess: (state, action: PayloadAction<GridValidRowModel>) => {
      state.isLoading = false;
      state.students = [...state.students, action.payload];
    },
    addStudentError: (state) => {
      state.isLoading = true;
      state.userAddingError = true;
    },
    removeStudentStart: (state) => {
      state.isLoading = true;
      state.removeStudentError = false;
    },
    removeStudentSuccess: (state, action: PayloadAction<GridRowId>) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
    removeStudentError: (state) => {
      state.isLoading = true;
      state.removeStudentError = true;
    },
    editStudentStart: (state) => {
      state.isLoading = true;
      state.userUpdatingError = false;
    },
    editStudentSuccess: (state, action: PayloadAction<GridValidRowModel>) => {
      state.isLoading = false;
      state.students = state.students.map((student) =>
        student.id === action.payload.id ? action.payload : student
      );
    },
    editStudentError: (state) => {
      state.isLoading = true;
      state.userUpdatingError = true;
    },
  },
});

export const {
  updateStudent,
  fetchAllStudentsStart,
  fetchAllStudentsSuccess,
  fetchStudentsError,
  addStudentStart,
  addStudentSuccess,
  addStudentError,
  removeStudentStart,
  removeStudentSuccess,
  removeStudentError,
  editStudentStart,
  editStudentSuccess,
  editStudentError,
} = studentSlice.actions;

export default studentSlice.reducer;
