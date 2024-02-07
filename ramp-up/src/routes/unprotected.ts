import { Login } from "../pages/Login/Login";
import { SelfRegistration } from "../pages/SelfRegistration/SelfRegistration";
import { CreatePassword } from "../pages/CreatePassword/CreatePassword";

export const unprotectedRoutes = [
  {
    path: "/",
    component: Login,
    exact: true,
  },
  {
    path: "/self-registration",
    component: SelfRegistration,
    exact: true,
  },
  {
    path: "/create-password",
    component: CreatePassword,
    exact: true,
  },
];
