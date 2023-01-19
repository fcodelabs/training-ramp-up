import { combineReducers } from "redux";
import homeSlice from "../Pages/Home/homeSlice";

const rootReducer = combineReducers({
  home: homeSlice,
});

export default rootReducer;
