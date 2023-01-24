import React from 'react'
import logo from './logo.svg'
import './App.css'
import Home from './pages/Home/Home'
import { ToastContainer } from 'react-toastify'
import * as io from 'socket.io-client'

function App() {

  return (
    <>
    <Home/>
    <ToastContainer/>
    </>
  )
}

export default App
