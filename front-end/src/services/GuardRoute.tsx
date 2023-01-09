/* eslint-disable react/react-in-jsx-scope */
import { FC } from 'react'
// import { useAppSelector } from 'app/hooks'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PropType } from '../utils/interface'

const GuardRoute: FC<PropType> = ({ component: Component }) => {
  const isAuthenticated = useSelector((state: any) => state.user.loggedin)
  // console.log(isAuthenticated)

  if (isAuthenticated === 'true') return <Component />
  return <Navigate to="/" />
}

export default GuardRoute
