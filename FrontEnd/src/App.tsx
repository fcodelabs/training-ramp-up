import React from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import * as io from 'socket.io-client'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from './pages/Error'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element = {<SignIn/>}/>
        <Route path='/SignUp' element = {<SignUp/>}/>
        <Route path='/Home' element = {<Home/>}/>
        <Route path='*' element = {<ErrorPage/>}/>
      </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App
