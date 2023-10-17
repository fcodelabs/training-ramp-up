import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Student {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dateOfBirth: Date;
  age: number;
}

const initialState: Student[] = [
  {
    id: 1,
    name: "John",
    gender: "male",
    address: "Homagama",
    mobileNo: "011258989",
    dateOfBirth: new Date(),
    age: 25,
  },
];

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<Student>) => {
      state.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<Student>) => {
      const studentIndex = state.findIndex(
        (student) => student.id === action.payload.id
      );
      if (studentIndex !== -1) {
        state[studentIndex] = action.payload;
      }
    },
    deleteStudent: (state, action: PayloadAction<number>) => {
      return state.filter((student) => student.id !== action.payload);
    },
  },
});

export const { addStudent, updateStudent, deleteStudent } =
  studentsSlice.actions;
export default studentsSlice.reducer;
