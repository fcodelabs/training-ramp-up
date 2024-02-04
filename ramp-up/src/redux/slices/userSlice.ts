import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IUser {
  name: string;
  email: string;
  role: string;
}

interface IUserState {
  userEmails: string[];
  user: IUser | null;
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        userEmails : [],
        user: null,
    } as IUserState,
    reducers: {
        addUserEmail: (state, action: PayloadAction<string>) => {
            state.userEmails.push(action.payload);
        },
        addUserRequest: (state, action: PayloadAction<IUser>) => {},

        addUserPasswordRequest: (state, action: PayloadAction<{token: string, password: string}>) => {},

        loginRequest: (state, action: PayloadAction<{email: string, password: string}>) => {},
    }
})

export const { addUserEmail, addUserRequest, addUserPasswordRequest, loginRequest } = userSlice.actions;
export const userReducer = userSlice.reducer;

