import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Role, authenticate } from "../../redux/user/slice";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

import { useEffect } from "react";
import { Paths } from "../../App";
import LoadingComponent from "../Loading/Loading";

export default function ProtectedRoute(children: any) {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const Token = token ? token : localStorage.getItem(LocalstorageId);
  useEffect(() => {
    if (Token) {
      dispatch(authenticate(Token));
    }
  }, [Token, dispatch]);

  if (user.role) {
    return <Outlet />;
  } else {
    if (user.loginError || Token === null) {
      return <Navigate to={Paths.LOGIN} />;
    }
    return <LoadingComponent />;
  }
}
