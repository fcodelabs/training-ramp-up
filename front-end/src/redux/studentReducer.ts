import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobileNo: string;
  dateOfBirth: string;
  age: number;
}

const initialState: Student[] = [];
const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    fetchStudents: (state) => {
      return state;
    },
    fetchStudentsSuccess: (state, action: PayloadAction<Student[]>) => {
      action.payload.forEach((student) => {
        state.push(student);
      });
    },
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

//Actions
export const {
  fetchStudents,
  fetchStudentsSuccess,
  addStudent,
  updateStudent,
  deleteStudent,
} = studentsSlice.actions;

//Selectors
export const selectStudents = (state: { studentReducer: Student[] }) =>
  state.studentReducer;

//Reducer
const studentReducer = studentsSlice.reducer;
export default studentReducer;
