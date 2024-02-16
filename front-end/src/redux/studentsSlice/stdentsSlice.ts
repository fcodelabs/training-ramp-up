import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GridRowId, GridValidRowModel } from "@mui/x-data-grid";

const SampleStudents = [] as GridValidRowModel[];

const studentsSlice = createSlice({
  name: "students",
  initialState: SampleStudents,
  reducers: {
    replaceStudents: (state, action: PayloadAction<GridValidRowModel[]>) => {
      return action.payload;
    },
    fetchStudents: (state) => {
      // fetch students
    },
    addStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      // add student
    },
    editStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      // edit student
    },
    removeStudent: (state, action: PayloadAction<GridRowId>) => {
      // remove student
    },
  },
});

export const {
  addStudent,
  editStudent,
  removeStudent,
  replaceStudents,
  fetchStudents,
} = studentsSlice.actions;
export default studentsSlice.reducer;
