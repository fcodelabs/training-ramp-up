import { GridValidRowModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { emptyRows } from "../../utilities";
type initialDataType = {
  isLoading: boolean;
  rows: GridValidRowModel[];
};

export const initialState: initialDataType = {
  isLoading: false,
  rows: [...emptyRows],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      //middleware
    },
    addUser: (state, action: PayloadAction<GridValidRowModel>) => {
      //middleware
    },
    setUsers: (state, action: PayloadAction<GridValidRowModel[]>) => {
      state.rows = action.payload;
      state.isLoading = false;
    },
    fetchUsersFailure: (state) => {
      state.isLoading = true;
      state.rows = [...emptyRows];
    },
    discardUser: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((user) => user.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<GridValidRowModel>) => {
      state.rows = state.rows.map((user) =>
        user.id === action.payload.id ? { ...user, ...action.payload } : user
      );
    },
    setUserError: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.map((user) =>
        user.id === action.payload ? { ...user, error: true } : user
      );
    },
  },
});

export const {
  fetchUsers,
  setUsers,
  fetchUsersFailure,
  addUser,
  discardUser,
  updateUser,
  setUserError,
} = userSlice.actions;

export default userSlice.reducer;
