import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUsers {
  email: string;
  name: string;
  role: string;
  password: string;
}
export interface IPasswordToken {
  password: string;
  token: string;
}
export interface ILoginCredentials {
  email: string;
  password: string;
}
export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}
interface IinitialState {
  users: IUsers[];
}

const initialState: IinitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUsers>) => {},
    createUsers: (state, action: PayloadAction<IPasswordToken>) => {},
    loginUsers: (state, action: PayloadAction<ILoginCredentials>) => {},
    logoutUsers: (state) => {},
    registerUsers: (state, action: PayloadAction<IRegisterUser>) => {},
  },
});

export const { addUsers, createUsers, loginUsers, logoutUsers, registerUsers } =
  userSlice.actions;

export default userSlice.reducer;
