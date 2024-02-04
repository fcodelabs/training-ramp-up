import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import CreatePassword from './containers/CreatePassword/CreatePassword'


function App() {
  return (
    <div className="App">
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-password/:token' element={<CreatePassword />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
