import { combineReducers } from "redux";
import homeSlice from "../pages/Home/homeSlice";
import signInSlice from "../pages/SignIn/signInSlice";

const rootReducer = combineReducers({
  home: homeSlice,
  signIn: signInSlice,
});

export default rootReducer;
