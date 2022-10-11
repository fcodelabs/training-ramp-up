import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import DataTable from "./pages/DataTable";
//const baseURL = "http://localhost:8000";
//import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/datatable" element={<DataTable />} />
        {/* <DataTable /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
