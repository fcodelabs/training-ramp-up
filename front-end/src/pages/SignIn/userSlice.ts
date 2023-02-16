import { createSlice } from '@reduxjs/toolkit'

interface userState {
  isSignInLoading: boolean
  isSignUpLoading: boolean
  isSignOutLoading: boolean
  accessToken: string | null
  signedIn: boolean
  signedUp: boolean
  error: string
  role: string | null
}

const initialState: userState = {
  isSignInLoading: false,
  isSignUpLoading: false,
  isSignOutLoading: false,
  accessToken: null,
  signedIn: false,
  signedUp: false,
  error: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUpUser: (state, action) => {
      state.signedUp = false
      state.isSignUpLoading = true
    },
    signUpUserSuccess: (state) => {
      state.isSignUpLoading = false
      state.signedUp = true
    },
    signUpUserFailure: (state, action) => {
      state.isSignUpLoading = false
      state.error = action.payload
    },
    signInUser: (state, action) => {
      state.isSignInLoading = true
    },
    signInUserSuccess: (state, action) => {
      state.isSignInLoading = false
      state.signedIn = true
      state.accessToken = action.payload
    },
    signInUserFailure: (state, action) => {
      state.isSignInLoading = false
      state.error = action.payload
    },
  },
})

export const { signUpUser, signUpUserSuccess, signUpUserFailure } = userSlice.actions

export default userSlice.reducer
