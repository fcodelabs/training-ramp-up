import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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

const getTokenFromLocalStorage = (): string =>
  localStorage.getItem("token") || "";

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

const token = getTokenFromLocalStorage();
const { role } = parseToken(token);

const initialStateUser: InitialDataTypeUser = {
  isLogged: !!token,
  role,
  token,
  newUser: {
    _id: "",
    name: "",
    email: "",
    role: Role.NONE,
    isVerifiedUser: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateUser,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLogged = true;
      state.token = action.payload;
      state.role = parseToken(action.payload).role;
    },
    logout: (state) => {
      state.isLogged = false;
      state.token = "";
      state.role = Role.NONE;
    },
    updateNewUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser["newUser"]>>
    ) => {
      console.log("action.payload", action.payload);
      state.newUser = { ...state.newUser, ...action.payload };
    },
    setNewUserVerification: (state, action: PayloadAction<boolean>) => {
      state.newUser.isVerifiedUser = action.payload;
    },
    addNewUser: (state, action: PayloadAction<newUser>) => {
      //middleware
    },
  },
});

export { Role };
export default userSlice.reducer;
export const { login, logout, setNewUserVerification, updateNewUser, addNewUser } =
  userSlice.actions;
