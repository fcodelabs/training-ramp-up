import * as React from 'react'
import HomePage from './pages/HomePage/HomePage'
import SignUpPage from './pages/SignUpPage/SignUpPage'
import { Route, Routes } from 'react-router-dom'
import SignInPage from './pages/SignInPage/SignInPage'

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    )
}

export default App
