import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { verifyUser } from "../redux/user/slice";
import LoadingSpinner from "../components/LoadingComponent/LoadingComponent";

const ProtectedRoute = ({ children }: any) => {
  const isAuthorized = useSelector((state: RootState) => state.user.isVerified);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(verifyUser());
  }, [dispatch]);

  useEffect(() => {
    console.log("isAuthorized:", isAuthorized);
  }, [isAuthorized]);

  if (isAuthorized === true) {
    return children;
  } else {
    if (isAuthorized === false) {
      navigate("/login", { replace: true });
    }
    return <LoadingSpinner />;
  }
};
export default ProtectedRoute;
