import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Role, authenticate } from "../../redux/user/slice";

import { useEffect } from "react";
import { Paths } from "../../App";
import LoadingComponent from "../Loading/Loading";

export default function ProtectedRoute(children: any) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticate());
  }, [dispatch, user]);

  if (user.role) {
    return <Outlet />;
  } else {
    if (user.loginError) {
      return <Navigate to={Paths.LOGIN} />;
    }
    return <LoadingComponent />;
  }
}
