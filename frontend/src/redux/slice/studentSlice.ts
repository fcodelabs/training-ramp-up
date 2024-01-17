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
      name: "Emily",
      gender: "Female",
      address: "Colombo",
      mobileno: "0771234567",
      dateofbirth: new Date(2003, 5, 21),
      age: ageCalculator(new Date(2003, 5, 21)),
    },
    {
      id: 3,
      name: "David",
      gender: "Male",
      address: "Kandy",
      mobileno: "0754321987",
      dateofbirth: new Date(2001, 8, 17),
      age: ageCalculator(new Date(2001, 8, 17)),
    },
    {
      id: 4,
      name: "Olivia",
      gender: "Female",
      address: "Galle",
      mobileno: "0789654321",
      dateofbirth: new Date(2004, 2, 9),
      age: ageCalculator(new Date(2004, 2, 9)),
    },
    {
      id: 5,
      name: "Noah",
      gender: "Male",
      address: "Jaffna",
      mobileno: "0765432109",
      dateofbirth: new Date(2002, 10, 30),
      age: ageCalculator(new Date(2002, 10, 30)),
    },
    {
      id: 6,
      name: "Amelia",
      gender: "Female",
      address: "Nuwara Eliya",
      mobileno: "0723456789",
      dateofbirth: new Date(2005, 7, 15),
      age: ageCalculator(new Date(2005, 7, 15)),
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
