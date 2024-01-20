import { createSlice } from "@reduxjs/toolkit";
import generateId from "../../utility/generateId";

interface IStudent {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mobile: string;
  dob: Date;
  isNew?: boolean;
}

interface IStudentState {
  students: IStudent[];
}

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [
      {
        id: generateId(),
        name: "jon",
        gender: "male",
        address: "Mumbai",
        mobile: "1234567890",
        dob: new Date(),
        age: 20,
      },
      {
        id: generateId(),
        name: "Lannister",
        age: 42,
        gender: "Male",
        address: "Delhi",
        mobile: "1234567890",
        dob: new Date(),
        isNew: false,
      },
    ],
  } as IStudentState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload
      );
    },
  },
});

export const { addStudent, removeStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
