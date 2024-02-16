import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  User,
  newUser,
} from "../../components/AddNewUserDialog/AddNewUserDialog";

interface UserState {
  user: User | null;
  registedEmail: boolean;
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
    createPassword: (state, action: PayloadAction<{ token: string; password: string }>) => {
      // create password
    },
    fetchUserDetails: (state, action: PayloadAction<string>) => {
      // fetch user details
    },
    setUserDetails: (state: UserState, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

  },
});

export const {
  fetchUserDetails,
  setUserDetails,
  addUser,
  registedEmailCheck,
  setRegistedEmail,
  createPassword,
} = userSlice.actions;
export default userSlice.reducer;
