import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
    accessToken: null,
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
      state.accessToken = action.payload.accessToken
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    userLoginFailure: (state, action) => {
      state.isFetching = false
      state.error = action.payload
    },
    userLogOutStart: (state, action) => {
      state.isFetching = false
      state.error = ''
      state.user = null
      localStorage.clear()
      document.cookie.split(';').forEach(function (c) {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
      })
    },
    userLogOutSuccess: (state) => {
      state.isFetching = false
      state.error = ''
      state.user = null
    },
    userLogOutFailure: (state) => {
      state.isFetching = false
      state.error = ''
      state.user = null
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload
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
  userLogOutStart,
  userLogOutSuccess,
  userLogOutFailure,
  refreshTokenSuccess,
  deleteError,
  deleteMsg,
} = userSlice.actions
export default userSlice.reducer
