import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRouter = () => {
  const isSignedIn = useSelector((state: any) => state.user.signedIn)
  return isSignedIn ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRouter
