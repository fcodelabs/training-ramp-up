import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import GuardRoute from './services/GuardRoute'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<GuardRoute component={Home} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App