import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";

export default function App() {
  // const SignIn = useSelector((state) => state.SignIn);
  // const SignUp = useSelector((state) => state.SignUp);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>

    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<SignIn/>} />
    //     <Route path="/signup" element={<SignUp />} />
    //     <Route path="/home" element={<HomePage />} />

    //     <Route exact path="/">
    //       {SignIn.isSignedIn ? <HomePage /> : <Navigate to="/" />}
    //     </Route>
    //     <Route exact path="/signup">
    //       {SignUp.isSignedUp ? <HomePage /> : <Navigate to="/signup" />}
    //     </Route>
    //   </Routes>
    // </BrowserRouter>
  );
}
