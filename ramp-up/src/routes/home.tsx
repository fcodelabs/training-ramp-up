import React from "react";
import Home from "../pages/home/Home";
import { userRoles } from "../constants";

export const homeRoute = [
  {
    path: "/home",
    ele: <Home />,
    availability: [userRoles.admin, userRoles.observer],
  },
];