import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import homeReducer from './pages/homePage/slice/homePageSlice'
import signUpReducer from './pages/signUpPage/slice/signUpPageSlice'
import signInReducer from './pages/signInPage/slice/signInPageSlice'
import { HomePageSaga } from './pages/homePage/saga/homePageSaga'
import { SignUpPageSaga } from './pages/signUpPage/saga/signUpPageSaga'
import { SignInPageSaga } from './pages/signInPage/saga/signInPageSaga'

const sagaMiddleware = createSagaMiddleware()

const middleware = [sagaMiddleware]

const store = configureStore({
    reducer: {
        home: homeReducer,
        signUp: signUpReducer,
        signIn: signInReducer,
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
