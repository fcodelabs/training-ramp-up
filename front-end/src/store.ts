import { configureStore } from '@reduxjs/toolkit'
import studentReducer from './pages/Home/HomeSlice'
import createSagaMiddleware from 'redux-saga'
import { HomeSaga } from './pages/Home/HomeSaga'

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
