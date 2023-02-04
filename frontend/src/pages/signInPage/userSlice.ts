import { User } from '../../models/interface'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
    accessToken: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    userRegisterStart: (state, action) => {
      state.error = false
      state.isFetching = true
    },
    userRegisterSuccess: (state, action) => {
      state.isFetching = false
      state.error = false
    },
    userRegisterFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    userLoginStart: (state, action) => {
      state.isFetching = true
    },
    userLoginSuccess: (state, action) => {
      state.isFetching = false
      state.error = false
      state.user = action.payload
      state.accessToken = action.payload.accessToken
      localStorage.setItem('accessToken', action.payload.accessToken)
    },
    userLoginFailure: (state) => {
      state.isFetching = false
      state.error = true
    },
    userLogOutStart: (state, action) => {
      state.isFetching = false
      state.error = false
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
      state.error = false
      state.user = null
    },
    userLogOutFailure: (state) => {
      state.isFetching = false
      state.error = false
      state.user = null
    },
    refreshTokenSuccess: (state, action) => {
      state.accessToken = action.payload
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
} = userSlice.actions
export default userSlice.reducer
