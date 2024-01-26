import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GridValidRowModel } from "@mui/x-data-grid";

const SampleStudents = [
  {id:1, name:'A Amila', gender:'Male', address:'Walasmulla',mobileNumber:'0123456789', dateofbirth: new Date(2000,4,17), age:24},
  {id:2, name:'B Amila', gender:'Male', address:'Walasmulla',mobileNumber:'0123456789', dateofbirth: new Date(2000,4,17), age:24},
  {id:3, name:'C Amila', gender:'Male', address:'Walasmulla',mobileNumber:'0123456789', dateofbirth: new Date(2000,4,17), age:24},
  {id:4, name:'D Amila', gender:'Male', address:'Walasmulla',mobileNumber:'0123456789', dateofbirth: new Date(2000,4,17), age:24},
  {id:5, name:'E Amila', gender:'Male', address:'Walasmulla',mobileNumber:'0123456789', dateofbirth: new Date(2000,4,17), age:24}
] as GridValidRowModel[];

const studentsSlice = createSlice({
    name: 'students',
    initialState: SampleStudents as GridValidRowModel[],
    reducers: {
        addStudent: (state, action: PayloadAction<GridValidRowModel>) => {
            state.push(action.payload);
        },
        editStudent: (state, action: PayloadAction<GridValidRowModel>) => {
            const index = state.findIndex((student) => student.id === action.payload.id);
            if (index !== -1) {
              state[index] = action.payload;
            }
          },
        removeStudent: (state, action: PayloadAction<GridValidRowModel>) => {
            return state.filter((student) => student !== action.payload);
        },
        replaceStudents: (state, action: PayloadAction<GridValidRowModel[]>) => {
            return action.payload;
          },
    },
});

export const { addStudent, editStudent, removeStudent, replaceStudents } = studentsSlice.actions;
export default studentsSlice.reducer;
