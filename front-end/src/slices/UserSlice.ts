import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  userName: '',
  email: '',
  role: '',
  error: ''
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id
      state.userName = action.payload.userName
      state.email = action.payload.email
      state.role = action.payload.role
    },
    getUser: (state, action) => {},
    addUser: (state, action) => {},
    unSetUser: (state) => {
      state.id = null
      state.userName = ''
      state.email = ''
      state.role = ''
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {
  setUser,
  getUser,
  addUser,
  unSetUser,
  setError
} = UserSlice.actions

export default UserSlice.reducer
