import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { INewStudent } from "../sagas/studentSaga";

export interface IStudent {
  id: number;
  name: string;
  age: number;
  gender: string;
  address: string;
  mobile: string;
  dob: Date | null;
}

export interface IEditStudentPayload {
  student: INewStudent;
  id: number;
}

interface IStudentState {
  students: IStudent[];
}

const studentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
  } as IStudentState,
  reducers: {
    addStudent: (state, action) => {
        state.students.push(action.payload);
     
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(
        (student) => student.id !== action.payload,
      );
    },

    addStudentRequest: (state, action: PayloadAction<INewStudent>) => {},

    getStudentsRequest: (state) => {},

    storeStudents: (state, action: PayloadAction<IStudent[]>) => {
      state.students = action.payload;
    },

    editStudentRequest: (state, action: PayloadAction<IEditStudentPayload>) => {},

    deleteStudentRequest: (state, action: PayloadAction<number>) => {
      console.log(action.payload);
    },
  },
});

export const { addStudent, removeStudent, addStudentRequest, getStudentsRequest, storeStudents, editStudentRequest, deleteStudentRequest} = studentSlice.actions;
export const studentReducer = studentSlice.reducer;
