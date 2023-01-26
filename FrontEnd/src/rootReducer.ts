import { combineReducers } from '@reduxjs/toolkit';
import { homeSlice } from './pages/Home/homeSlice';

const rootReducer = combineReducers({
    home: homeSlice.reducer,
});

export default rootReducer;