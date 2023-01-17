import { combineReducers } from "redux";
import homeSlice from "../Pages/homeSlice";

const rootReducer = combineReducers({
  home: homeSlice,
});

export default rootReducer;
