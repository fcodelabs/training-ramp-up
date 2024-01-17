import { GridRowsProp, GridValidRowModel } from "@mui/x-data-grid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  birthday: Date;
  age: number;
};

type initialDataType = {
  isLoading: boolean;
  rows: GridValidRowModel[];
};

const initialState: initialDataType = {
  isLoading: false,
  rows: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUsers: (state) => {
      state.isLoading = false;
    },
    setUsers: (state, action: PayloadAction<GridValidRowModel[]>) => {
      state.rows = action.payload;
    },
    fetchUsersFailure: (state) => {
      state.isLoading = true;
    },
    addUser: (state, action: PayloadAction<GridValidRowModel>) => {
      state.rows.push(action.payload);
    },
    discardUser: (state, action: PayloadAction<number>) => {
      state.rows = state.rows.filter((user) => user.id !== action.payload);
    },
    saveUser: (state, action: PayloadAction<User>) => {
      state.rows = state.rows.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
    },
    updateUser: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<GridValidRowModel> }>
    ) => {
      state.rows = state.rows.map((user) =>
        user.id === action.payload.id
          ? { ...user, ...action.payload.updates }
          : user
      );
    },
    updateRow: (state, action: PayloadAction<GridValidRowModel>) => {
      state.rows = state.rows.map((user) =>
        user.id === action.payload.id ? action.payload : user
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
  saveUser,
  updateUser,
  updateRow,
} = userSlice.actions;

export default userSlice.reducer;
