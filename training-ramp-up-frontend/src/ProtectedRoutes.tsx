import * as React from 'react'
import { Navigate, Outlet } from 'react-router'
import Cookies from "universal-cookie";

const cookies = new Cookies();



const ProtectedRoutes = () => {
    const authenticated = cookies.get('user')
    return authenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes
