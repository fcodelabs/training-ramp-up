import { configureStore, combineReducers } from "@reduxjs/toolkit";
import personReducer from "../pages/rampUpHome/PersonDataSlice"
import notificationReducer from "../pages/rampUpHome/NotificationSlice"
import createSagaMiddleware from 'redux-saga'

import {
  persistStore,
  persistReducer,
 
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootSaga from "../pages/rampUpHome/PersonDataSaga";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  personData: personReducer,
notification:notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
