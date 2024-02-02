import React from "react";
import Home from "./pages/home/Home";
import io from "socket.io-client";
import { CreatePassword } from "./pages/CreatePassword/CreatePassword";

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
function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;
