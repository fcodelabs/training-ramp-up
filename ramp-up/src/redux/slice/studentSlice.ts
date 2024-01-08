import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface studentState {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileno: string;
  dateofbirth: Date;
  age: number;
}

interface InitialState {
  students: GridValidRowModel[];
}

const initialState: InitialState = {
  students: [
    {
      id: 1,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "071-466-8617",
      dateofbirth: new Date(1998, 11, 4),
      age: 23,
    },
    {
      id: 2,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "071-466-8617",
      dateofbirth: new Date(1999, 11, 4),
      age: 23,
    },
    {
      id: 3,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "071-466-8617",
      dateofbirth: new Date(2004, 11, 4),
      age: 23,
    },
    {
      id: 4,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "071-466-8617",
      dateofbirth: new Date(1999, 11, 4),
      age: 23,
    },
  ],
};

export const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    updateStudent: (state, action: PayloadAction<GridValidRowModel[]>) => {
      state.students = action.payload;
    },
    addTempStudent: (state, action: PayloadAction<GridValidRowModel>) => {
      state.students.push(action.payload);
    },
  },
});

export const { updateStudent, addTempStudent } = studentSlice.actions;

export default studentSlice.reducer;
