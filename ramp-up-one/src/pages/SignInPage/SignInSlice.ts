import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'signIn',
  initialState: {
    user: '',
  },
  reducers: {
    loginUserAction: (state, action) => {},
    logOutUserAction: () => {},
    saveUserAction: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUserAction, saveUserAction, logOutUserAction } = userSlice.actions;

export const selectUser = (state:any) => state.userReducer.user;

const userReducer = userSlice.reducer;
export default userReducer;
