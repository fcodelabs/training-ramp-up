import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import HomeRampUp from "./pages/HomeRampUp";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homeRampUp" element={<HomeRampUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
