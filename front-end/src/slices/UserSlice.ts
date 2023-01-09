/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // user: JSON.parse(localStorage.getItem('user') ?? ''),
  email: localStorage.getItem('email') ?? '',
  role: localStorage.getItem('role') ?? '',
  loggedin: localStorage.getItem('loggedin') ?? 'false',
  isAdd: false,
  error: ''
}

export const UserSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email
      localStorage.setItem('email', action.payload.email)
      state.role = action.payload.role
      localStorage.setItem('role', action.payload.role)
      state.loggedin = 'true'
      localStorage.setItem('loggedin', 'true')
    },
    getUser: (state, action) => {},
    addUser: (state, action) => {},
    logoutUser: (state, action) => {},
    unSetUser: (state) => {
      state.email = ''
      localStorage.removeItem('email')
      state.role = ''
      localStorage.removeItem('role')
      state.loggedin = 'false'
      localStorage.removeItem('loggedin')
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setAddStatus: (state, action) => {
      state.isAdd = action.payload
    }
    // refreshUser: (state) => {}
  }
})

export const {
  setUser,
  getUser,
  addUser,
  unSetUser,
  setError,
  setAddStatus,
  // refreshUser,
  logoutUser
} = UserSlice.actions

export default UserSlice.reducer
