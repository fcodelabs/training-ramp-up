import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks';

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const location = useLocation();
    const signIn = useAppSelector((state) => state.persistedReducer.userData.signIn);

    if (!signIn) {
        return <Navigate to={'/'} />;
    }

    return <>{children}</>;
};

export default RequireAuth;
