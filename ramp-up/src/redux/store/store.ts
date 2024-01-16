import { configureStore } from '@reduxjs/toolkit'
import dataGridSlice from '../slice/dataGridSlice'

const store = configureStore({
  reducer: {
    dataGrid: dataGridSlice,
  },
})

export default store
