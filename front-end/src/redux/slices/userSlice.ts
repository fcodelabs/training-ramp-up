import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  newUser,
} from "../../components/AddNewUserDialog/AddNewUserDialog";

interface UserState {
  user: User | null;
  registedEmail: boolean;
}

export interface IregisterUser {
  email: string;
  password: string;
  name: string;
  role: string;
  active: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    registedEmail: false,
  } as UserState,
  reducers: {
    addUser: (state, action: PayloadAction<newUser>) => {
      // add user
    },

    registedEmailCheck: (state, action: PayloadAction<string>) => {
      // check if email is registered
    },
    setRegistedEmail: (state, action: PayloadAction<boolean>) => {
      state.registedEmail = action.payload;
    },
    createPassword: (
      state,
      action: PayloadAction<{ token: string; password: string }>
    ) => {
      // create password
    },
    login: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      // login
    },
    setUserDetails: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    verifyToken: (state) => {
      // verify token
    },
    registerUser: (state, action: PayloadAction<IregisterUser>) => {
      // register user
    },
    logOut: (state) => {},
  },
});

export const {
  setUserDetails,
  addUser,
  registedEmailCheck,
  setRegistedEmail,
  createPassword,
  login,
  verifyToken,
  registerUser,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
