import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home'

function App() {
  return (
    <div className='App'>
      <Home />
      <ToastContainer />
    </div>
  )
}

export default App
