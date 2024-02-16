import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import PasswordCreation from "./pages/PasswordCreation/PasswordCreation";
import Login from "./pages/Lgin/Login";
import Register from "./pages/Register/Register";

const routes = (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/home" element={<Home />} />
    <Route path="/password-creation" element={<PasswordCreation />} />
    <Route path="/register" element={<Register />} />
  </Routes>
);

export default routes;
