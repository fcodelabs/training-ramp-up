import { useEffect } from "react";
import { Role, logout } from "../../redux/user/slice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const AutoLogout = () => {
  const dispatch = useAppDispatch();
  const timeoutInMinutes = 15

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          dispatch(logout());
        },
        timeoutInMinutes * 60 * 1000
      );
    };

    const handleActivity = () => {
      resetTimeout();
    };

    resetTimeout();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
      clearTimeout(timeoutId);
    };
  }, [dispatch, timeoutInMinutes]);

  return null;
};

export default AutoLogout;
