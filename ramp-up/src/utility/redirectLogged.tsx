import { Navigate } from "react-router-dom";

const redirectLogged = ({children}) => {
 if (JSON.parse(localStorage.getItem("currentUser"))) {
  console.log("user is logged in");
   return <Navigate to="/home" />;
 }
  return children;
};

export default redirectLogged;