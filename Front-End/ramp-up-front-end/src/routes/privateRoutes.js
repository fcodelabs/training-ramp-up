import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";

const PrivateRoutes = () => {
  const user = useSelector(selectUser);

  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoutes;
