/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice } from '@reduxjs/toolkit'

interface SignInPageState {
    username: string
    password: string
    validLogIn: boolean
}

// Define the initial state using that type
const initialState: SignInPageState = {
    username: '',
    password: '',
    validLogIn: false,
}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        logIn: (state, action) => {},
        logInSuccess: (state,action) => {
            state.validLogIn = action.payload
        },
    },
})

export const { logIn ,logInSuccess} = signInSlice.actions

export default signInSlice.reducer
