import { createSlice } from '@reduxjs/toolkit';

const logSlice = createSlice({
  name: 'logSlice',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    toggleState: (state: any) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
  },
});

export const loggedActions = logSlice.actions;
export default logSlice;
