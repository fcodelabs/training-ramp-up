import { configureStore } from '@reduxjs/toolkit';
import logSlice from './loged-slice';

const store = configureStore({
  reducer: {
    log: logSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
