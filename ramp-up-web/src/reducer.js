import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "reducer",
  initialState: {
    entries: [],
    updatingEntry: null,
    changingEntry: null,
    token: null,
  },
  reducers: {
    addEntries(state, action) {
      state.entries = action.payload;
    },
    addUpdatingEntry(state, action) {
      state.updatingEntry = action.payload;
    },
    addChangingEntry(state, action) {
      state.changingEntry = action.payload;
    },
    addToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { addEntries, addUpdatingEntry, addChangingEntry, addToken } =
  reducer.actions;
export default reducer.reducer;
