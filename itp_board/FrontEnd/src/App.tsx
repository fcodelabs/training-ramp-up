import './App.css'
import { Routes, Route } from 'react-router-dom'
import Users from './Pages/Users/Users'

function App() {
  return (
    <>
      <Routes>
        <Route path='users' element={<Users />} />
      </Routes>
    </>
  )
}

export default App
