import Home from '../pages/Home/Home'
import SignIn from '../pages/SignIn/SignIn'
import SignUp from '../pages/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorPage from '../pages/Error'
import RequireAuth from './RequireAuth'

const AppRoutes = () => {
    return ( 
        <Router>
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<ErrorPage />} />
          <Route element={<RequireAuth />}>
            <Route path='/home' element={<Home />} />
            {/* <Route path='/' element={<SignIn />} /> */}
          </Route>
        </Routes>
      </Router>
     );
}
 
export default AppRoutes;