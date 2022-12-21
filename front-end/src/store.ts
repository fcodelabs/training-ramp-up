import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './slices/HomeSlice'
import createSagaMiddleware from 'redux-saga'
import { HomeSaga } from './sagas/HomeSaga'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
  reducer: {
    students: studentReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(middleware)
})

sagaMiddleware.run(HomeSaga)
