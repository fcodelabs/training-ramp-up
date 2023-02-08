import { AllEffect, ForkEffect, all } from 'redux-saga/effects'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import personReducer from '../pages/rampUpHome/personDataSlice'
import notificationReducer from '../pages/rampUpHome/notificationSlice'
import userReducer from '../pages/signInPage/userSlice'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userLogin, userRegister, userLogOut, authLogin } from '../pages/signInPage/userSaga'
import { getNotifications, handlePersonActions } from '../pages/rampUpHome/personDataSaga'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([
    userRegister(),
    userLogin(),
    handlePersonActions(),
    getNotifications(),
    userLogOut(),
    authLogin(),
  ])
}

const rootReducer = combineReducers({
  personData: personReducer,
  notification: notificationReducer,
  userData: userReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)
