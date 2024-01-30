import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialDataTypeUser = {
    isLogged: boolean;
    isAdmin: boolean;
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      isValidEmail: boolean;
    };
  };
  
  const getTokenFromLocalStorage = (): string => localStorage.getItem("token") || "";
  
  const parseToken = (token: string): { isAdmin: boolean } => {
    try {
      const payloadBase64 = token.split('.')[1];
      const payload = JSON.parse(atob(payloadBase64));
      return { isAdmin: payload.isAdmin || false };
    } catch (error) {
      console.error("Error parsing token:", error);
      return { isAdmin: false };
    }
  };
  
  const token = getTokenFromLocalStorage();
  const { isAdmin } = parseToken(token);
  
  const initialStateUser: InitialDataTypeUser = {
    isLogged: !!token,
    isAdmin,
    token,
    user: {
      _id: "",
      name: "",
      email: "",
      role: "",
      isValidEmail: false,
    },
  };

    const userSlice = createSlice({
        name: "user",
        initialState: initialStateUser,
        reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.isLogged = true;
            state.token = action.payload;
            state.isAdmin = parseToken(action.payload).isAdmin;
        },
        logout: (state) => {
            state.isLogged = false;
            state.token = "";
            state.isAdmin = false;
        },
        setUser: (state, action: PayloadAction<InitialDataTypeUser["user"]>) => {
            state.user = action.payload;
        },
        setValidEmail: (state, action: PayloadAction<boolean>) => {
            state.user.isValidEmail = action.payload;
        },
        },
    });
  