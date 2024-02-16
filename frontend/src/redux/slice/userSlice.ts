import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUsers {
  email: string;
  name: string;
  role: string;
  password: string;
}
export interface IPasswordToken {
  password: string;
  token: string;
}
interface IinitialState {
  users: IUsers[];
}

const initialState: IinitialState = {
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state, action: PayloadAction<IUsers>) => {},
    createUsers: (state, action: PayloadAction<IPasswordToken>) => {},
  },
});

export const { addUsers,createUsers } = userSlice.actions;

export default userSlice.reducer;
