import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User, UserCredetial, UserInitialState} from "../../utils/types";


const initialState:UserInitialState={
    firstName:'',
    lastName:'',
    email:'',
    admin:false,
    signIn:false,
};

export const userSlice = createSlice(
    {
        name: "userData",
        initialState,
        reducers: {
            changeFirstName: (state, action: PayloadAction<string>) => {
                state.firstName = action.payload;
            },
            changeLastName: (state, action: PayloadAction<string>) => {
                state.lastName = action.payload;
            },changeEmail: (state, action: PayloadAction<string>) => {
                state.email = action.payload;
            },
            changeAdmin:(state,action:PayloadAction<boolean>)=>{
                state.admin = action.payload;
            },
            changeSignInUser:(state,action:PayloadAction<boolean>)=>{
                state.signIn = false;
            },
            signInUser:(state, action:PayloadAction<UserCredetial>)=>{
                state.signIn=true;
            },
            signUpUser:(state,action:PayloadAction<User>)=>{
                state.signIn = true;
            },
            signOutUser:(state)=>{
                state.signIn=false;
            }

        }
    }
);

export const {
    changeFirstName,
    changeLastName,
    changeEmail,
    changeAdmin,
    changeSignInUser,
    signInUser,
    signUpUser,
    signOutUser
} = userSlice.actions;
export default userSlice.reducer;

