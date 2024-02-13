import React from "react";
import { Login } from "../pages/Login/Login";
import { SelfRegistration } from "../pages/SelfRegistration/SelfRegistration";
import { CreatePassword } from "../pages/CreatePassword/CreatePassword";

export const unprotectedRoutes = [
  {
    path: "/",
    ele: <Login />,
  },
  {
    path: "/self-registration",
    ele: <SelfRegistration />,
  },
  {
    path: "/create-password/:token",
    ele: <CreatePassword />,
  },
];
