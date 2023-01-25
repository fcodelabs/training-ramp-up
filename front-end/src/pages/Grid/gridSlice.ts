import { createSlice } from '@reduxjs/toolkit';
import { Student } from '../../utils/interfaces';

const students: Student[] = [];

const gridSlice = createSlice({
    name: 'grid',
    initialState: {
        students: students,
        isLoading: false,
        error: false
    },
    reducers: {
        getStudents: (state) => {
            state.isLoading = true;
        },

        getStudentsSuccess: (state, action) => {
            state.isLoading = false;
            state.students = action.payload;
            state.error = false;
        },

        getStudentsFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },

        addStudent: (state, action) => {
            return state;
        },

        addStudentSuccess: (state, action) => {
            state.isLoading = false;
            state.students = [...state.students, action.payload];
            state.error = false;
        },

        addStudentFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },

        updateStudent: (state, action) => {
            return state;

        },

        updateStudentSuccess: (state, action) => {
            state.isLoading = false;
            state.students = state.students.map(student => {
                if (student.id === action.payload.id) {
                    return action.payload;
                } else {
                    return student;
                }
            });
            state.error = false;
        },

        updateStudentFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        },

        deleteStudent: (state, action) => {
            return state;
        },

        deleteStudentSuccess: (state, action) => {
            state.isLoading = false;
            state.students = state.students.filter(student => student.id !== action.payload);
            state.error = false;
        },

        deleteStudentFailure: (state) => {
            state.isLoading = false;
            state.error = true;
        }

    }
});

export const { getStudents, getStudentsSuccess, getStudentsFailure, addStudent, addStudentSuccess, addStudentFailure, updateStudent, updateStudentSuccess, updateStudentFailure, deleteStudent, deleteStudentSuccess, deleteStudentFailure } = gridSlice.actions;
export default gridSlice.reducer;