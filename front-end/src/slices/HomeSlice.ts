import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  students: [],
  error: ''
}

export const HomeSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setAllStudents: (state, action) => {
      state.students = action.payload
    },
    getAllStudents: (state) => {},
    addStudent: (state, action) => {},
    editStudent: (state, action) => {},
    removeStudent: (state, action) => {},
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setAllStudents,
  getAllStudents,
  addStudent,
  editStudent,
  removeStudent,
  setError
} = HomeSlice.actions

export default HomeSlice.reducer
