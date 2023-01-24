/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from '../../../utils/interfaces'

interface HomePageState {
    students: Person[]
    error: string
}

// Define the initial state using that type
const initialState: HomePageState = {
    students: [],
    error: '',
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getStudents: (state) => {},
        setStudents: (state, action: PayloadAction<Array<Person>>) => {
            state.students = action.payload
        },
        getStudentsFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        addStudent: (state, action) => {},
        addStudentFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        updateStudent: (state, action) => {},
        updateStudentFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        deleteStudent: (state, action) => {},
        deleteStudentFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        
    },
})

// Action creators are generated for each case reducer function
export const {
    getStudents,
    setStudents,
    getStudentsFailed,
    addStudent,
    addStudentFailed,
    deleteStudent,
    deleteStudentFailed,
    updateStudent,
    updateStudentFailed,
} = homeSlice.actions

export default homeSlice.reducer
