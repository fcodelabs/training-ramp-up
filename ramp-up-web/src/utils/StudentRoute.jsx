import { Navigate, Outlet } from "react-router-dom";
import { useStore, useSelector } from "react-redux";
import { useEffect } from "react";

const StudentRoute = () => {
  const store = useStore();
  const token = useSelector(() => store.getState().token);
  const userName = localStorage.getItem("user");
  useEffect(() => {
    store.dispatch({ type: "refreshUser", payload: userName });
  }, []);
  if (token !== null) {
    return <Outlet />;
  } else {
    return <Navigate to={"/sign-in"} />;
  }
};

export default StudentRoute;
