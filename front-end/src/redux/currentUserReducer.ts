import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  id: string;
  userName: string;
  role: string;
}

const initialState: CurrentUser = { id: "", userName: "", role: "" };
const currentUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchCurrentUser: (state) => {
      return state;
    },
    setCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      state = action.payload;
      return state;
    },
    updateCurrentUser: (state, action: PayloadAction<CurrentUser>) => {
      if (state && state.id === action.payload.id) {
        state = action.payload;
        return state;
      }
      return state;
    },
    clearCurrentUser: (state) => {
      state = { id: "", userName: "", role: "" };
      return state;
    },
  },
});

//Actions
export const {
  fetchCurrentUser,
  setCurrentUser,
  updateCurrentUser,
  clearCurrentUser,
} = currentUsersSlice.actions;

//Selectors
export const selectUser = (state: { userReducer: CurrentUser }) =>
  state.userReducer;

//Reducer
const CurrentUserReducer = currentUsersSlice.reducer;
export default CurrentUserReducer;
