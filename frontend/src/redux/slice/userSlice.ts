import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUsers {
  email: string;
  name: string;
  role: string;
  password: string;
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
  },
});

export const { addUsers } = userSlice.actions;

export default userSlice.reducer;
