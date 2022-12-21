import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import LandPage from './pages/SignIn/LandPage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<LandPage />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  )
}

export default App
