import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ProtectedRoutes from "./Utils/ProtectedRoutes";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element= {<ProtectedRoutes/>}>
           <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
