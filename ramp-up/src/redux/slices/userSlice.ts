import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  role: string;
}

export interface IUserStates{
  user: IUser | null;
  isAuthorized : boolean;
  authError: Error | null;
}

interface IUserState {
  user: IUser | null;
  userState : IUserStates;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userState: {
            user: null,
            isAuthorized: false,
            authError: null
        },
    } as IUserState,
    reducers: {
        addUserRequest: (state, action: PayloadAction<IUser>) => {},

        addUserPasswordRequest: (state, action: PayloadAction<{token: string, password: string}>) => {},

        loginRequest: (state, action: PayloadAction<{email: string, password: string}>) => {},

        loginSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },

        selfRegisterRequest: (state, action: PayloadAction<{name: string, email: string, password: string}>) => {},

        logoutRequest: (state) => {},

        authCheckRequest: (state) => {},

        authCheckSuccess: (state, action: PayloadAction<IUser>) => {
            state.userState.user = action.payload;
            state.userState.isAuthorized = true;
            state.userState.authError = null;
        },
        
        authCheckFailure : (state, action: PayloadAction<Error>) => {
            state.userState.user = null;
            state.userState.isAuthorized = false;
            state.userState.authError = action.payload;
        }
    }
})

export const { addUserRequest, 
               addUserPasswordRequest, 
               loginRequest, 
               selfRegisterRequest, 
               loginSuccess, 
               logoutRequest, 
               authCheckRequest,
               authCheckSuccess,
               authCheckFailure
              } = userSlice.actions;
export const userReducer = userSlice.reducer;

