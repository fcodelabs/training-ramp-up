import { createSlice } from '@reduxjs/toolkit';

interface IStudent{
    id: number;
    name: string;
    age: number;
    gender: string;
    address: string;
    mobile: string;
    dob: Date;
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
                gender: "female",
                address: "123 Main St", 
                mobile: "123-456-7890", 
                dob: new Date(),
                age: 20,   
            }
        ]
    } as IStudentState,
    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload);
        },
        removeStudent: (state, action) => {
            state.students = state.students.filter(student => student.id !== action.payload);
        }
    }
});

export const { addStudent, removeStudent } = studentSlice.actions;
export const studentReducer = studentSlice.reducer;