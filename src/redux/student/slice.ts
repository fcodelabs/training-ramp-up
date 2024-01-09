import { createSlice } from '@reduxjs/toolkit';
import generateId from '../../utility/generateId';

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
    name: 'student',
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
            { id: generateId(), name: 'Lannister', age: 42, gender: 'Male', address: 'Delhi', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
            { id: generateId(), name: 'Snow', age: 35, gender: 'Male', address: 'Kolkata', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
            { id: generateId(), name: 'Lannister', age: 42, gender: 'Male', address: 'Punjab', mobile: '1234567890', dob: 'Sun Dec 03 2000' , isNew: false},
            { id: generateId(), name: 'Sersi', age: 45, gender: 'Female', address: 'Goa', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
            { id: generateId(), name: 'Stark', age: 16, gender: 'Male', address: 'Maduray', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
            { id: generateId(), name: 'Daenerys', age: 20, gender: 'Female', address: 'Gujaraat', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
            { id: generateId(), name: 'Melisandre', age: 150, gender: 'Female', address: 'Chennai', mobile: '1234567890', dob: 'Sun Dec 03 2000', isNew: false },
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