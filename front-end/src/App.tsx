import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@progress/kendo-theme-default/dist/all.css'
import Grids from './pages/Grid/Grid'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Grids />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
