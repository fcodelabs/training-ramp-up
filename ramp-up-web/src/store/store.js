import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../pages/slice/loginSlice";
import userReducer from "../pages/slice/userSlice";
import studentReducer from "../pages/slice/studentSlice";
import rootSaga from "../store/rootSaga";
import createSagaMiddleware from "redux-saga";
const sagaMiddleWare = createSagaMiddleware();
const store = configureStore({
  reducer: {
    token: tokenReducer.reducer,
    user: userReducer.reducer,
    student: studentReducer.reducer,
  },
  middleware: [sagaMiddleWare],
});

sagaMiddleWare.run(rootSaga);
export default store;
