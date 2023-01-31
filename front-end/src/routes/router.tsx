import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn/SignIn'
import Grid from '../pages/Grid/Grid'
import { ToastContainer } from 'react-toastify'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/grid' element={<Grid />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
