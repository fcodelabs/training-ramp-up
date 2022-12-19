import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import homeReducer from './pages/HomePage/slice/HomePageSlice'
//import signInReducer from './pages/SignInPage/SignInSlice'
import { HomePageSaga } from './pages/HomePage/saga/HomePageSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = configureStore({
    reducer: {
        home: homeReducer,
    },
    middleware: middleware,
})

sagaMiddleware.run(HomePageSaga)

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
