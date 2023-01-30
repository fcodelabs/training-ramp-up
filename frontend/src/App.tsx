import { Outlet, Route, Routes } from 'react-router'
import './App.css'
import { HomePage } from './pages/rampUpHome/HomePage'
import { SignInPage } from './pages/signInPage/SignInPage'
import { routes } from './utils/Routes'

function App(): JSX.Element {
  return (
    // <div className='App'>
    //   {/* <HomePage />  */}
    //   <SignInPage />
    // </div>
    <Routes>
      <Route path='/' element={<Outlet />}>
        <Route path='login' element={<SignInPage />} />

        <Route path='/' element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default App
