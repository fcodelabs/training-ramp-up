import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  id: number;
  userName: string;
  role: string;
}

const initialState: CurrentUser[] = [];
const currentUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchCurrentUsers: (state) => {
      return state;
    },
    addCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state.push(action.payload);
    },
    updateCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      const userIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        state[userIndex] = action.payload;
      }
    },
    deleteCurrentUser: (state, action: PayloadAction<number>) => {
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

//Actions
export const {
  fetchCurrentUsers,
  addCurrentUser,
  updateCurrentUser,
  deleteCurrentUser,
} = currentUsersSlice.actions;

//Selectors
export const selectUsers = (state: { userReducer: CurrentUser[] }) =>
  state.userReducer;

//Reducer
const CurrentUsersReducer = currentUsersSlice.reducer;
export default CurrentUsersReducer;
