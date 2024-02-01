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
  email: string;
  role: Role;
  isVerifiedUser: boolean;
};

type InitialDataTypeUser = {
  isLogged: boolean;
  role: Role;
  token: string;
  newUser: newUser;
};

const initialStateUser: InitialDataTypeUser = {
  isLogged: false,
  role: Role.OBSERVER,
  token: "",
  newUser: {
    _id: "",
    name: "",
    email: "",
    role: Role.OBSERVER,
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
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLogged = true;
      state.token = action.payload;
      state.role = parseToken(action.payload).role;
      localStorage.setItem(LocalstorageId, action.payload);
    },

    logout: (state) => {
      state.isLogged = false;
      state.token = "";
      state.role = Role.OBSERVER;
      localStorage.removeItem(LocalstorageId);
    },

    signup: (state, action: PayloadAction<any>) => {
      //middleware
    },
    updateNewUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser["newUser"]>>
    ) => {
      console.log("action.payload", action.payload);
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
    authententicate: (state) => {
      //middleware
    },
  },
});

export { Role };
export default userSlice.reducer;
export const {
  login,
  logout,
  setNewUserVerification,
  updateNewUser,
  addNewUser,
  loginSuccess,
  authententicate,
  signup
} = userSlice.actions;
