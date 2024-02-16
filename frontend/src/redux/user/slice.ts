import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  name: string;
  role: string;
  token?: string;
  password?: string;
  isVerified?: boolean;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterUser extends Omit<IUser, "password"> {
  password: string;
  role: "Observer";
}

export interface ICreatePassword {
  password: string;
  token: string;
}

interface IUserState {
  users: IUser[];
  currentUser?: IUser;
  isVerified: boolean;
}

const initialState: IUserState = {
  users: [],
  currentUser: undefined,
  isVerified: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
      console.log("addUser", action.payload);
      console.log("state.users", state.users);
    },
    setCurrentUser(state, action: PayloadAction<IUser | undefined>) {
      console.log("action.payload", action.payload);
      state.currentUser = action.payload;
      console.log("state.users", state.currentUser);
    },
    createPassword(state, action: PayloadAction<ICreatePassword>) {
      const { password, token } = action.payload;
    },
    loginUser(state, action: PayloadAction<ILoginCredentials>) {
      // Placeholder for login action
      console.log("login action.payload", action.payload);
    },
    logoutUser(state) {
      // Placeholder for logout action
    },
    registerUser(state, action: PayloadAction<IRegisterUser>) {
      const newUser = action.payload;
      console.log("newUser", newUser);
      state.users.push(newUser);
    },
    verifyUser(state) {},
    setVerifyUser(state, action: PayloadAction<boolean>) {
      console.log("setverifyuser", action.payload);
      state.isVerified = action.payload;
    },
  },
});

export const {
  addUser,
  setCurrentUser,
  createPassword,
  loginUser,
  logoutUser,
  registerUser,
  verifyUser,
  setVerifyUser,
} = userSlice.actions;

export default userSlice.reducer;
