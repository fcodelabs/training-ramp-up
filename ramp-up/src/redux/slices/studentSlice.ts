import { createSlice } from '@reduxjs/toolkit';


interface IStudent{
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    mobile: string;
    dob: Date | null;
}

interface IStudentState{
    students: IStudent[];
}

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        students: [
            {
                id: 1,
                name: "wathmi",
                gender: "Female",
                address: "123 Main St", 
                mobile: "123-456-7890", 
                dob: new Date("2000/09/20"),
                age: 23, 
               
            }
        ]
    } as IStudentState,
    reducers: {
        addStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload.id);
            action.payload.dob = new Date(action.payload.dob);
            const index = state.students.findIndex(student => student.id > action.payload.id);
  
            if (index === -1) {
              state.students.push(action.payload);
            } else {
              state.students.splice(index, 0, action.payload);
            }
        },
        removeStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
        }
    }
});

export const { addStudent, removeStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;