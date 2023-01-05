/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice } from '@reduxjs/toolkit'
import { Navigate, useNavigate } from 'react-router-dom'

interface SignInPageState {
    username: string
    validLogIn: boolean
    signedOut:boolean
}

// Define the initial state using that type
const initialState: SignInPageState = {
    username: '',
    validLogIn: false,
    signedOut:false
}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        logIn: (state, action) => {},
        logInSuccess: (state, action) => {
            state.validLogIn = action.payload
         
        },
        signOut: (state) => {},
        signOutSuccess: (state) => {
            state.username = ''
            state.validLogIn = false
            state.signedOut = true
           
        },
    },
})

export const { logIn, logInSuccess, signOut, signOutSuccess } =
    signInSlice.actions

export default signInSlice.reducer
