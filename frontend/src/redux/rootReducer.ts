import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./student/slice";
import userReducer from "./user/slice";

const rootReducer = combineReducers({
  student: studentReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
