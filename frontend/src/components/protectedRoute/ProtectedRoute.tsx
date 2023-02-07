import { useSelector } from 'react-redux'
import { useLocation, Outlet, Navigate } from 'react-router-dom'

interface Props {
  allowedRoles: string[]
}
const ProtectedRoute: React.FC<Props> = (props): JSX.Element => {
  const auth = useSelector((state: any) => state.userData)
  const accessToken = localStorage.getItem('accessToken')
  const location = useLocation()
  console.log(location)
  // eslint-disable-next-line react/prop-types, @typescript-eslint/strict-boolean-expressions
  return props.allowedRoles.includes(auth?.user?.user?.Role) && accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace={true} />
  )
}

export default ProtectedRoute
