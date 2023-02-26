import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '../pages/SignIn/SignIn'
import Grid from '../pages/Grid/Grid'
import SignUp from '../pages/SignUp/SignUp'
import { ToastContainer } from 'react-toastify'
import ProtectedRouter from './protectedRouter'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route element={<ProtectedRouter />}>
          <Route path='/grid' element={<Grid />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}
