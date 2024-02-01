import React, { useEffect } from "react";
import Home from "./containers/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import PasswordCreate from "./containers/PasswordCreate/PasswordCreate";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";
import { authenticate } from "./redux/user/slice";
import { useAppDispatch } from "./redux/hooks";
import Login from "./containers/Login/Login";
import AutoLogout from "./components/AutoLogout/AutoLogout";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export enum Paths {
  LOGIN = "/",
  HOME = "/home",
  SIGNUP = "signup",
  NOTFOUND = "/404",
}

const routes = [{ path: Paths.HOME, element: <Home /> }];

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem(LocalstorageId);
    dispatch(authenticate(token));
  }, []);

  return (
    <div>
      <AutoLogout />
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SIGNUP} element={<PasswordCreate />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
