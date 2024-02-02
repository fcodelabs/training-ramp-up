import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

enum Role {
  ADMIN = "admin",
  OBSERVER = "observer",
  NONE = "",
}
type newUser = {
  _id: string;
  name: string;
  password: string;
  email: string;
  role: Role;
  registered: boolean;
  isVerifiedUser: boolean;
};

type InitialDataTypeUser = {
  isLogged: boolean;
  role: Role;
  token: string;
  email?: string;
  password?: string;
  loginError?: boolean;
  newUser: newUser;
};

const initialStateUser: InitialDataTypeUser = {
  isLogged: false,
  role: Role.NONE,
  email: "",
  password: "",
  loginError: false,
  token: "",
  newUser: {
    _id: "",
    name: "",
    password: "",
    email: "",
    role: Role.OBSERVER,
    registered: false,
    isVerifiedUser: false,
  },
};

const parseToken = (token: string): { role: Role } => {
  try {
    const payloadBase64 = token.split(".")[1];
    const payload = JSON.parse(atob(payloadBase64));
    return { role: payload.role || "" };
  } catch (error) {
    console.error("Error parsing token:", error);
    return { role: Role.NONE };
  }
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    updateUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser>>
    ) => {
      Object.assign(state, action.payload);
      state.loginError = false;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLogged = true;
      state.token = action.payload;
      state.loginError = false;
      state.role = parseToken(action.payload).role;
      localStorage.setItem(LocalstorageId, action.payload);
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loginError = true;
      // localStorage.removeItem(LocalstorageId);
    },
    registerSuccess: (state) => {
      state.newUser.registered = true;
      state.newUser.isVerifiedUser = false;
    },
    logout: (state) => {
      state.isLogged = false;
      state.token = "";
      state.email = "";
      state.password = "";
      state.role = Role.NONE;
      localStorage.removeItem(LocalstorageId);
    },
    signup: (state, action: PayloadAction<any>) => {
      //middleware
    },
    updateNewUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser["newUser"]>>
    ) => {
      state.newUser = { ...state.newUser, ...action.payload };
      state.newUser.isVerifiedUser = false;
    },
    setNewUserVerification: (state, action: PayloadAction<boolean>) => {
      state.newUser.isVerifiedUser = action.payload;
    },
    addNewUser: (state, action: PayloadAction<newUser>) => {
      //middleware
    },
    login: (state, action: PayloadAction<any>) => {
      //middleware
    },
    authenticate: (state, action: PayloadAction<any>) => {
      //middleware
    },
    register: (state, action: PayloadAction<any>) => {
      //middleware
    }
  },
});

export { Role };
export default userSlice.reducer;
export const {
  login,
  logout,
  loginFail,
  updateUser,
  setNewUserVerification,
  updateNewUser,
  addNewUser,
  loginSuccess,
  authenticate,
  signup,
  register,
  registerSuccess
} = userSlice.actions;
