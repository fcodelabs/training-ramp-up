/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Person } from '../../utils/interfaces'

interface HomePageState {
    students: Person[],
    error:string
}

// Define the initial state using that type
const initialState: HomePageState = {
    students:[],
    error:''
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        getStudents: () => {},
        setStudents: (state, action: PayloadAction<Array<Person>>) => {
            state.students = action.payload          
        },
        getStudentsFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        addStudent: (state,action) => {},
        addStudentSuccess:(state, action: PayloadAction<Person>) => {
            state.students.shift()
            state.students.unshift(action.payload)
        },
        addStudentFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        updateStudent:(state,action)=>{},
        deleteStudent:(state,action)=>{},
        //deleteSuccess:
    },
})

// Action creators are generated for each case reducer function
export const {
    
    getStudents,
    setStudents,
    getStudentsFailed,
    addStudent,
    addStudentSuccess,
    addStudentFailed,
    deleteStudent,
    updateStudent
} = homeSlice.actions

export default homeSlice.reducer
