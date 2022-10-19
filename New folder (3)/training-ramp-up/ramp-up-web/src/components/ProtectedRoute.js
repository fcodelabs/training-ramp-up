import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const userAuth = () => {
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return { loggedIn: true };
  } else return null;
};

const ProtectedRoute = () => {
  const isAuth = userAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoute;
