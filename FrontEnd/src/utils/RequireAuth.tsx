import { useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { SignInState } from '../interfaces/interfaces';

const RequireAuth = ()  => {
    const isSignedIn = useSelector((state: SignInState) => state.user.signedIn);
    return (
      isSignedIn ? <Outlet/> : <Navigate to="/" />
    )
}

export default RequireAuth;