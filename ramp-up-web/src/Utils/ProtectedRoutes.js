import React from "react";
import { Navigate, Outlet} from "react-router-dom";
// import { UserContext } from "../Pages/App/App";

// const useAuth = () => {
//   const { user } = UserContext(UserContext);
//   return user && user.signedIn;
// };

const userAuth = () => {
  const isAuthenticated = localStorage.getItem("token");
  if (isAuthenticated) {
    return { loggedIn: true };
  } else return null;
};

// const ProtectedRoutes = () => {
//   const location = useLocation;
//   const isAuth = userAuth;
//   return isAuth ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" replace state={{ from: location }} />
//   );
// };

const ProtectedRoutes = () => {
  const isAuth = userAuth();
  return isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;
