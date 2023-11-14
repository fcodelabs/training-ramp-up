import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const initialState: User[] = [];
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      return state;
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      action.payload.forEach((user) => {
        state.push(user);
      });
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const userIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state[userIndex] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

//Actions
export const {
  fetchUsers,
  fetchUsersSuccess,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions;

//Selectors
export const selectUsers = (state: { userReducer: User[] }) =>
  state.userReducer;

//Reducer
const usersReducer = usersSlice.reducer;
export default usersReducer;
