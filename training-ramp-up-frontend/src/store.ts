import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import homeReducer from './pages/HomePage/slice/HomePageSlice'
import signUpReducer from './pages/SignUpPage/slice/SignUpPageSlice'
import signInReducer from './pages/SignInPage/slice/SignInPageSlice'
import { HomePageSaga } from './pages/HomePage/saga/HomePageSaga'
import { SignUpPageSaga } from './pages/SignUpPage/saga/SignUpPageSaga'
import { SignInPageSaga } from './pages/SignInPage/saga/SignInPageSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = configureStore({
    reducer: {
        home: homeReducer,
        signUp:signUpReducer,
        signIn:signInReducer
    },
    middleware: middleware,
})

sagaMiddleware.run(HomePageSaga)
sagaMiddleware.run(SignUpPageSaga)
sagaMiddleware.run(SignInPageSaga)

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
