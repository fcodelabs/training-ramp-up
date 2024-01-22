import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  loading: boolean;
  error: string | null;
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    getAllStudentsSuccess: (state, action: PayloadAction<IStudent[]>) => {
      state.students = action.payload;
      state.loading = false;
      state.error = null;
    },
    getAllStudentsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addStudentSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Optionally, you can update the state with the newly added student if needed. need to change the saga !!!!! important
    },
    addStudentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    editStudentSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Optionally, you can update the state with the edited student if needed.
    },
    editStudentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteStudentSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Optionally, you can update the state by removing the deleted student if needed.
    },
    deleteStudentFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    // addStudent: (state, action) => {
    //   state.students.push(action.payload);
    // },
    // removeStudent: (state, action) => {
    //   state.students = state.students.filter(
    //     (student) => student.id !== action.payload
    //   );
    // },
  },
});

// export const { addStudent, removeStudent } = studentSlice.actions;
// export const studentReducer = studentSlice.reducer;

export const {
  setLoading,
  getAllStudentsSuccess,
  getAllStudentsFailure,
  addStudentSuccess,
  addStudentFailure,
  editStudentSuccess,
  editStudentFailure,
  deleteStudentSuccess,
  deleteStudentFailure,
} = studentSlice.actions;

export default studentSlice.reducer;
