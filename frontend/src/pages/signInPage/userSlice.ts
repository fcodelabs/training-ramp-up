import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
    isFetching: false,
    message: '',
    error: '',
  },
  reducers: {
    userRegisterStart: (state, action) => {
      state.error = ''
      state.isFetching = true
    },
    userRegisterSuccess: (state, action) => {
      state.isFetching = false
      state.message = action.payload
      state.error = ''
    },
    userRegisterFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    userLoginStart: (state, action) => {
      state.isFetching = true
    },
    userLoginSuccess: (state, action) => {
      state.isFetching = false
      state.error = ''
      state.user = action.payload
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    userLoginFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    authLoginStart: (state) => {
      state.isFetching = true
    },
    authLoginSuccess: (state, action) => {
      state.isFetching = false
      state.error = ''
      state.user = action.payload
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    authLoginFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    userLogOutStart: (state, action) => {
      state.isFetching = false
      state.error = ''
      state.user = null
    },
    userLogOutSuccess: (state) => {
      state.isFetching = false
      state.error = ''
      state.user = null
      localStorage.clear()
     
    },
    userLogOutFailure: (state) => {
      state.isFetching = false
      state.error = ''
      state.user = null
    },
    refreshTokenSuccess: (state, action) => {
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    deleteMsg: (state) => {
      state.message = ''
    },
    deleteError: (state) => {
      state.error = ''
    },
  },
})

export const {
  userRegisterStart,
  userRegisterSuccess,
  userRegisterFailure,
  userLoginStart,
  userLoginSuccess,
  userLoginFailure,
  authLoginStart,
  authLoginSuccess,
  authLoginFailure,
  userLogOutStart,
  userLogOutSuccess,
  userLogOutFailure,
  refreshTokenSuccess,
  deleteError,
  deleteMsg,
} = userSlice.actions
export default userSlice.reducer
