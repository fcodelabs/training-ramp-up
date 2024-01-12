import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ageCalculator } from "../../utility/ageCalculator";

interface IinitialState {
  students: GridValidRowModel[];
}

const initialState: IinitialState = {
  students: [
    {
      id: 1,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "0714668617",
      dateofbirth: new Date(1998, 11, 4),
      age: ageCalculator(new Date(1998, 11, 4)),
    },
    {
      id: 2,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "0714668617",
      dateofbirth: new Date(1999, 11, 4),
      age: ageCalculator(new Date(1999, 11, 4)),
    },
    {
      id: 3,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "0714668617",
      dateofbirth: new Date(2004, 11, 4),
      age: ageCalculator(new Date(2004, 11, 4)),
    },
    {
      id: 4,
      name: "Snow",
      gender: "Male",
      address: "Matara",
      mobileno: "0714668617",
      dateofbirth: new Date(1999, 11, 4),
      age: ageCalculator(new Date(1999, 11, 4)),
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
