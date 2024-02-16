import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import PasswordCreation from "./pages/PasswordCreation/PasswordCreation";

const routes = (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/password-creation" element={<PasswordCreation />} />
  </Routes>
);

export default routes;
