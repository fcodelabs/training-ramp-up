import { configureStore, combineReducers } from '@reduxjs/toolkit'
import gridReducer from './pages/Grid/gridSlice'
import userReducer from './pages/SignIn/userSlice'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import gridSaga from './pages/Grid/gridSaga'
import userSaga from './pages/SignIn/userSaga'
import { all } from 'redux-saga/effects'

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['grid'],
  storage,
}

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  grid: gridReducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})

function* rootSaga() {
  yield all([gridSaga(), userSaga()])
}

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
export default store
