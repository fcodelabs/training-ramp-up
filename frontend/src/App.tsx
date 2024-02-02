import { useEffect } from "react";
import Home from "./containers/Home/Home";
import { Route, Routes } from "react-router-dom";
import PasswordCreate from "./containers/PasswordCreate/PasswordCreate";
import ProtectedRoute from "./components/PrivateRoute/PrivateRoute";
import { authenticate } from "./redux/user/slice";
import { useAppDispatch } from "./redux/hooks";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
const LocalstorageId = `${process.env.REACT_APP_API_URL}`;

export enum Paths {
  LOGIN = "/",
  HOME = "/home",
  SIGNUP = "signup",
  REGISTER = "/register",
  NOTFOUND = "/404",
}

const routes = [{ path: Paths.HOME, element: <Home /> }];

function App() {

  return (
    <div>
      <Routes>
        <Route path={Paths.LOGIN} element={<Login />} />
        <Route path={Paths.REGISTER} element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SIGNUP} element={<PasswordCreate />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
