import { configureStore, combineReducers } from '@reduxjs/toolkit';
import gridReducer from './pages/Grid/gridSlice';
import createSagaMiddleware from 'redux-saga'
import {persistStore,persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import gridSaga from './pages/Grid/gridSaga';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  grid:gridReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware]
});

sagaMiddleware.run(gridSaga);
export const persistor = persistStore(store);
