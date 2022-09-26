import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.scss";
import StudentPage from "./views/Students/pages/StudentPage";
import { Route, Navigate, Routes } from "react-router-dom";
import SignInPage from "./views/User/pages/SignInPage";
import SignUpPage from "./views/User/pages/SignUpPage";

function App() {
  return (
    <div className="App k">
      <Routes>
        <Route path="/students" element={<StudentPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to={"sign-in"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
