import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Outlet, Navigate } from 'react-router-dom'
import { clearPersonData } from '../../pages/rampUpHome/personDataSlice'
import { clearUser } from '../../pages/signInPage/userSlice'

interface Props {
  allowedRoles: string[]
}
const ProtectedRoute: React.FC<Props> = (props): JSX.Element => {
  const auth = useSelector((state: any) => state.userData)
  const accessToken = localStorage.getItem('accessToken')
  const location = useLocation()

  // eslint-disable-next-line react/prop-types, @typescript-eslint/strict-boolean-expressions
  return props.allowedRoles.includes(auth?.user?.user?.Role) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace={true} />
  )
}

export default ProtectedRoute
