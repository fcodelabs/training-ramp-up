import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
//const baseURL = "http://localhost:8000";
//import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="sign" element={<SignUp />} />
        {/* <DataTable /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
