import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../pages/loginSlice";
import { userReducer } from "../state/userSlice";
import rootSaga from "../state/saga";
import createSagaMiddleware from "redux-saga";
const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({
  reducer: {
    token: tokenReducer.reducer,
    user: userReducer.reducer,
  },
  middleware: [sagaMiddleWare],
});
export default store;
