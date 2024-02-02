import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyRows } from "../../utilities";
type initialDataType = {
  isLoading: boolean;
  rows: GridValidRowModel[];
};

export const initialState: initialDataType = {
  isLoading: false,
  rows: [...emptyRows],
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    fetchStudents: (state) => {
      //middleware
    },
    addStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      //middleware
    },
    setStudents: (state, action: PayloadAction<GridValidRowModel[]>) => {
      state.rows = action.payload;
      state.isLoading = false;
    },
    fetchStudentsFailure: (state) => {
      state.isLoading = true;
      state.rows = [...emptyRows];
    },
    discardStudent: (state, action: PayloadAction<any>) => {
      state.rows = state.rows.filter((student) => student.id !== action.payload.id);
    },
    updateStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      state.rows = state.rows.map((student) =>
        student.id === action.payload.id ? { ...student, ...action.payload } : student
      );
    },
    setStudentError: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.map((student) =>
        student.id === action.payload ? { ...student, error: true } : student
      );
    },
  },
});

export const {
  fetchStudents,
  setStudents,
  fetchStudentsFailure,
  addStudent,
  discardStudent,
  updateStudent,
  setStudentError,
} = studentSlice.actions;

export default studentSlice.reducer;
