import {combineReducers, configureStore} from '@reduxjs/toolkit';
import studentDataReducer from './pages/students/studentSlice';
import useDataReducer from './pages/signIn/signInSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga  from './rootSaga';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['studentData']
}


const rootReducer = combineReducers({
    studentData:studentDataReducer,
    userData:useDataReducer
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        persistedReducer
    },
    middleware: [sagaMiddleware]
});
sagaMiddleware.run(rootSaga);

// export default store;
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
