import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLoginDetailsFromLocalStorage } from "./services";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ProtectedRoute = ({ children }: any) => {
  const { isLogged } = getLoginDetailsFromLocalStorage();
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
