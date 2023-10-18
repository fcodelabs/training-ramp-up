import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserEntry {
  roleType: string;
  name: string;
  address: string;
  email: string;
  mobileNumber: string;
  dob: string;
  password: string;
  gender: string;
}

interface IUserState {
  userEntries: IUserEntry[];
}

const initialState: IUserState = {
  userEntries: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserEntry: (state, action: PayloadAction<IUserEntry>) => {
      const data = action.payload;
      state.userEntries.unshift(data);
    },
    updateUserEntry: (state, action: PayloadAction<IUserEntry>) => {
      const data = action.payload;
      const index = state.userEntries.findIndex(userEntry => userEntry.email === data.email);
      state.userEntries[index] = data;
    },
    fetchUser: () => {},
    setUserEntries: (state, action: PayloadAction<IUserEntry[]>) => {
      state.userEntries = action.payload;
    },
    deleteUserEntry: (state, action: PayloadAction<string>) => {
      const email = action.payload;
      state.userEntries = state.userEntries.filter(userEntry => userEntry.email !== email);
    },
  },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
