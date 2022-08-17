import { createSlice } from '@reduxjs/toolkit';

const logSlice = createSlice({
  name: 'logSlice',
  initialState: {
    isLoggedIn: false,
    accessToken: '',
  },
  reducers: {
    toggleState: (state: any, action: any) => {
      state.isLoggedIn = action.payload;
    },

    storeAccessToken: (state: any, action: any) => {
      state.accessToken = action.payload;
    },
  },
});

export const loggedActions = logSlice.actions;
export default logSlice;
