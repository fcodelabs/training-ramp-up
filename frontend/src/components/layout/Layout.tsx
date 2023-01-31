import { Outlet } from 'react-router'

export const Layout = ():JSX.Element => {
  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}
