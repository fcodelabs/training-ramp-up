import { configureStore } from "@reduxjs/toolkit";
import studentDataReducer from "./Pages/Students/studentSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga  from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        studentData: studentDataReducer,
    },
    middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
