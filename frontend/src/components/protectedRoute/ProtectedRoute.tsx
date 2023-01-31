import { useSelector } from 'react-redux'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

interface Props {
  allowedRoles: string[]
}
const ProtectedRoute: React.FC<Props> = (props): JSX.Element => {
  const auth = useSelector((state: any) => state.userData)
  const location = useLocation()
  // eslint-disable-next-line react/prop-types
  return props.allowedRoles.includes(auth?.user?.user?.Role) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default ProtectedRoute
