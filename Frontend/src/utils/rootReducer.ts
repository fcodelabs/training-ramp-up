import { combineReducers } from "redux";
import homeSlice from "../pages/Home/homeSlice";

const rootReducer = combineReducers({
  home: homeSlice,
});

export default rootReducer;
