import React from "react";
import Home from "./containers/Home/Home";
import { Route, Routes } from "react-router-dom";
import PasswordCreate from "./containers/PasswordCreate/PasswordCreate";
const userId = Math.floor(Math.random() * 1000000);
localStorage.setItem("userId", userId.toString());

const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <PasswordCreate /> },
];

function App() {
  return (
    <div >
      <Routes>
        {routes.map((route, _id) => (
          <Route key={_id} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
