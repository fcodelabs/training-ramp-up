import React from "react";
import Home from "./pages/home/Home";
import io from "socket.io-client";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserRouter , Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CreatePassword } from "./pages/CreatePassword/CreatePassword";
import { Login } from "./pages/Login/Login";
import { SocketContext } from "./SocketContext";
import { SelfRegistration } from "./pages/SelfRegistration/SelfRegistration";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authCheckRequest } from "./redux/slices/userSlice";
import { useEffect } from "react";
import { backendURL } from "./constants";
import ProtectedRoutes from "./routes/protectedRoutes";

const socket = io(`${backendURL}`);

const roter = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route index element = {<Login />} />
      <Route path = "/create-password/:token" element = {<CreatePassword />} />
      <Route path = "/home" element = {<Home />} />
      <Route path = "/self-registration" element = {<SelfRegistration />} />
    </Route>
  )
)

function App() {
 
  return (
    <SocketContext.Provider value={socket}>
    <RouterProvider router={roter}/>
    </SocketContext.Provider>
  );
}

export default App;
