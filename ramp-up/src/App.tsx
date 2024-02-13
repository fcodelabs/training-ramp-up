import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopBar from './components/TopBar/TopBar'
import Home from './containers/Home/Home'
import Login from './containers/Login/Login'
import CreatePassword from './containers/CreatePassword/CreatePassword'
import Register from './containers/Register/Register'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store/store'

function App() {

  const user = useSelector(
    (state: RootState) => state.auth.userDetails
  )

  return (
    <div className="App">
      <BrowserRouter>
        {/* <TopBar /> */}
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login /> }/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-password/:token" element={<CreatePassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
