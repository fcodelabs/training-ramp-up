import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './studentsSlice/stdentsSlice';

const store = configureStore({
    reducer: {
        students: studentReducer,
    },
    });

export default store;
export type RootState = ReturnType<typeof store.getState>;