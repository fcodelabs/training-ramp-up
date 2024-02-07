import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  name: string;
  role: string;
  token?: string;
  password?: string;
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
}

const initialState: IUserState = {
  users: [],
  currentUser: undefined,
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
      console.log(password, token);
      //const user = state.users.find((user) => user.token === token);
      //console.log("user", user);
      //if (user) user.password = password;
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
  },
});

export const {
  addUser,
  setCurrentUser,
  createPassword,
  loginUser,
  logoutUser,
  registerUser,
} = userSlice.actions;

export default userSlice.reducer;
