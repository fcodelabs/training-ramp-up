import { Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { authenticate } from "../../redux/user/slice";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

import { useEffect } from "react";
import Login from "../../containers/Login/Login";

export default function ProtectedRoute(children: any) {
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  const Token = token ? token : localStorage.getItem(LocalstorageId);
  useEffect(() => {
    dispatch(authenticate(token));
  }, []);

  if (role) {
    return <Outlet />;
  } else {
    return <Login/>;
  }
}
