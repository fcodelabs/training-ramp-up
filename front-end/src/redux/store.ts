import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/stdentsSlice";
import userReducer from "./slices/userSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];

const store = configureStore({
  reducer: {
    students: studentReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
