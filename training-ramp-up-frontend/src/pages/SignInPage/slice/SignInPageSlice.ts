/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice } from '@reduxjs/toolkit'

interface SignInPageState {
    username: string
    validLogIn: boolean
}

// Define the initial state using that type
const initialState: SignInPageState = {
    username: '',
    validLogIn: false,
}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        logIn: (state, action) => {},
        logInSuccess: (state, action) => {
            state.validLogIn = action.payload.auth
            
        },
        signOut: (state) => {},
        signOutSuccess: (state) => {
            state.username = ''
            state.validLogIn = false
        },
    },
})

export const { logIn, logInSuccess ,signOut,signOutSuccess} = signInSlice.actions

export default signInSlice.reducer
