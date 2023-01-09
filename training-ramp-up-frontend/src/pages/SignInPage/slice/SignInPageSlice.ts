/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../utils/interfaces'

interface SignInPageState {
    user: User
    
}

// Define the initial state using that type
const initialState: SignInPageState = {
    user:{}

}

export const signInSlice = createSlice({
    name: 'signIn',
    initialState,
    reducers: {
        logIn: (state,action) => {},
        logInSuccess: (state, action) => {
            state.user=action.payload.singedUser 
        },
        signOut: (state,action) => {},
        signOutSuccess: (state) => {
            state.user={}    
        },
    },
})

export const { logIn, logInSuccess, signOut, signOutSuccess } =
    signInSlice.actions

export default signInSlice.reducer
