/* eslint-disable @typescript-eslint/no-empty-function */

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../../utils/interfaces'

interface SignUpPageState {
    user: User
    error: string
    validSignUp:boolean
}

// Define the initial state using that type
const initialState: SignUpPageState = {
    user: {},
    error: '',
    validSignUp:false
}

export const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        addUser: (state, action) => {},
        addUserSuccess: (state, action) => {
            state.validSignUp = action.payload
        },
    },
})

export const { addUser, addUserSuccess } = signUpSlice.actions

export default signUpSlice.reducer
