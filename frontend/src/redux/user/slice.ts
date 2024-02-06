import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  name: string;
  role: string;
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
}

const initialState: IUserState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      state.users.push(action.payload);
    },
    setUsers(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
    createPassword(state, action: PayloadAction<ICreatePassword>) {
      const { password, token } = action.payload;
      const user = state.users.find((user) => user.password === token);
      if (user) user.password = password;
    },
    loginUser(state, action: PayloadAction<ILoginCredentials>) {
      // Placeholder for login action
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
  setUsers,
  createPassword,
  loginUser,
  logoutUser,
  registerUser,
} = userSlice.actions;

export default userSlice.reducer;
