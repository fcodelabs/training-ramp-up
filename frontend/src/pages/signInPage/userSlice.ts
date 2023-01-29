import { User } from '../../models/interface'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'userData',
  initialState: {
    user: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    userRegisterStart: (state,action) => {
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
    },
    userLoginFailure: (state) => {
      state.isFetching = false
      state.error = true
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
} = userSlice.actions
export default userSlice.reducer
