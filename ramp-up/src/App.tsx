import React from "react";
import Home from "./pages/home/Home";
import io from "socket.io-client";
import { createBrowserRouter , Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { CreatePassword } from "./pages/CreatePassword/CreatePassword";
import { Login } from "./pages/Login/Login";
import { SocketContext } from "./SocketContext";

const socket = io("http://localhost:5000");

socket.on("add-student", (student) =>{
  console.log(`new student added: ${JSON.stringify(student, null, 2)}`);
})
socket.on("edit-student",(student) =>{
  console.log(`student edited: ${JSON.stringify(student, null, 2)}`);
})
socket.on("delete-student",(student) =>{
  console.log(`student deleted: ${JSON.stringify(student, null, 2)}`);
})

const roter = createBrowserRouter(
  createRoutesFromElements(
    <Route >
      <Route index element = {<Login />} />
      <Route path = "/create-password/:token" element = {<CreatePassword />} />
      <Route path = "/home" element = {<Home />} />
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
