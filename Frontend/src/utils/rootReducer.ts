import { combineReducers } from "redux";
import homeSlice from "../Pages/Home/homeSlice";
import signInSlice from "../Pages/SignIn/signInSlice";

const rootReducer = combineReducers({
  home: homeSlice,
  signIn: signInSlice,
});

export default rootReducer;
