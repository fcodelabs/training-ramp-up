import React, { useEffect } from 'react';
import { Role, logout } from '../../redux/user/slice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const AutoLogout = () => {
  const dispatch = useAppDispatch();
  const timeoutInMinutes = useAppSelector((state) => state.user.role) === Role.ADMIN ? 15 : 600;  
  useEffect(() => {
    let timeoutId:any;
    console.log(timeoutInMinutes);
    const resetTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        dispatch(logout());
      }, timeoutInMinutes * 60 * 1000);
    };

    const handleActivity = () => {
      resetTimeout();
    };

    resetTimeout();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [dispatch, timeoutInMinutes]);

  return null;
};

export default AutoLogout;
