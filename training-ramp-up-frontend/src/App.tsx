import * as React from 'react'
import HomePage from './pages/homePage/homePage'
import SignUpPage from './pages/signUpPage/signUpPage'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/signInPage/signInPage'
import ProtectedRoutes from './ProtectedRoutes'



const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    
    )
}

export default App
