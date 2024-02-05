import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
  socketId?: string;
  role: Role;
  email?: string;
  password?: string;
  loginError?: boolean;
  newUser: newUser;
};

export const initialStateUser: InitialDataTypeUser = {
  isLogged: false,
  role: Role.NONE,
  socketId: "",
  email: "",
  password: "",
  loginError: false,
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
    setSocketId: (state, action: PayloadAction<string>) => {
      state.socketId = action.payload;
    },
    updateUser: (
      state,
      action: PayloadAction<Partial<InitialDataTypeUser>>
    ) => {
      Object.assign(state, action.payload);
      state.loginError = false;
    },
    loginSuccess: (state, action: PayloadAction<any>) => {
      state.isLogged = true;
      state.loginError = false;
      state.role = action.payload.role;
    },
    loginFail: (state, action: PayloadAction<string>) => {
      state.loginError = true;
      // localStorage.removeItem(LocalstorageId);
    },
    registerSuccess: (state) => {
      state.newUser.registered = true;
      state.newUser.isVerifiedUser = false;
    },
    logoutSuccess: (state) => {
      state.isLogged = false;
      state.email = "";
      state.password = "";
      state.role = Role.NONE;
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
    addNewUser: (state, action: PayloadAction<any>) => {
      //middleware
    },
    login: (state, action: PayloadAction<any>) => {
      //middleware
    },
    authenticate: (state) => {
      //middleware
    },
    register: (state, action: PayloadAction<any>) => {
      //middleware
    },
    logout: (state) => {
      //middleware
    }
  },
});

export { Role };
export default userSlice.reducer;
export const {
  login,
  logoutSuccess,
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
  registerSuccess,
  setSocketId,
} = userSlice.actions;
