import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserInitialState} from "../../utils/types";


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
            signInUser_:(state, action:PayloadAction<UserInitialState>)=>{
                console.log('called me')
                state.signIn=action.payload.signIn;
            }

        }
    }
);

export const {
    changeFirstName,
    changeLastName,
    changeEmail,
    changeAdmin,
    signInUser_
} = userSlice.actions;
export default userSlice.reducer;

