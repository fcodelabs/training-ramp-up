import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "reducer",
  initialState: { entries: [], updatingEntry: null, changingEntry: null },
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
  },
});

export const { addEntries, addUpdatingEntry, addChangingEntry } =
  reducer.actions;
export default reducer.reducer;
