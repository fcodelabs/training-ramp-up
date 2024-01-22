import { configureStore } from '@reduxjs/toolkit'
 import dataGridSlice from '../slice/dataGridSlice'

const store = configureStore({
  reducer: {
    dataGrid: dataGridSlice,
  },
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
