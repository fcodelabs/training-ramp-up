import { createSlice } from "@reduxjs/toolkit";
import generateId from "../../utility/generateId";
import calculateAge from "../../utility/calculateAge";
import dayjs from "dayjs";

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
        gender: "Male",
        address: "Mumbai",
        mobile: "0711397391",
        dob: new Date("2000-07-08"),
        age: calculateAge(new Date("2000-07-08")),
      },
      {
        id: generateId(),
        name: "Lannister",
        age: calculateAge(new Date("1998-04-23")),
        gender: "Female",
        address: "Delhi",
        mobile: "0703864608",
        dob: new Date("1998-04-23"),
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
