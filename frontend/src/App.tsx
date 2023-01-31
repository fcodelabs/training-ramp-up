import { Route, Routes } from 'react-router'
import './App.css'
import { Layout } from './components/layout/Layout'
import ProtectedRoute from './components/protectedRoute/ProtectedRoute'
import { HomePage } from './pages/rampUpHome/HomePage'
import { SignInPage } from './pages/signInPage/SignInPage'
// import { routes } from './utils/Routes'

function App(): JSX.Element {

  const allowedRoles = ['admin', 'guest', 'editor']

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='login' element={<SignInPage />} />
        <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
          <Route path='/' element={<HomePage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App
