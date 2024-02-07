import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  role: string;
}

interface IUserState {
  user: IUser | null;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    } as IUserState,
    reducers: {
        addUserRequest: (state, action: PayloadAction<IUser>) => {},

        addUserPasswordRequest: (state, action: PayloadAction<{token: string, password: string}>) => {},

        loginRequest: (state, action: PayloadAction<{email: string, password: string}>) => {},

        loginSuccess: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },

        selfRegisterRequest: (state, action: PayloadAction<{name: string, email: string, password: string}>) => {},

        logoutRequest: (state) => {}
    }
})

export const { addUserRequest, addUserPasswordRequest, loginRequest, selfRegisterRequest, loginSuccess, logoutRequest } = userSlice.actions;
export const userReducer = userSlice.reducer;

