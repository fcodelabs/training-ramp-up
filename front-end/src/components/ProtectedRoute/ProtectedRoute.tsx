import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyToken } from "../../redux/slices/userSlice";

const ProtectedRoute = ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  let isAuthenticated = false;

  if (user !== null) {
    isAuthenticated = user.role === "Admin" || user.role === "Observer" ? true : false;
  }

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  if (isAuthenticated) {
    return children;
  } else {
    navigate("/login");
  }
};

export default ProtectedRoute;
