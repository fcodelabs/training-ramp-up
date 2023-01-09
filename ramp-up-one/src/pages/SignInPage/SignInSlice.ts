import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'signIn',
  initialState: {
    user: '',
    userDetail: [],
  },
  reducers: {
    registerUserAction: (state, action) => {},
    loginUserAction: (state, action) => {},
    logOutUserAction: () => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});

export const {
  registerUserAction,
  loginUserAction,
  saveUserAction,
  logOutUserAction,
  setUserDetails,
} = userSlice.actions;

export const selectUser = (state:any) => state.userReducer.user;

const userReducer = userSlice.reducer;
export default userReducer;
