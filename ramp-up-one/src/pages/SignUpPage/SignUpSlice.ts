import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'signUp',
  initialState: {
    user: '',
  },
  reducers: {
    registerUserAction: (state, action) => {},
    loginUserAction: (state, action) => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { registerUserAction, loginUserAction, saveUserAction } =
  userSlice.actions;

export const selectUser = (state: any) => state.userReducer.user;

const userReducer = userSlice.reducer;
export default userReducer;
