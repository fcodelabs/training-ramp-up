import { createSlice } from '@reduxjs/toolkit';

const initialState = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser:(state,action)=>{
      switch(action.payload.task){
        case "GET_USER":
          return action.payload.res;
        case "LOGIN_USER":
          return action.payload.res;
        case "LOGOUT_USER":
          return initialState;
        case "SIGNUP_USER":
          return action.payload.res;
        default:
          return initialState;
      }
    },
    checkUser(){},
    logOutUser(state,action){},
    signUpUser(state,action){},
    logInUser(state,action){}
  },
});

// Action creators are generated for each case reducer function
export const { setUser,logOutUser,signUpUser,logInUser,checkUser } = userSlice.actions;

export const userReducer =  userSlice.reducer;