import { createSlice } from '@reduxjs/toolkit';

const logSlice = createSlice({
  name: 'logSlice',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    toggleState: (state: any, action: any) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const loggedActions = logSlice.actions;
export default logSlice;
