import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAdd: false,
  error: ''
}

export const UserSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.data
      localStorage.setItem('email', action.payload.data.email)
      state.accessToken = action.payload.headers.accesskey
      localStorage.setItem('accessToken', action.payload.headers.accesskey)
      state.refreshToken = action.payload.headers.accesskey
      localStorage.setItem('refreshToken', action.payload.headers.refreshkey)
    },
    getUser: (state, action) => {},
    addUser: (state, action) => {},
    unSetUser: (state) => {
      state.user = []
      localStorage.removeItem('email')
      state.accessToken = null
      localStorage.removeItem('accessToken')
      state.refreshToken = null
      localStorage.removeItem('refreshToken')
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setAddStatus: (state, action) => {
      state.isAdd = action.payload
    },
    refreshUser: (state) => {},
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      localStorage.setItem('accessToken', action.payload)
    }
  }
})

export const {
  setUser,
  getUser,
  addUser,
  unSetUser,
  setError,
  setAddStatus,
  refreshUser,
  setAccessToken
} = UserSlice.actions

export default UserSlice.reducer
